from kaybee.registry import registry
from kaybee.resources.base import BaseResource, BaseContainerModel


class SectionModel(BaseContainerModel):
    subheading: str = None


@registry.resource('section')
class Section(BaseResource):
    model = SectionModel
    pass
