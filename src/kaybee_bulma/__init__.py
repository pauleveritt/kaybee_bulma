import os

# from kaybee_bulma.events import builder_init

__version__ = "0.1.0"

__title__ = "kaybee_bulma"
__description__ = "Bulma-based theme for Kaybee"
__uri__ = "https://github.com/pauleveritt/kaybee_bulma"
__doc__ = __description__ + " <" + __uri__ + ">"

__author__ = "Paul Everitt"
__email__ = "pauleveritt@me.org"

__license__ = "Apache License 2.0"
__copyright__ = "Copyright (c) 2017 Paul Everitt"


def get_path():
    """
    Called from the entry point in setup.py
    """
    # Theme directory is defined as our parent directory
    return os.path.abspath(os.path.dirname(os.path.dirname(__file__)))


def setup(app):
    # app.connect('builder-inited', builder_init)

    return dict(
        version=__version__,
        parallel_read_safe=False
    )
