from kaybee.app import kb
from kaybee.plugins.articles.navpage import Navpage
from kaybee.plugins.queries.service import Query


@kb.resource('kbblearn')
class KbbLearnResource(Navpage):

    def section_entries(self, resources):
        query_results = Query.filter_collection(
            resources,
            rtype='kbbsection',
            sort_value='title',
        )

        results = [
            dict(
                label=r.title,
                subheading=r.excerpt,
                docname=r.docname,
                accent=r.props.accent,
                icon=r.props.icon,
            )
            for r in query_results
        ]

        overview = resources['learn/overview']
        results.insert(0, dict(
            label=overview.title,
            subheading=overview.excerpt,
            docname=overview.docname,
            accent='primary',
            icon='fas fa-eye'
        )
                       )

        return results