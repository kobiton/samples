import pytest


@pytest.mark.regression
def test_checkout_two_items(app, checkout):
    app.login_flow.login(app.test_user)

    for product in checkout.items:
        app.products_page.add_to_cart(product.position)
    app.products_page.assert_cart_badge(len(checkout.items))

    app.products_page.open_cart()
    app.cart_page.assert_items([p.name for p in checkout.items])
    app.cart_page.assert_total(checkout.expected_total)

    app.cart_page.place_order()
    app.confirmation_page.assert_order_placed(checkout.confirmation_message)

    app.confirmation_page.back_to_products()
    app.products_page.assert_cart_badge(0)

    app.login_flow.logout()
