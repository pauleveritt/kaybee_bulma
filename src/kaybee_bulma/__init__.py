import os
from operator import attrgetter

from kaybee import SphinxEvent
from kaybee.app import kb
from kaybee_bulma.events import builder_init
from kaybee_bulma.settings import LayoutSettings
from sphinx.application import Sphinx

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
    app.add_config_value('kaybee_bulma_settings', LayoutSettings(), 'html')

    app.connect('builder-inited', builder_init)

    return dict(
        version=__version__,
        parallel_read_safe=False
    )


@kb.event(SphinxEvent.HPC, scope='kaybee_bulma')
def resource_into_html_context(
        kb_app: kb,
        sphinx_app: Sphinx,
        pagename,
        templatename: str,
        context,
        doctree):
    class Site:
        def __init__(self):
            self.config = sphinx_app.config.kaybee_bulma_settings

    context['site'] = Site()

    context['site_config'] = sphinx_app.config.kaybee_bulma_settings

    resources = sphinx_app.resources
    resources = [r for r in resources.values() if
                 getattr(r.props, 'in_nav', False) and
                 r.props.in_nav and r.is_published]

    # Sort first by title, then by "weight"
    context['navmenu'] = sorted(resources,
                                key=lambda x: (
                                    x.props.weight, attrgetter('title')(x))
                                )
