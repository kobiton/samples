from config import Config


def pytest_configure(config):
    assert Config.API_KEY != 'your_api_key', \
        'Please update value for the API_KEY constant first. See more at README.md file.'
