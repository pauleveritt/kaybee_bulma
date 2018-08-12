from kaybee.app import kb
from kaybee.plugins.articles.base_article import BaseArticle, BaseArticleModel
from kaybee.plugins.queries.service import Query


class KbbDashboardModel(BaseArticleModel):
    sidebar_order: int


@kb.resource('kbbdashboard')
class KbbDashboardResource(BaseArticle):
    props: KbbDashboardModel

    def section_entries(self, resources):
        results = Query.filter_collection(
            resources,
            rtype='kbbtechnology',
            sort_value='title',
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

    def sidebar_entries(self, resources):
        return []

    def sidebar_is_active(self, pagename, resources):
        return self.docname in pagename