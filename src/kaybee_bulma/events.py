import inspect
import os

import kaybee_bulma
from sphinx.jinja2glue import SphinxFileSystemLoader


def builder_init(app):
    """ Load the resources, types, etc. from the registry

    We can get resources etc. from 3 location: classes in kaybee itself,
    classes in the doc project, and YAML "typedef" files in the doc
    project.
    """

    # Add the root of this theme
    template_bridge = app.builder.templates
    f = os.path.join(os.path.dirname(inspect.getfile(kaybee_bulma)),
                     'templates')
    template_bridge.loaders.append(SphinxFileSystemLoader(f))
