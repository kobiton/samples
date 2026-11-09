import random
import time

import phonenumbers
import requests

from config import Config

FIND_PHONE_NUMBER_MAX_ATTEMPTS = 12
FIND_PHONE_NUMBER_INTERVAL_IN_MS = 10000
FIND_EMAIL_ADDRESS_MAX_ATTEMPTS = 12
FIND_EMAIL_ADDRESS_INTERVAL_IN_MS = 10000
FIND_OTP_CODE_MAX_ATTEMPTS = 12
FIND_OTP_CODE_INTERVAL_IN_MS = 10000


class _AbortRetry(Exception):
    """Re-raise from a fetch task to skip the remaining retry attempts."""

    def __init__(self, cause):
        super().__init__(str(cause))
        self.cause = cause


class OtpService:
    """Books a Kobiton-provisioned phone number or email address to receive OTP
    codes, then polls until a code arrives.

    Public attributes (read by generated test code):
      - phone_number       : digits-only national number
      - raw_phone_number   : full E.164 string returned by Kobiton
      - country_code       : the country code passed to find_otp_phone_number
      - email_address      : email returned by Kobiton
      - otp_code           : OTP code returned by Kobiton
      - is_cleanup         : whether the booked phone/email has been unbooked
    """

    def __init__(self):
        self.country_code = '1'
        self.raw_phone_number = None
        self.phone_number = None
        self.email_address = None
        self.otp_code = None
        self.is_cleanup = False

    def find_otp_phone_number(self, country_code):
        print('Finding an available phone number for OTP...')
        self.country_code = country_code

        def fetch():
            response = requests.get(
                f"{Config.KOBITON_API_URL}/v1/otp/phone-numbers/available",
                params={'countryCode': country_code},
                headers={'Authorization': Config.get_basic_auth_string()},
                verify=not Config.TRUST_ALL_CERTS,
            )
            if response.status_code in (401, 403):
                raise _AbortRetry(Exception(response.text or f"HTTP {response.status_code}"))
            if response.status_code != 200:
                raise Exception(response.text)

            raw = response.text.strip().strip('"')
            self.is_cleanup = False
            self.raw_phone_number = raw
            # phonenumbers.parse expects an ISO region (e.g. 'US') as the
            # default-region arg, not a calling code ('1'). Try E.164 self-
            # identification first; on failure, translate calling code → region.
            try:
                parsed = phonenumbers.parse(raw, None)
            except phonenumbers.NumberParseException:
                region = phonenumbers.region_code_for_country_code(int(country_code))
                parsed = phonenumbers.parse(raw, region)
            self.phone_number = str(parsed.national_number)
            print(f"Found an available phone number {raw} to receive OTP code")
            return raw

        self.raw_phone_number = _retry(
            fetch, FIND_PHONE_NUMBER_MAX_ATTEMPTS, FIND_PHONE_NUMBER_INTERVAL_IN_MS
        )
        if not self.raw_phone_number:
            raise Exception('No available phone number to receive OTP code')
        return self.raw_phone_number

    def find_otp_email_address(self):
        print('Finding an email address for OTP...')

        def fetch():
            response = requests.get(
                f"{Config.KOBITON_API_URL}/v1/otp/email-address/available",
                headers={'Authorization': Config.get_basic_auth_string()},
                verify=not Config.TRUST_ALL_CERTS,
            )
            if response.status_code in (401, 403):
                raise _AbortRetry(Exception(response.text or f"HTTP {response.status_code}"))
            if response.status_code != 200:
                raise Exception(response.text)
            self.is_cleanup = False
            email = response.text.strip().strip('"')
            print(f"Found an available email address {email} to receive OTP code")
            return email

        self.email_address = _retry(
            fetch, FIND_EMAIL_ADDRESS_MAX_ATTEMPTS, FIND_EMAIL_ADDRESS_INTERVAL_IN_MS
        )
        if not self.email_address:
            raise Exception('No available email address to receive OTP code')
        return self.email_address

    def find_otp_code(self):
        if self.raw_phone_number is None and self.email_address is None:
            raise Exception('Please find an available phone number or email address first')

        if self.raw_phone_number is not None:
            print(f"Find OTP code sent to phone number {self.raw_phone_number}")
            url = f"{Config.KOBITON_API_URL}/v1/otp/phone-numbers/{self.raw_phone_number}/otp-code"
            params = None
        else:
            print(f"Find OTP code sent to email address {self.email_address}")
            url = f"{Config.KOBITON_API_URL}/v1/otp/email-address/otp-code"
            params = {'emailAddress': self.email_address}

        def fetch():
            response = requests.get(
                url, params=params,
                headers={'Authorization': Config.get_basic_auth_string()},
                verify=not Config.TRUST_ALL_CERTS,
            )
            if response.status_code in (401, 403):
                raise _AbortRetry(Exception(response.text or f"HTTP {response.status_code}"))
            if response.status_code != 200:
                raise Exception(response.text)
            code = (response.json() or {}).get('otpCode')
            if not code:
                raise Exception('Cannot find OTP code')
            return code

        self.otp_code = _retry(fetch, FIND_OTP_CODE_MAX_ATTEMPTS, FIND_OTP_CODE_INTERVAL_IN_MS)
        if not self.otp_code:
            target = self.raw_phone_number or self.email_address
            raise Exception(f"Cannot find any OTP code sent to {target}")
        self.cleanup()
        return self.otp_code

    def get_random_phone_number(self, number_length):
        low = 10 ** (number_length - 1)
        high = 10 ** number_length - 1
        return str(random.randint(low, high))

    def cleanup(self):
        if self.is_cleanup or (self.raw_phone_number is None and self.email_address is None):
            return

        if self.raw_phone_number is not None:
            print(f"Cleanup OTP service for phone number {self.raw_phone_number}")
            url = f"{Config.KOBITON_API_URL}/v1/otp/phone-numbers/{self.raw_phone_number}/unbook"
            params = None
        else:
            print(f"Cleanup OTP service for email address {self.email_address}")
            url = f"{Config.KOBITON_API_URL}/v1/otp/email-address/unbook"
            params = {'emailAddress': self.email_address}

        try:
            requests.post(
                url, params=params,
                headers={'Authorization': Config.get_basic_auth_string()},
                verify=not Config.TRUST_ALL_CERTS,
            )
            self.is_cleanup = True
        except Exception as e:
            print(f"OTP cleanup failed: {e}")


def _retry(task, max_attempts, interval_ms):
    last_exc = None
    for attempt in range(1, max_attempts + 1):
        try:
            return task()
        except _AbortRetry as abort:
            raise abort.cause
        except Exception as e:
            last_exc = e
            print(f"Attempt {attempt}/{max_attempts} failed: {e}")
            if attempt < max_attempts:
                time.sleep(interval_ms / 1000)
    if last_exc is not None:
        raise last_exc
    return None
