import kaybee
import kaybee_bulma
from kaybee_bulma import SiteConfig

extensions = [
    kaybee.__title__,
    kaybee_bulma.__title__,
]

master_doc = 'index'
html_title = ''
exclude_patterns = ['_build']

kaybee_settings = kaybee.KaybeeSettings(
    debugdumper=dict(
        use_debug=True
    )
)

kaybee_bulma_siteconfig = SiteConfig(
    logo=dict(
        img_file='kaybee_logo.png',
        alt='Kaybee Logo Alt'
    ),
    copyright='2018, All Rights Reserved',
    favicon='kaybee_logo.png',
    social_media=dict(
        twitter='xxx',
        github='xxx'
    )
)
