# generated/: the "before" picture

The unique files from the original Kobiton export of baseline session 9073267, for comparison with the
framework. They are not run by `pytest` (see `norecursedirs` in `pytest.ini`) and are not importable
on their own: the shared engine now lives in `../core/`.

- `test_app.py`: the recorded steps as one linear `run()` (23 steps)
- `test_suite.py`, `conftest.py`: the one-test runner and the API-key guard
- `config.py`: credentials placeholder and the hard-coded device capabilities

The equivalents are `pages/`, `flows/`, `tests/` and `config/`.
