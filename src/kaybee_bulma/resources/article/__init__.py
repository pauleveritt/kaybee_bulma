from kaybee.registry import registry
from kaybee.resources.base import BaseResource, BaseResourceModel


class ArticleModel(BaseResourceModel):
    pass


@registry.resource('article')
class Article(BaseResource):
    model = ArticleModel

    def series(self, site):
        parent = site.resources[self.parent]
        results = []
        for docname in parent.toctree:
            resource = site.resources.get(docname)
            if resource:
                # We might have a non-resource page in the toctree,
                # so skip it if true
                synopsis = getattr(resource.props, 'synopsis', False)
                results.append(
                    dict(
                        docname=docname,
                        title=resource.title,
                        synopsis=synopsis
                    )
                )
        return results
