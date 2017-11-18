from kaybee.registry import registry
from kaybee.resources.base import BaseResource, BaseResourceModel


class ArticleModel(BaseResourceModel):
    pass


@registry.resource('article')
class Article(BaseResource):
    model = ArticleModel
