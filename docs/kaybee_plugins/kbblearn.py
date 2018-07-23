from ruamel.yaml import load, Loader

from kaybee.app import kb
from kaybee.plugins.articles.base_article import BaseArticleModel, BaseArticle

content = load('''
sidebar:
  - label: Dashboard
    href: /learn.html
  - label: Technologies
    is_active: true
    more:
        label: All Technologies...
        href: /x
    entries:
      - label: Django (32)
        href: /documentation_overview_start.html
      - label: Flask (27)
        href: /documentation_overview_start.html
      - label: Docker (21)
        href: /documentation_overview_start.html
      - label: Vagrant (19)
        href: /documentation_overview_start.html
      - label: React (17)
        href: /documentation_overview_start.html
      - label: Angular (16)
        href: /documentation_overview_start.html
      - label: Typescript (12)
        href: /documentation_overview_start.html
  - label: Topics
  - label: IDEs
  - label: Resources
  - label: Authors

sections:
    - label: Dashboard
      subheading:  An overview of useful sublistings... new, favorites, etc.
      href: /documentation_overview.html
      accent: primary
      icon: fas fa-eye
    - label: Technologies
      subheading: Popular libraries and frameworks used in Python development 
      href: /documentation_overview.html
      accent: start
      icon: fas fa-paint-brush
    - label: Topics
      subheading: Techniques and tools used to get into the PyCharm flow
      href: /documentation_overview.html
      accent: grey
      icon: fas fa-cogs
    - label: IDEs
      subheading: Browse content organized by all the JetBrains integrated 
        development environments
      href: /documentation_overview.html
      accent: star
      icon: fas fa-columns
    - label: Resources
      subheading: All the kinds of content... tutorials, tips, videos, and more.
      href: /documentation_overview.html
      accent: success
      icon: fas fa-warehouse
    - label: Authors
      subheading: Navigate the Guide content by the person who wrote it
      href: /documentation_overview.html
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
        return content['sidebar']

    @property
    def section_entries(self):
        return content['sections']
