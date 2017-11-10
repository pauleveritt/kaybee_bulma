import pytest
from kaybee_bulma.widgets.previousnext import PreviousNext


@pytest.fixture()
def dummy_previousnext():
    yield PreviousNext('somewidget', 'dummywidget', '')


def test_import():
    assert PreviousNext.__name__ == 'PreviousNext'


def test_construction(dummy_previousnext):
    assert dummy_previousnext.props
