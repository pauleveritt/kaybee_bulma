from sphinx.application import Sphinx

from kaybee.app import kb
from kaybee.plugins.widgets.base_widget import (
    BaseWidget,
    BaseWidgetModel,
)


class FilteredlistingModel(BaseWidgetModel):
    pass


@kb.widget('filteredlisting')
class FilteredlistingWidget(BaseWidget):

    def make_context(self, context, sphinx_app: Sphinx):
        pass
