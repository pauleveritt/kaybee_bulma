import pytest

pytestmark = pytest.mark.sphinx('html', testroot='previousnext')


@pytest.mark.parametrize('page', ['article2.html', ], indirect=True)
class TestPreviousNext:
    def test_title(self, page):
        content = page.find('title').contents[0]
        assert 'Article 2' == content

    def test_has_widget(self, page):
        prevnext = page.find(class_='section kb-prevnext')
        assert 'kb-prevnext' in prevnext.attrs['class']

    def test_correct_prev_next(self, page):
        prevnext = page.find(class_='section kb-prevnext')
        prev_link = prevnext.find_all('a')[0]
        assert 'article1.html' == prev_link.attrs['href']
        next_link = prevnext.find_all('a')[1]
        assert 'article3.html' == next_link.attrs['href']
