import pytest


@pytest.mark.smoke
@pytest.mark.regression
def test_login_and_logout(app):
    app.login_flow.login(app.test_user)
    app.login_flow.logout()
