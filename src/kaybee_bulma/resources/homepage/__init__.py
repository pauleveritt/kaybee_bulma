from typing import Mapping

from kaybee.registry import registry
from kaybee.resources.base import BaseResource, BaseResourceModel


class HomepageModel(BaseResourceModel):
    logo: str = None
    style = 'header-image is-medium'
    heading: str = None
    subheading: str = None
    overrides: Mapping[str, Mapping[str, str]] = None
    hero_image: str = None


@registry.resource('homepage')
class Homepage(BaseResource):
    model = HomepageModel
