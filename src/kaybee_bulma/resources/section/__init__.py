from kaybee.base_types import CoreContainerModel
from kaybee.registry import registry
from kaybee.resources import BaseResource


class SectionModel(CoreContainerModel):
    subheading: str = None


@registry.resource('section')
class Section(BaseResource):
    model = SectionModel
    pass
