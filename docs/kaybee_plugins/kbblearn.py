from ruamel.yaml import load, Loader

from kaybee.app import kb
from kaybee.plugins.articles.base_article import BaseArticleModel, BaseArticle

content = load('''
sidebar:
  - label: Learn
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
