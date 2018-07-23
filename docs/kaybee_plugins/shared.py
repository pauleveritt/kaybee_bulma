from ruamel.yaml import load, Loader

sidebar = load('''
sidebar:
  - label: Dashboard
    href: /dashboard.html
  - label: Technologies
    href: /technologies/
    is_active: true
    more:
        label: All Technologies...
        href: /technologies/
    entries:
      - label: Django (32)
        href: /documentation_overview_start.html
      - label: Flask (27)
        href: /documentation_overview_start.html
      - label: Docker (21)
        href: /documentation_overview_start.html
      - label: Vagrant (19)
        href: /documentation_overview_start.html
      - label: React (17)
        href: /documentation_overview_start.html
      - label: Angular (16)
        href: /documentation_overview_start.html
      - label: Typescript (12)
        href: /documentation_overview_start.html
  - label: Topics
  - label: IDEs
  - label: Resources
  - label: Authors
''', Loader=Loader)['sidebar']
