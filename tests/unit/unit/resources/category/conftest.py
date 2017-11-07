import pytest

from kaybee_bulma.resources.category import Category


@pytest.fixture()
def dummy_article():
    yield Category('category1', 'category', 'label: python')

