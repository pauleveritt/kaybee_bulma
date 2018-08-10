import pytest
from kaybee_bulma.base_resource import KbbBaseArticle


class Resource:
    def __init__(self, title, docname):
        self.title = title
        self.docname = docname


@pytest.fixture
def parents():
    return [
        Resource('TypeScript', 'articles/typescript/index'),
        Resource('Articles', 'articles/index'),
        Resource('Root', 'index'),
    ]


@pytest.fixture()
def article(parents):
    br = KbbBaseArticle('articles/typescript/article1', 'article', '')
    br.title = 'Intro TypeScript'

    def get_parents(resources):
        return parents

    br.parents = get_parents
    return br


def test_import():
    assert 'KbbBaseArticle' == KbbBaseArticle.__name__


def test_construction(article):
    assert 'articles/typescript/article1' == article.docname


def test_breadcrumb(article):
    bc = article.breadcrumb_entries(999)
    assert 'Home' == bc[0]['label']
    assert 'Articles' == bc[1]['label']
    assert 'TypeScript' == bc[2]['label']
    assert 'Intro TypeScript' == bc[3]['label']
