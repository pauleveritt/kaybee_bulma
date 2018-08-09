from kaybee.plugins.queries.service import Query
from ruamel.yaml import load, Loader

from kaybee.app import kb
from kaybee.plugins.articles.base_article import BaseArticleModel, BaseArticle

from docs.kaybee_plugins.shared import sidebar

content = load('''
sections:
    - label: Dashboard
      subheading:  An overview of useful sublistings... new, favorites, etc.
      docname: /learn/dashboard
      accent: primary
      icon: fas fa-eye
    - label: Technologies
      subheading: Popular libraries and frameworks used in Python development 
      docname: /technologies/index
      accent: start
      icon: fas fa-paint-brush
    - label: Topics
      subheading: Techniques and tools used to get into the PyCharm flow
      docname: /technologies/index
      accent: grey
      icon: fas fa-cogs
    - label: IDEs
      subheading: Browse content organized by all the JetBrains integrated 
        development environments
      docname: /technologies/index
      accent: star
      icon: fas fa-columns
    - label: Resources
      subheading: All the kinds of content... tutorials, tips, videos, and more.
      docname: /technologies/index
      accent: success
      icon: fas fa-warehouse
    - label: Authors
      subheading: Navigate the Guide content by the person who wrote it
      docname: /technologies/index
      accent: link
      icon: fab fa-wpforms
''', Loader=Loader)


class KbbLearnModel(BaseArticleModel):
    pass


@kb.resource('kbblearn')
class KbbLearnResource(BaseArticle):
    props: KbbLearnModel

    def breadcrumb_entries(self, resources):
        return []

    @property
    def sidebar_entries(self):
        return sidebar

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

