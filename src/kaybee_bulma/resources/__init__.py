from kaybee.core.registry import registry
from kaybee.resources.directive import BaseResourceDirective


def setup(app):
    # Loop through the registered resources and register a directive
    # for each
    for kbtype in registry.config.resources.keys():
        app.add_directive(kbtype, BaseResourceDirective)
