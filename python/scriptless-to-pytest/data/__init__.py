from dataclasses import dataclass
from decimal import Decimal
from pathlib import Path
from typing import List

import yaml

DATA_FILE = Path(__file__).with_name('demo_shop.yaml')


@dataclass(frozen=True)
class User:
    username: str
    password: str


@dataclass(frozen=True)
class Product:
    position: int
    name: str
    price: Decimal


@dataclass(frozen=True)
class CheckoutScenario:
    items: List[Product]
    confirmation_message: str

    @property
    def expected_total(self) -> Decimal:
        return sum((p.price for p in self.items), Decimal('0'))


def _load():
    with open(DATA_FILE, 'r', encoding='utf-8') as f:
        return yaml.safe_load(f)


def load_user(key: str = 'standard') -> User:
    return User(**_load()['users'][key])


def _catalog(data):
    return {
        p['position']: Product(p['position'], p['name'], Decimal(p['price']))
        for p in data['products']
    }


def load_product(position: int) -> Product:
    return _catalog(_load())[position]


def load_checkout_scenario() -> CheckoutScenario:
    data = _load()
    catalog = _catalog(data)
    scenario = data['scenarios']['checkout']
    return CheckoutScenario(
        items=[catalog[position] for position in scenario['items']],
        confirmation_message=scenario['confirmation_message'],
    )
