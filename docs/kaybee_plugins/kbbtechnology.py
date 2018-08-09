from kaybee.app import kb
from kaybee.plugins.articles.base_article_reference import \
    (
    BaseArticleReference, BaseArticleReferenceModel
)

from sphinx.util import relative_uri


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
                        this_href = relative_uri(resource.docname,
                                                 this_ref.docname)
                        these_references.append(
                            dict(
                                label=label,
                                href=this_href,
                            )
                        )
            return these_references

    def _get_logo(self, resource, resources):
        # Find the primary_reference logo
        primary_reference = resource.props.primary_reference
        if not primary_reference:
            return PYTHON_LOGO
        reference_resource = resources[primary_reference]
        logo = reference_resource.props.logo
        return logo if logo else PYTHON_LOGO

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
                author=self._get_author(r, references),
                references=self._get_references(r, references),
                logo=self._get_logo(r, resources)
            )
            for r in results
        ]
