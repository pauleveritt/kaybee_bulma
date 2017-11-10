from kaybee.registry import registry
from kaybee.widgets.base import BaseWidget
from pydantic.main import BaseModel


class PreviousNextModel(BaseModel):
    pass


@registry.widget('previousnext')
class PreviousNext(BaseWidget):
    model = PreviousNextModel
    template = 'previousnext.html'
