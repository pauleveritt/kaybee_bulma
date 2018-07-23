from kaybee.app import kb
from kaybee.plugins.articles.base_article_reference import \
    (
    BaseArticleReference, BaseArticleReferenceModel
)

from ruamel.yaml import load, Loader

from docs.kaybee_plugins.shared import sidebar

content = load('''
sections:
    - label: Angular
      subheading:  An overview of useful sublistings... new, favorites, etc.
      href: /documentation_overview.html
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


class KbbTechnologyModel(BaseArticleReferenceModel):
    website: str


@kb.resource('kbbtechnology')
class KbbTechnology(BaseArticleReference):
    props: KbbTechnologyModel

    def breadcrumb_entries(self, resources):
        return [
            dict(
                label='Home',
                href='/'
            ),
            dict(
                label='Technologies',
                href='/technologies/'
            ),
            dict(
                label='Angular',
                href='/technologies/angular.html',
                is_active=True
            ),
        ]

    @property
    def sidebar_entries(self):
        return sidebar

    @property
    def section_entries(self):
        return content['sections']
