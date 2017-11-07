import inspect
import os

import dectate
import importscan
from kaybee_bulma import resources, widgets
from kaybee.core.registry import registry
from sphinx.jinja2glue import SphinxFileSystemLoader

import kaybee_bulma


def register(app):
    """ Load the resources, types, etc. from the registry

    We can get resources etc. from 3 location: classes in kaybee itself,
    classes in the doc project, and YAML "typedef" files in the doc
    project.
    """

    # First, scan for decorators in kaybee core and commit
    importscan.scan(resources)
    importscan.scan(widgets)
    dectate.commit(registry)

    # Once config is setup, use it to drive various Sphinx registrations
    # (nodes, directives)
    resources.setup(app)
    widgets.setup(app)


def add_templates_paths(app):
    """ Add the kaybee template directories

     Using Sphinx's conf.py support for registering new template
     directories is both cumbersome and, for us, wrong. We don't
     want to do it at import time. Instead, we want to do it at
     Dectate-configure time.
     """

    template_bridge = app.builder.templates

    # Add the root of this theme
    f = os.path.join(os.path.dirname(inspect.getfile(kaybee_bulma)),
                     'templates')
    template_bridge.loaders.append(SphinxFileSystemLoader(f))

    # Add the widgets and resources
    values = list(registry.config.widgets.values()) + \
             list(registry.config.resources.values()) + \
             list(registry.config.cores.values())

    for v in values:
        f = os.path.dirname(inspect.getfile(v))
        template_bridge.loaders.append(SphinxFileSystemLoader(f))
