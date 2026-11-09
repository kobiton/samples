# core/: the ASG interaction engine

These files are copied unchanged from the Kobiton Appium Script Generator export
`kobiton-appium-script-s9073267-t01a1c04a-b215-1c9e-8da2-9aab706439e8-manual-python-pytest-v5`
(Python/pytest export format `v5`, generated from baseline session 9073267).

| File | Role |
|---|---|
| `test_base.py` | Element finding with locator fallback, gestures, context switching, device handling |
| `utils.py`, `otp_service.py`, `proxy_server.py`, `constants.py` | Shared infrastructure and session plumbing |
| `resources/<command_id>.json` | Scroll-recovery metadata per recorded step (merge new ones here) |
| `resources/execute-script-on-web-element.js` | Webview helper used by the engine |

**Do not edit these files.** Customize behavior in `pages/`, `config/` and `tests/`.

## Adopting a newer engine

`CHECKSUMS.sha256` holds the checksum of every file here. When Kobiton ships a new export format:

1. Generate a fresh export and diff its `test_base.py`, `utils.py`, `otp_service.py`,
   `proxy_server.py` and `constants.py` against these files.
2. Replace them deliberately, update `CHECKSUMS.sha256` (`sha256sum test_base.py ... > CHECKSUMS.sha256`),
   and run `pytest -m smoke`.
3. Check that the engine still reads the `Config` attributes defined in `config/settings.py`.
