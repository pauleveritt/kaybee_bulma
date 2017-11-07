from kaybee.widgets.events import process_widget_nodes

def setup(app):
    app.connect('doctree-resolved', process_widget_nodes)
