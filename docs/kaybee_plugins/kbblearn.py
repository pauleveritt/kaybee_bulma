from kaybee.app import kb
from kaybee.plugins.articles.navpage import Navpage
from kaybee.plugins.queries.service import Query


@kb.resource('kbblearn')
class KbbLearnResource(Navpage):

    # @property
    # def sidebar_entries(self):
    #     return sidebar

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
