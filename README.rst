kaybee_bulma theme for Kaybee and Sphinx
========================================

Kaybee is a Sphinx system for knowledge bases. ``kaybee_bulma`` is a theme
for Kaybee with the following goals:

- Based on the Bulma CSS framework

- Uses no HTML/CSS/JS from Sphinx

- Uses a modern toolchain (npm, SASS, webpack)

- Delivers a fast, attractive, mobile-oriented, and (later) offline
  web experience with unique capabilities

How To Release
--------------

Releases are driven by Travis. When a push is done with a tag, the Travis
build notices the tag and triggers the PyPI update. (Non-tagged pushes don't
trigger the PyPI part of ``.travis.yml``.)

#. Commit everything.

#. Bump the version using
   `bumpversion commands <https://github.com/peritus/bumpversion/issues/77#issuecomment-130696156>`_:

   - `bumpversion patch: 0.1.0 -> 0.1.1.dev0`

   - `bumpversion release: 0.1.1.dev0 -> 0.1.1`

   - `bumpversion minor: 0.1.1 -> 0.2.0.dev0`

   - `bumpversion dev: 0.2.0.dev0 -> 0.2.0.dev1`

   - `bumpversion release: 0.2.0.dev1 -> 0.2.0#. Tag the release.`

#. Commit, tag, push.

#. Run bumpversion to go back to dev

#. Run ``gitchangelog > CHANGES.rst`` to generate the history that goes into
   the package. Tip: Use the commit message prefixes from their `reference
   <https://github.com/vaab/gitchangelog/blob/master/src/gitchangelog/gitchangelog.rc.reference>`_

#. Commit, push (so people can see the history.)