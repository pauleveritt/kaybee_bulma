from kaybee.app import kb
from kaybee.plugins.articles.base_article import BaseArticleModel, BaseArticle
from kaybee.plugins.articles.videoplayer import VideoPlayerModel


class KbbArticleModel(BaseArticleModel):
    full_movie: VideoPlayerModel = None
    is_pro: bool = False


@kb.resource('kbbarticle')
class KbbArticleResource(BaseArticle):
    props: KbbArticleModel

    def steps(self, resources):
        return self.parents(resources)[0].toctree
