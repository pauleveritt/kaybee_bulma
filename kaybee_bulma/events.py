import inspect
import os
from operator import attrgetter

from kaybee import SphinxEvent
from kaybee.app import kb
from sphinx.application import Sphinx
from sphinx.jinja2glue import SphinxFileSystemLoader

import kaybee_bulma


@kb.event(SphinxEvent.BI, scope='kaybee_bulma')
def handle_builderinit(kb_app: kb, sphinx_app):
    """ Load the resources, types, etc. from the registry

    We can get resources etc. from 3 location: classes in kaybee itself,
    classes in the doc project, and YAML "typedef" files in the doc
    project.
    """

    # Add the root of this theme
    template_bridge = sphinx_app.builder.templates
    f = os.path.join(os.path.dirname(inspect.getfile(kaybee_bulma)),
                     'templates')
    template_bridge.loaders.append(SphinxFileSystemLoader(f))


@kb.event(SphinxEvent.HPC, scope='kaybee_bulma')
def theme_into_html_context(
        kb_app: kb,
        sphinx_app: Sphinx,
        pagename,
        templatename: str,
        context,
        doctree):

    context['siteconfig'] = sphinx_app.config.kaybee_bulma_siteconfig

    resources = sphinx_app.env.resources
    resources_values = sphinx_app.env.resources.values()
    filtered_resources = [r for r in resources_values if
                 getattr(r.props, 'in_nav', False) and
                 r.props.in_nav and r.is_published]

    # Sort first by title, then by "weight"
    context['navmenu'] = sorted(filtered_resources,
                                key=lambda x: (
                                    x.props.weight, attrgetter('title')(x))
                                )

    # TODO After the great refactoring, move this out into a component
    # instead of calculating this whether it is needed or not on the
    # current page

    sidebar_entries = [
        dict(
            label=r.title,
            docname=r.docname,
            is_active=r.sidebar_is_active(pagename, resources),
            entries=r.sidebar_entries(resources_values),
        )
        for r in resources_values if
        getattr(r.props, 'sidebar_order', False)
    ]

    context['sidebar_entries'] = sidebar_entries