# Mobile regression suite: from a recorded session to a pytest framework

A worked example for the *Appium Script Generator (ASG) Integration Guide (Python)*. It takes one manual
session recorded on a real Kobiton device, the Python/pytest export that Kobiton generated from it, and
folds that export into a maintainable framework: one shared engine, page objects, a reusable login flow,
fixtures, test data, and assertions.

- **App under test:** Kobiton Demo Shop (`com.example.demoshop`), Android. The debug APK is included at
  `app/KobitonDemoShop-1.0-debug.apk`.
- **Origin:** the tests were built from a recording we made on a Galaxy S22 (Android 16). You do not need
  access to that recording to run the suite. To build your own tests, see "Adding a new recording".
- **Flow:** log in, add Backpack and Bike Light, open the cart, place the order, back to Products, log out

## Overview: from a recorded session to a regression suite

1. **Record.** We performed one checkout flow by hand on a real Galaxy S22 in Kobiton (Scriptless Automation):
   log in, add two products, open the cart, place the order, log out. No code was written.
2. **Generate.** Kobiton's Appium Script Generator produced a runnable Python/pytest project from that
   session. We ran it as generated to confirm the replay worked.
3. **Organize.** The generated script is one long list of steps with no checks. We kept Kobiton's engine
   untouched in `core/`, moved the recorded steps into page objects (Login, Products, Cart, Order
   Confirmation), and turned login and logout into one shared flow. Device settings and test data moved
   into YAML files.
4. **Verify.** We added assertions (cart count, items, total, order confirmation), split the work into three
   tests marked `smoke` and `regression`, and ran them on a real device.

**Result:** one recording became three tests: the full checkout, plus two short smoke tests built from the
same recorded steps. Adding the next test means mapping its recorded steps to page-object methods, which
takes about 15 to 30 minutes instead of building a new project.

## Layout

```
scriptless-to-pytest/
|-- app/                  the Demo Shop debug APK (upload it to your Kobiton app repository)
|-- pytest.ini            markers (smoke, regression) and import paths
|-- requirements.txt      one set of pinned dependencies
|-- core/                 the ASG engine, exactly as generated (never edited)
|   `-- resources/        per-step scroll metadata (<command_id>.json) + engine JS
|-- config/               Config (credentials, endpoints) and devices.yaml (device profiles)
|-- data/                 test data (demo_shop.yaml) and loaders
|-- pages/                page objects: LoginPage, ProductsPage, CartPage, OrderConfirmationPage
|-- flows/                reusable business flows: LoginFlow
|-- tests/                thin tests + conftest.py (session, app, data fixtures)
`-- generated/            the original export's unique files, kept as the "before" picture
```

## The tests

| Test | What it does | Markers |
|---|---|---|
| `test_login_and_logout` | Log in, check the Products screen appears, log out, check the Login screen appears | smoke, regression |
| `test_add_product_to_cart` | Log in, add Backpack, check the cart badge shows 1, log out | smoke, regression |
| `test_checkout_two_items` | Log in, add Backpack and Bike Light, check badge, cart items and total ($39.98), place the order, check the confirmation, return to Products, check the cart is empty, log out | regression |

`pytest -m smoke` runs 2 tests; `pytest -m regression` runs all 3. Each test runs once per device profile.

## Setup

Prerequisites: Python 3.8 or newer, and a Kobiton account with access to at least one real Android device.

```bash
python3 -m venv .venv
source .venv/bin/activate          # Windows: .venv\Scripts\activate
pip install -r requirements.txt
```

1. **Credentials.** Set two environment variables with your Kobiton username and API key
   (https://portal.kobiton.com/settings/keys). `config/settings.py` reads them; nothing is stored in the repo.

   ```bash
   export KOBITON_USERNAME='your_kobiton_username'
   export KOBITON_API_KEY='your_api_key'
   ```

   In PyCharm or IntelliJ, add the same two variables to the pytest run configuration
   (**Run > Edit Configurations > Environment variables**). In CI, set them as secrets.

2. **The app.** Upload `app/KobitonDemoShop-1.0-debug.apk` to your Kobiton app repository (the Apps page of
   the portal). In `config/devices.yaml`, set `app` to the version reference of the app you uploaded, in the
   form `kobiton-store:v<version id>`. The sample's value, `kobiton-store:v783250`, only exists in our account.

3. **The device.** In `config/devices.yaml`, set `deviceName`, `platformVersion` and `deviceGroup` to a device
   you can use. The sample profile asks for a Galaxy S22 on Android 16 in the `ORGANIZATION` group.

4. **The baseline link.** In `config/devices.yaml`, comment out `kobiton:baselineSessionId`. It points at our
   recording, which you cannot access. Set it only if you record your own baseline.

5. **Your editor.** In PyCharm or IntelliJ, select the `.venv` interpreter and mark `core/` as a
   **Sources Root** (right-click the folder, **Mark Directory as**). Pytest finds `core/` through
   `pytest.ini`, but the editor does not read that file.

## Run

```bash
pytest -m smoke -v -s              # on every build
pytest -m regression -v -s         # nightly or per release
pytest --device galaxy_s22_android_16     # one profile (default: every profile in devices.yaml)
pytest -n 2                        # parallel: one Kobiton session per xdist worker (needs free devices)
pytest --junitxml=reports/junit.xml       # report; each test records its kobiton_session_url
```

A run is **one Kobiton session per device profile**: the first test opens it, later tests reuse it, and the
app is force-stopped and relaunched before each test so every test starts on the Login screen with an empty
cart. The session is named after the selection, for example
`scriptless-to-pytest: regression [galaxy_s22_android_16]`. The trade-off is that all tests in a run share
one session video and log.

`-s` shows the engine's step-by-step log. Every run prints `View session at: ...` once per device, so a
failure links to the session video, device logs and screenshots. On a failed test the engine also saves the
page source and a screenshot to `debug/`.

## What changed from the generated export

The export's `test_app.py` has 23 recorded steps in one linear `run()`. Eleven of them are the flow; the
other twelve are a first login attempt with a typo (`'standard_user '`), retries, and field clearing. Those
were dropped.

| Generated | Framework |
|---|---|
| `test_base.py`, `utils.py`, `otp_service.py`, `proxy_server.py`, `constants.py` | `core/`, byte-for-byte (`core/CHECKSUMS.sha256`) |
| `config.py` with one hard-coded capabilities method | `config/settings.py` + `config/devices.yaml` (profiles as data, one pytest parameter each) |
| Recorded timeouts (`8666`, `25465`, ...) | `Timeouts.DEFAULT_MS` and `Timeouts.SCREEN_LOAD_MS` |
| Taps at recorded relative coordinates (`0.553, 0.537`) | Center tap; the engine clicks Buttons |
| Locator chains | Unchanged (accessibility id first, then resource-id and text fallbacks) |
| `test_suite.py` + `conftest.py` API-key guard (one test, one session) | `tests/conftest.py`: shared session per device, credential guard, app reset between tests, debug capture on failure |
| One linear `run()` | `LoginPage`, `ProductsPage`, `CartPage`, `OrderConfirmationPage`, `LoginFlow` |
| No assertions | Cart badge, cart items, cart total, order confirmation, empty cart after the order |

Each page-object action keeps the **command ID** of its step in the original recording. The engine sends it
to Kobiton (`baseCommandId`) so a replay can be related to the recording, and the scroll metadata files in
`core/resources/` are named after these IDs.

## Adding a new recording (intake routine)

1. Record the flow as a Scriptless baseline session; generate and download the Python/pytest export.
2. Open the export's `test_app.py` and ignore everything else except `resources/`.
3. Map each step to an existing page-object method, or add a method (keep the locator chain, keep the
   command ID).
4. Copy the export's `resources/<command_id>.json` files into `core/resources/`. They are keyed by globally
   unique command IDs, so they never collide. If a step uses `find_visible_element_on_scrollable`, its file
   is required.
5. Add assertions and put test data in `data/demo_shop.yaml`.
6. Mark the test `@pytest.mark.smoke` and/or `@pytest.mark.regression` and open a pull request.

For example, to add Fleece Jacket to the checkout: record adding it, copy its JSON, add its command ID to
`ProductsPage.ADD_TO_CART_COMMAND_IDS`, and add position `4` to the scenario in `data/demo_shop.yaml`.

## Design notes

- **Resources live in `core/resources/`.** The engine resolves `resources/<command_id>.json` relative to
  `test_base.py`. Keeping the engine unmodified, and therefore able to track Kobiton's releases, means the
  resources sit beside it.
- **`config/` must export `Config`.** The engine does `from config import Config`, so `config/__init__.py`
  re-exports it.
- **The engine uses flat imports.** `pythonpath = . core` in `pytest.ini` makes `from config import ...` and
  `from constants import ...` resolve without editing engine files.
- **Page objects must set the command ID before a scrollable find.** The engine reads
  `resources/<command_id>.json` for those steps; with no ID set it looks for `resources/0.json` and fails.
  `BasePage._find` sets the ID for every step.
- **One session per device profile.** It is faster than one session per test, and the app reset between tests
  keeps tests independent.

## Scope and limits

- Verified on a real Galaxy S22 (Android 16) in Kobiton: `-m smoke` passed 2/2 and `-m regression` passed
  3/3, each in a single Kobiton session. The engine files in `core/` match the generated export
  (`core/CHECKSUMS.sha256`).
- The cart badge, cart total, cart item and confirmation checks were not part of the recording, so they
  locate elements by the app's IDs (`cart-badge`, `cart-total`, `cart-item-name-N`, `order-confirmation`).
  Amounts and counts are parsed from the element text (`$39.98`, `2`); item names and the confirmation are
  matched as substrings. If your app formats these differently, adjust the page objects.
- Only products 1 and 2 can be added today, because only those steps were recorded. Adding another product
  raises a clear error until you record it (see the intake routine above).
- The invalid-login case is not covered.
