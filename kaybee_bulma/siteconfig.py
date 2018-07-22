from typing import List

from pydantic import BaseModel


class Logo(BaseModel):
    img_url: str = None
    img_file: str = None
    alt: str = None


class SocialMedia(BaseModel):
    twitter: str = None
    github: str = None


class NavbarEntry(BaseModel):
    css_class: str
    accent: str
    icon: str
    label: str
    label_narrow: str = None
    href: str


class Navbar(BaseModel):
    start: List[NavbarEntry] = []
    end: List[NavbarEntry] = []


class SiteConfig(BaseModel):
    logo: Logo = None
    social_media: SocialMedia = None
    copyright = 'All Rights Reserved'
    feed_url: str = None
    favicon: str = None
    is_debug = False
    description: str = None
    navbar: Navbar = None
