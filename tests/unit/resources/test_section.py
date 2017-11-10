import pytest

from kaybee_bulma.resources.section import Section


class DummyArticle:
    title = 'Dummy Article 1'
    docname = 'articles/article1'
    published = 'somedate'


class DummySite:
    def __init__(self):
        self.resources = dict()


@pytest.fixture()
def dummy_section_default():
    content = """
subheading: some subheading text
    """
    yield Section('s1', 'dummysection', content)


@pytest.fixture()
def dummy_section_feature():
    content = """
featured_docname: articles/article1
    """
    yield Section('s1', 'dummysection', content)


@pytest.fixture()
def dummy_override():
    content = """
overrides:
    article:
        template: override_article.html
    """

    yield Section('s1', 'dummysection', content)


@pytest.fixture()
def dummy_article():
    yield DummyArticle()


@pytest.fixture()
def dummy_site(dummy_article):
    site = DummySite()
    site.resources[dummy_article.docname] = dummy_article
    yield site


class TestSection:
    def test_import(self):
        assert Section.__name__ == 'Section'

    def test_construction(self, dummy_section_default):
        assert dummy_section_default.name == 's1'
        assert dummy_section_default.kbtype == 'dummysection'
        assert dummy_section_default.props.subheading == 'some subheading text'

    def test_dummy_override(self, dummy_override):
        dao = dummy_override.props.overrides['article']['template']
        assert 'override_article.html' == dao

    def test_no_featured_docname(self, dummy_section_default: Section):
        assert None is dummy_section_default.props.featured_docname

    def test_featured_docname(self, dummy_section_feature: Section):
        assert 'articles/article1' == \
               dummy_section_feature.props.featured_docname

    def test_no_featured_resource(self, dummy_section_default: Section,
                                  dummy_site: DummySite):
        assert None is dummy_section_default.props.featured_docname
        fr = dummy_section_default.featured_resource(dummy_site)
        assert None is fr

    def test_featured_resource(self, dummy_section_feature: Section,
                               dummy_site: DummySite,
                               dummy_article: DummyArticle):
        fr = dummy_section_feature.featured_resource(dummy_site)
        assert dummy_article.docname == fr.docname
