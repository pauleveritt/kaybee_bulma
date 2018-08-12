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

    def section_entries(self, resources, references):
        results = self.get_sources(resources)

        return [
            dict(
                title=r.title,
                rtype=r.rtype,
                excerpt=r.excerpt,
                docname=r.docname,
                duration=r.props.duration,
                published=r.props.published,
                accent='primary',
                icon='fas fa-eye',
                author=r.get_author(references),
                references=r.get_references(references),
                logo=r.get_logo(resources)
            )
            for r in results
        ]
