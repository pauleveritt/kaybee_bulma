from kaybee.app import kb
from kaybee.plugins.widgets.base_widget import (
    BaseWidget,
    BaseWidgetModel,
)
from sphinx.application import Sphinx


class FilteredlistingModel(BaseWidgetModel):
    filename: str


@kb.widget('filteredlisting')
class FilteredlistingWidget(BaseWidget):
    props: FilteredlistingModel

    def make_context(self, context, sphinx_app: Sphinx):
        pass

