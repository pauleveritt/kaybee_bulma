from kaybee.plugins.articles.base_article import BaseArticle


class KbbBaseArticle(BaseArticle):
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
