from kaybee.app import kb
from kaybee.plugins.articles.base_article import BaseArticle
from kaybee.plugins.queries.service import Query


@kb.resource('kbbdashboard')
class KbbDashboardResource(BaseArticle):

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
