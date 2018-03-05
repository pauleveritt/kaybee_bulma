import os

import kaybee_bulma.events
from kaybee_bulma.siteconfig import SiteConfig

__version__ = "0.2.6"
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
    app.add_config_value('kaybee_bulma_siteconfig', SiteConfig(), 'html')

    return dict(
        version=__version__,
        parallel_read_safe=False
    )

