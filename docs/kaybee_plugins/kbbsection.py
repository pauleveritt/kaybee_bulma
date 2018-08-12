from kaybee.app import kb
from kaybee.plugins.articles.base_article import BaseArticle, BaseArticleModel
from kaybee.plugins.queries.props_model import BaseQueryModel
from kaybee.plugins.queries.service import Query


class KbbSectionModel(BaseArticleModel):
    sidebar_order: int
    sidebar_entries: BaseQueryModel = None


@kb.resource('kbbsection')
class KbbSectionResource(BaseArticle):
    props: KbbSectionModel

    def sidebar_entries(self, resources):
        query = self.props.sidebar_entries
        if query is None:
            return []
        results = Query.filter_collection(
            resources,
            rtype=query.rtype,
            sort_value=query.sort_value,
            limit=query.limit,
            reverse=query.reverse
        )

        return [
            dict(
                label=r.title,
                docname=r.docname
            )
            for r in results
        ]

    def section_entries(self, resources):
        if self.docname == 'learn/dashboard':
            results = Query.filter_collection(
                resources,
                rtype='kbbsection',
                sort_value='sidebar_order',
            )
        else:
            query = self.props.sidebar_entries
            results = Query.filter_collection(
                resources,
                rtype=query.rtype,
                sort_value=query.sort_value,
            )

        return [
            dict(
                label=r.title,
                subheading=r.excerpt,
                docname=r.docname,
                accent='primary',
                icon='fas fa-eye',
                logo=getattr(r.props, 'logo', None)
            )
            for r in results
        ]

    def sidebar_is_active(self, pagename, resources):
        if self.docname == pagename:
            return True
        page = resources.get(pagename)
        if page:
            return self.docname == page.parent
