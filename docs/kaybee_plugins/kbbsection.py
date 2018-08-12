from kaybee.app import kb
from kaybee.plugins.articles.base_article import BaseArticle, BaseArticleModel
from kaybee.plugins.queries.props_model import BaseQueryModel
from kaybee.plugins.queries.service import Query


class KbbSectionModel(BaseArticleModel):
    section_entries: BaseQueryModel = None


@kb.resource('kbbsection')
class KbbSectionResource(BaseArticle):
    props: KbbSectionModel

    def section_entries(self, resources):
        query = self.props.section_entries
        query_results = Query.filter_collection(
            resources,
            rtype=query.rtype,
            sort_value=query.sort_value,
        )

        results = []
        for r in query_results:
            result = dict(
                label=r.title,
                subheading=r.excerpt,
                docname=r.docname,
                accent=r.props.accent,
                icon=r.props.icon,
                logo=getattr(r.props, 'logo', None),
            )
            if getattr(r.props, 'images', False):
                headshot_thumbnail = r.headshot_thumbnail('icon_96')
                if headshot_thumbnail:
                    result['headshot_thumbnail'] = headshot_thumbnail
            results.append(result)

        return results
