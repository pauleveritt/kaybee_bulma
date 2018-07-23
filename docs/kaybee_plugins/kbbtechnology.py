from kaybee.app import kb
from kaybee.plugins.articles.base_article_reference import \
    (
    BaseArticleReference, BaseArticleReferenceModel
)

from ruamel.yaml import load, Loader
from sphinx.util import relative_uri

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


PYTHON_LOGO = 'https://cdn.worldvectorlogo.com/logos/python-5.svg'


@kb.resource('kbbtechnology')
class KbbTechnology(BaseArticleReference):
    props: KbbTechnologyModel

    def breadcrumb_entries(self, resources):
        entries = [
            dict(
                label=r.title,
                docname=r.docname
            )
            for r in self.parents(resources)[:-1]
        ]
        entries.reverse()
        entries.insert(0, dict(label='Home', docname='/index'))
        entries.append(dict(
            label=self.title, docname=self.docname, is_active=True))
        return entries

    def _get_author(self, resource, references):
        # Used by section_entries to make the listing of links resources
        # as "tags"
        resource_references = resource.props.references
        if resource_references:
            if 'author' in resource_references:
                pa_label = resource_references['author'][0]
                pa = references["author"][pa_label]
                images = pa.props.images
                first_image = images[0].filename if images else None
                author_href = relative_uri(resource.docname, pa.docname)
                thumbnail_url = author_href + '/../' + first_image
                author = dict(
                    title=pa.title,
                    href=author_href,
                    thumbnail_url=thumbnail_url,
                )
                return author

    def _get_references(self, resource, references):
        # Used by section_entries to make the listing of links resources
        # as "tags"
        # Used by section_entries to make the listing of links resources
        # as "tags"

        resource_references = resource.props.references
        if resource_references:
            # Handle all non-author references for tag-like links
            these_references = []
            for reftype, labels in resource_references.items():
                this_reftype = references[reftype]
                if reftype != 'author':
                    for label in labels:
                        this_ref = this_reftype[label]
                        this_href = relative_uri(resource.docname, this_ref.docname)
                        these_references.append(
                            dict(
                                label=label,
                                href=this_href,
                            )
                        )
            return these_references

    def section_entries(self, resources, references):
        results = self.get_sources(resources)

        rr =  [
            dict(
                title=r.title,
                rtype=r.rtype,
                excerpt=r.excerpt,
                docname=r.docname,
                duration=r.props.duration,
                published=r.props.published,
                accent='primary',
                icon='fas fa-eye',
                author=self._get_author(r, references),
                references=self._get_references(r, references),
                logo=r.props.logo if hasattr(r.props, 'logo') else PYTHON_LOGO
            )
            for r in results
        ]

        return rr