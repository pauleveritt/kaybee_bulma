from kaybee.core.registry import registry
from kaybee.widgets.directive import BaseWidgetDirective
from kaybee.widgets.events import process_widget_nodes


def setup(app):
    # Loop through the registered widgets and add a directive
    # for each
    for kbtype in registry.config.widgets.keys():
        app.add_directive(kbtype, BaseWidgetDirective)

    app.connect('doctree-resolved', process_widget_nodes)
