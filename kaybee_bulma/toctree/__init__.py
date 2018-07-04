from kaybee.app import kb
from kaybee.plugins.articles.base_toctree import BaseToctree
from sphinx.application import Sphinx


@kb.toctree(system_order=70)
class MyToctree(BaseToctree):
    template = "kbb_toctree"

    def _make_entry(self, resources, references, entry):
        # Given an entry in a toctree listing, assemble all the
        # related information needed to render

        resource = entry['resource']
        logo = getattr(resource.props, 'logo', None)
        if resource.rtype == 'author':
            # When showing an author toctree entry, get the "logo" from
            # the resource.props.images[0]
            images = resource.props.images
            if images and images[1]:
                fn = images[1].filename
                logo = self.pathto_docname(resource.docname) + '/../' + fn

        flattened_entry = dict(
            href=entry['href'],
            title=resource.title,
            rtype=resource.rtype,
            excerpt=resource.excerpt,
            logo=logo,
            props=dict(
                published=resource.props.published,
            )
        )

        resource_references = resource.props.references
        if resource_references:
            if 'author' in resource_references:
                pa_label = resource_references['author'][0]
                pa = references["author"][pa_label]
                images = pa.props.images
                first_image = images[0].filename if images else None
                author_href = self.pathto_docname(pa.docname)
                thumbnail_url = author_href + '/../' + first_image
                author = dict(
                    title=pa.title,
                    href=author_href,
                    thumbnail_url=thumbnail_url,
                )
                flattened_entry['author'] = author

            # Handle all non-author references for tag-like links
            flattened_entry['references'] = []
            for reftype, labels in resource_references.items():
                this_reftype = references[reftype]
                if reftype != 'author':
                    for label in labels:
                        this_ref = this_reftype[label]
                        this_href = self.pathto_docname(this_ref.docname)
                        flattened_entry['references'].append(
                            dict(
                                label=label,
                                href=this_href,
                            )
                        )

        return flattened_entry

    def render(self, builder, context, sphinx_app: Sphinx):
        """ Given a Sphinx builder and context with site in it,
         generate HTML """

        context['sphinx_app'] = sphinx_app
        context['toctree'] = self

        # Generate a listing from the entries resulting from self.e
        resources = sphinx_app.env.resources
        references = sphinx_app.env.references
        context['listing'] = [
            self._make_entry(resources, references, entry)
            for entry in self.entries
        ]

        html = builder.templates.render(self.template + '.html', context)
        return html
