# -*- coding: utf-8 -*-

import kaybee
import kaybee_bulma
from kaybee_bulma.siteconfig import SiteConfig

extensions = [
    kaybee.__title__,
    kaybee_bulma.__title__
]

master_doc = 'index'
html_theme = 'kaybee_bulma'
exclude_patterns = ['_build']

kaybee_config = SiteConfig(
    logo=dict(
        img_url='http://some.site.com/fake_image.png',
        alt='Kaybee Logo Alt'
    ),
    copyright='2017, All Rights Reserved',
    social_media=dict(
        twitter='kbtest',
        github='kbtest'
    ),
    is_debug=True
)
