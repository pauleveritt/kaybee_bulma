from kaybee.app import kb
from kaybee.plugins.articles.author import Author


@kb.resource('kbbauthor')
class KbbAuthorResource(Author):
    pass
