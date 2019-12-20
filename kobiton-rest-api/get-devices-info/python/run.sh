export KOBITON_USERNAME=$1
export KOBITON_API_KEY=$2
pip install requests | grep -v 'Requirement already satisfied'
python check-device-status.py
