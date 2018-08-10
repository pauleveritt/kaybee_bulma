from kaybee.app import kb
from kaybee.plugins.articles.base_article import BaseArticleModel, BaseArticle
from kaybee.plugins.queries.service import Query

from docs.kaybee_plugins.shared import sidebar


class KbbLearnModel(BaseArticleModel):
    pass


@kb.resource('kbblearn')
class KbbLearnResource(BaseArticle):
    props: KbbLearnModel

    @property
    def sidebar_entries(self):
        return sidebar

    def section_entries(self, resources):
        results = Query.filter_collection(
            resources,
            rtype='kbbsection',
            sort_value='sidebar_order',
        )

        return [
            dict(
                label=r.title,
                subheading=r.excerpt,
                docname=r.docname,
                accent='primary',
                icon='fas fa-eye'
            )
            for r in results
        ]
