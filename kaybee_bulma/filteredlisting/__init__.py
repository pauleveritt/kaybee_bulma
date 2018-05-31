from sphinx.application import Sphinx
from sphinx.environment import BuildEnvironment

from kaybee.app import kb
from kaybee.plugins.widgets.base_widget import (
    BaseWidget,
    BaseWidgetModel,
)


class FilteredlistingModel(BaseWidgetModel):
    filename: str


@kb.widget('filteredlisting')
class FilteredlistingWidget(BaseWidget):
    props: FilteredlistingModel

    def make_context(self, context, sphinx_app: Sphinx):
        pass


@kb.jsondumper('resourcesjsondumper')
def dump_some_resources(kb_app: kb, sphinx_env: BuildEnvironment):
    resources = [
        dict(
            href=r.docname,
            type=r.rtype,
            title=r.title,
            published=r.props.published,
            duration='2m22s',
            excerpt=r.excerpt,
            authorInfo={
                "title": "Paul Everitt",
                "href": "/paul.html",
                "headshot":
                    "https://pauleveritt.github.io/pycharm_companion"
                    "/authors/pauleveritt/paul_headshotx24.jpeg"
            },
            references=[
                {
                    "href": "/someref1.html",
                    "label": "paul"
                },
                {
                    "href": "/someref2.html",
                    "label": "django"
                },
                {
                    "href": "/someref3.html",
                    "label": "templating"
                }
            ]
        )
        for r in sphinx_env.resources.values()
    ]
    references = []
    for reftype, values in sphinx_env.references.data.items():
        control = 'checkbox'
        choices = []

        for label, resource in values.items():
            value = label
            targets = resource.get_sources(sphinx_env.resources)
            if targets:
                choices.append(dict(label=resource.title, value=label))

        # Some sanity checking
        if len(choices) > 10:
            control = 'select'
        if len(choices) > 0:
            references.append(
                dict(
                    label=reftype,
                    value=reftype,
                    control=control,
                    choices=choices
                )
            )

    return dict(
        filename='all_resources.json',
        results={
            "results": resources,
            "filterGroups": references
        }
    )
