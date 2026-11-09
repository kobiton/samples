from enum import Enum


class DeviceSource(Enum):
    KOBITON = 'KOBITON'
    OTHER = 'OTHER'


class PressType(Enum):
    HOME = 'HOME'
    BACK = 'BACK'
    POWER = 'POWER'
    APP_SWITCH = 'APP_SWITCH'
    ENTER = 'ENTER'
    DELETE = 'DELETE'


class Orientation(Enum):
    PORTRAIT = 'PORTRAIT'
    LANDSCAPE = 'LANDSCAPE'
