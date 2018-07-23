from kaybee.app import kb
from kaybee.plugins.articles.base_article import BaseArticle, BaseArticleModel
from kaybee.plugins.queries.props_model import BaseQueryModel
from kaybee.plugins.queries.service import Query
from ruamel.yaml import load, Loader

content = load('''
sections:
    - label: Angular
      subheading:  An overview of useful sublistings... new, favorites, etc.
      href: /technologies/angular.html
      accent: primary
      icon: fas fa-eye
    - label: Django
      subheading: Popular libraries and frameworks used in Python development 
      href: /documentation_overview.html
      accent: start
      icon: fas fa-paint-brush
    - label: Docker
      subheading: Techniques and tools used to get into the PyCharm flow
      href: /documentation_overview.html
      accent: grey
      icon: fas fa-cogs
    - label: Flask
      subheading: Browse content organized by all the JetBrains integrated 
        development environments
      href: /documentation_overview.html
      accent: star
      icon: fas fa-columns
    - label: TypeScript
      subheading: All the kinds of content... tutorials, tips, 
        videos, and more.
      href: /documentation_overview.html
      accent: success
      icon: fas fa-warehouse
    - label: Vagrant
      subheading: Navigate the Guide content by the person who wrote it
      href: /documentation_overview.html
      accent: link
      icon: fab fa-wpforms
''', Loader=Loader)


class KbbSectionModel(BaseArticleModel):
    sidebar_order: int
    sidebar_entries: BaseQueryModel


@kb.resource('kbbsection')
class KbbSectionResource(BaseArticle):
    props: KbbSectionModel

    def breadcrumb_entries(self, resources):
        return []

    @property
    def section_entries(self):
        return content['sections']

    def sidebar_entries(self, resources):
        query = self.props.sidebar_entries
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

    def sidebar_is_active(self, pagename, resources):
        if self.docname == pagename:
            return True
        page = resources.get(pagename)
        if page:
            return self.docname == page.parent
