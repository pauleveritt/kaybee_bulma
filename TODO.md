# Now

- Update to latest kaybee

- Make run_livereload use the core thing

- kaybee.plugins.layout

    - kaybee_bulma can register settings as its model
    
    - Puts the templates directory in the path
    
    - Layout injected into the template

    - Automatically register a sphinx config setting

    - Automatically read that setting value into props

    - Assign the layout instance to sphinx_app

    - Make the layout available as "layout" in html context

    - Some mechanism to let resources (or pages) switch layouts,
      including acquireds to cover whole regions of the site

# Next

- Get rid of "tags" in sidebar

- Previous/next doesn't show if not published

# Later

- Links in <head> to get the blog

- Redo sidebar blocks as widgets included via inherited YAML
