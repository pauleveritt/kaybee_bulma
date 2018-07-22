from typing import List

from pydantic import BaseModel


class Logo(BaseModel):
    img_url: str = None
    img_file: str = None
    alt: str = None


class SocialMedia(BaseModel):
    twitter: str = None
    github: str = None


class NavbarStartEntry(BaseModel):
    css_class: str
    accent: str
    icon: str
    label: str
    label_narrow: str = None
    href: str


class NavbarEndLink(BaseModel):
    color: str
    href: str
    icon: str


class NavbarEndButton(BaseModel):
    accent: str
    href: str
    label: str


class NavbarEnd(BaseModel):
    links: List[NavbarEndLink]
    buttons: List[NavbarEndButton]


class Navbar(BaseModel):
    start: List[NavbarStartEntry] = []
    end: NavbarEnd = None


class SiteConfig(BaseModel):
    logo: Logo = None
    social_media: SocialMedia = None
    copyright: str = 'All Rights Reserved'
    feed_url: str = ''
    favicon: str = None
    is_debug = False
    description: str = None
    navbar: Navbar = None
