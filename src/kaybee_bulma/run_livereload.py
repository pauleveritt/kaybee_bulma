"""

Automatically re-build Sphinx docs while editing, serve docs on an
HTTP port, and also reload any browsers pointed to the docs.

"""

import glob

from livereload import Server, shell
from livereload.watcher import Watcher

sphinx = "env3/bin/python3 env3/bin/sphinx-build -E -b html docs docs/_build"
dist = "/usr/local/bin/npm run dist"
both = dist + '; ' + sphinx


class CustomWatcher(Watcher):
    """ Handle recursive globs with Python 3.5+ globbing  """

    def is_glob_changed(self, path, ignore=None):
        for f in glob.glob(path, recursive=True):
            if self.is_file_changed(f, ignore):
                return True
        return False


def get_server():
    server = Server(watcher=CustomWatcher())
    return server
