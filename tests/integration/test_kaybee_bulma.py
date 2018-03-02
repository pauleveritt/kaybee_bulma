import pytest

pytestmark = pytest.mark.sphinx('html', testroot='kaybee_bulma')


@pytest.mark.parametrize('page', ['index.html', ], indirect=True)
class TestWidgets1:

    def test_widgets1(self, page):
        # The genericpage doesn't have an acquire for template, so just use
        h1 = page.find('h1').contents[0].strip()
        assert 'Hello World' == h1

        videoplayer = page.find(class_='kbb-videoplayer')
        assert '640' == videoplayer.attrs['width']
