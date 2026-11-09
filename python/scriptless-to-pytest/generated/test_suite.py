import pytest
from config import Config
from test_app import TestApp

def test_galaxy_s_22_android_16():
    """Run test on Galaxy S22 - Android 16"""
    automation_helper = None
    try:
        automation_helper = TestApp()
        capabilities = Config.get_galaxy_s_22_android_16_desired_capabilities()
        automation_helper.find_online_device(capabilities)
        automation_helper.setup(capabilities, 1)
        automation_helper.run()
    finally:
        if automation_helper:
            automation_helper.cleanup()


