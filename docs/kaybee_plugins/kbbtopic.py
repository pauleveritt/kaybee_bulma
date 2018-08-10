from kaybee.app import kb
from kaybee.plugins.articles.base_article_reference import \
    (
    BaseArticleReference, BaseArticleReferenceModel
)
from kaybee.plugins.queries.service import Query


class KbbTopicModel(BaseArticleReferenceModel):
    website: str


@kb.resource('kbbtopic')
class KbbTopic(BaseArticleReference):
    props: KbbTopicModel

    def section_entries(self, resources):
        query = self.props.sidebar_entries
        results = Query.filter_collection(
            resources,
            rtype='kbbtechnology',
            sort_value='title',
        )

        return [
            dict(
                label=r.title,
                subheading=r.subheading,
                docname=r.docname,
                accent='primary',
                icon='fas fa-eye'
            )
            for r in results
        ]
