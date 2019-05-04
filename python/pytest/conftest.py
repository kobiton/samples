import pytest
import os

@pytest.fixture
def KOBITON_SERVER_URL():
    return 'http://{}:{}@api.kobiton.com:80/wd/hub'.format(
            os.getenv('KOBITON_USERNAME'), os.getenv('KOBITON_ACCESS_KEY'))
