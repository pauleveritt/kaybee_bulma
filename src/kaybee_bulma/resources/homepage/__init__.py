from typing import Mapping

from kaybee.base_types import CoreResourceModel
from kaybee.registry import registry
from kaybee.resources import BaseResource


class HomepageModel(CoreResourceModel):
    logo: str = None
    style = 'header-image is-medium'
    heading: str = None
    subheading: str = None
    overrides: Mapping[str, Mapping[str, str]] = None


@registry.resource('homepage')
class Homepage(BaseResource):
    model = HomepageModel
