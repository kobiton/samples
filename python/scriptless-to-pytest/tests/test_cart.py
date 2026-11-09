import pytest


@pytest.mark.smoke
@pytest.mark.regression
def test_add_product_to_cart(app, product):
    app.login_flow.login(app.test_user)

    app.products_page.add_to_cart(product.position)
    app.products_page.assert_cart_badge(1)

    app.login_flow.logout()
