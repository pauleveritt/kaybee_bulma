from kaybee.registry import registry
from kaybee.resources.base import BaseResource, BaseContainerModel


class SectionModel(BaseContainerModel):
    subheading: str = None
    featured_docname: str = None


@registry.resource('section')
class Section(BaseResource):
    model = SectionModel

    def featured_resource(self, site):
        fd = self.props.featured_docname
        if not fd:
            return None
        else:
            return site.resources[fd]
