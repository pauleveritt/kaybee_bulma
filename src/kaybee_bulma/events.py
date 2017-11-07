import inspect
import os

import dectate
import importscan
from kaybee_bulma import resources, widgets
from kaybee.registry import registry
from sphinx.jinja2glue import SphinxFileSystemLoader

import kaybee_bulma


def builder_init(app):
    """ Load the resources, types, etc. from the registry

    We can get resources etc. from 3 location: classes in kaybee itself,
    classes in the doc project, and YAML "typedef" files in the doc
    project.
    """

    # First, scan for decorators and commit
    importscan.scan(resources)
    importscan.scan(widgets)
    dectate.commit(registry)

    # Add the root of this theme
    template_bridge = app.builder.templates
    f = os.path.join(os.path.dirname(inspect.getfile(kaybee_bulma)),
                     'templates')
    template_bridge.loaders.append(SphinxFileSystemLoader(f))
