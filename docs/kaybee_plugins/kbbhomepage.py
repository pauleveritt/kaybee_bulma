from kaybee.app import kb
from kaybee.plugins.articles.base_article import BaseArticleModel, BaseArticle


class KbbHomepageModel(BaseArticleModel):
    default_navpage: str = None


@kb.resource('kbbhomepage')
class KbbHomepageResource(BaseArticle):
    props: KbbHomepageModel
