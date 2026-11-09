class LoginFlow:
    def __init__(self, login_page, products_page):
        self.login_page = login_page
        self.products_page = products_page

    def login(self, user):
        self.login_page.enter_username(user.username)
        self.login_page.enter_password(user.password)
        self.login_page.tap_login()
        if not self.products_page.is_loaded():
            raise AssertionError(f'Products screen did not appear after logging in as {user.username!r}')

    def logout(self):
        self.products_page.tap_logout()
        if not self.login_page.is_loaded():
            raise AssertionError('Login screen did not appear after logging out')
