import pytest

from config import Config
from data import load_checkout_scenario, load_product, load_user
from flows.login_flow import LoginFlow
from pages.base_page import APP_PACKAGE
from pages.cart_page import CartPage
from pages.login_page import LoginPage
from pages.order_confirmation_page import OrderConfirmationPage
from pages.products_page import ProductsPage
from test_base import TestBase as AsgEngine  # aliased so pytest does not collect it


class KobitonEngine(AsgEngine):
    def kobiton_session_id(self):
        session_id = self.get_kobiton_session_id()
        if session_id:
            return session_id
        capabilities = getattr(self._driver, 'capabilities', None) or {}
        return capabilities.get('kobiton:session')


def pytest_addoption(parser):
    parser.addoption(
        '--device', action='append', default=[],
        help='Device profile name from config/devices.yaml (repeatable). Default: all profiles.',
    )


def pytest_generate_tests(metafunc):
    if 'device_profile' in metafunc.fixturenames:
        requested = metafunc.config.getoption('--device')
        profiles = requested or Config.get_device_profile_names()
        unknown = [p for p in profiles if p not in Config.get_device_profile_names()]
        if unknown:
            raise pytest.UsageError(
                f'Unknown --device {unknown}. Available: {Config.get_device_profile_names()}'
            )
        metafunc.parametrize('device_profile', profiles)


@pytest.hookimpl(hookwrapper=True)
def pytest_runtest_makereport(item, call):
    outcome = yield
    report = outcome.get_result()
    setattr(item, f'rep_{report.when}', report)


def _run_name(config, device_profile):
    selection = config.getoption('markexpr') or config.getoption('keyword') or 'all tests'
    return f'scriptless-to-pytest: {selection} [{device_profile}]'


def _start_engine(config, device_profile):
    capabilities = Config.get_capabilities(device_profile)
    capabilities['sessionName'] = _run_name(config, device_profile)

    engine = KobitonEngine()
    engine.session_url = None
    try:
        engine.find_online_device(capabilities)
        engine.setup(capabilities, 1)
        session_id = engine.kobiton_session_id()
        engine.session_url = Config.get_session_url(session_id) if session_id else None
        if engine.session_url:
            print(f'\nView session at: {engine.session_url}')

        engine.update_settings()
        engine.switch_to_native_context()
        engine.set_implicit_wait(Config.IMPLICIT_WAIT_IN_MS)
    except Exception:
        engine.cleanup()
        raise
    return engine


@pytest.fixture(scope='session')
def _engine_pool():
    # One Kobiton session per device profile for the whole run. A session-scoped
    # parametrized fixture would be rebuilt for every test module instead.
    if not Config.has_credentials():
        pytest.exit(
            'Set the KOBITON_USERNAME and KOBITON_API_KEY environment variables first (see README.md).',
            returncode=2,
        )
    pool = {}
    try:
        yield pool
    finally:
        for engine in pool.values():
            if isinstance(engine, KobitonEngine):
                engine.cleanup()


@pytest.fixture
def driver(request, device_profile, _engine_pool):
    engine = _engine_pool.get(device_profile)
    if isinstance(engine, Exception):
        pytest.fail(f'Kobiton session for {device_profile!r} could not be started: {engine}', pytrace=False)
    if engine is None:
        try:
            engine = _start_engine(request.config, device_profile)
        except Exception as e:
            _engine_pool[device_profile] = e
            raise
        _engine_pool[device_profile] = engine
    return engine


@pytest.fixture
def fresh_app(request, driver):
    if driver.session_url:
        request.node.user_properties.append(('kobiton_session_url', driver.session_url))

    driver._driver.terminate_app(APP_PACKAGE)
    driver.activate_app(APP_PACKAGE)
    driver.switch_to_native_context()

    yield driver

    report = getattr(request.node, 'rep_call', None)
    if report is not None and report.failed:
        driver.save_debug_resource()


class App:
    def __init__(self, driver, test_user):
        self.test_user = test_user
        self.login_page = LoginPage(driver)
        self.products_page = ProductsPage(driver)
        self.cart_page = CartPage(driver)
        self.confirmation_page = OrderConfirmationPage(driver)
        self.login_flow = LoginFlow(self.login_page, self.products_page)


@pytest.fixture
def test_user():
    return load_user('standard')


@pytest.fixture
def app(fresh_app, test_user):
    return App(fresh_app, test_user)


@pytest.fixture
def product():
    return load_product(1)


@pytest.fixture
def checkout():
    return load_checkout_scenario()
