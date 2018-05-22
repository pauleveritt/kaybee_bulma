from sphinx.application import Sphinx

from kaybee.app import kb
from kaybee.plugins.widgets.base_widget import (
    BaseWidget,
    BaseWidgetModel,
)


class FilteredlistingModel(BaseWidgetModel):
    listing_flag: int


@kb.widget('filtered_listing')
class FilteredlistingWidget(BaseWidget):
    greeting = 'widget greeting'
    props: FilteredlistingModel

    def make_context(self, context, sphinx_app: Sphinx):
        context['another_flag'] = 835
