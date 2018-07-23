from kaybee.app import kb
from kaybee.plugins.articles.base_article import BaseArticle, BaseArticleModel
from kaybee.plugins.queries.service import Query
from ruamel.yaml import load, Loader

content = load('''
dashboards:
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