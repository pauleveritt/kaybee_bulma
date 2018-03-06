from setuptools import setup, find_packages
from codecs import open
from os import path

here = path.abspath(path.dirname(__file__))

with open(path.join(here, 'README.rst'), encoding='utf-8') as f:
    long_description = f.read()

setup(
    name='kaybee_bulma',
    version='0.2.11',
    description='Bulma-based theme for Kaybee',
    long_description=long_description,
    url='https://github.com/pauleveritt/kaybee_bulma',
    author='Paul Everitt',
    author_email='pauleveritt@me.com',
    classifiers=[
        'Development Status :: 3 - Alpha',
        'Intended Audience :: Developers',
        'Topic :: Software Development :: Documentation',
        'License :: OSI Approved :: Apache Software License',
        'Programming Language :: Python :: 3.6',
    ],
    keywords='sphinx theme blog website',
    packages=find_packages(exclude=['docs', 'tests']),
    entry_points={
        'sphinx_themes': [
            'path = kaybee_bulma:get_path',
        ]
    },
    install_requires=[
        'sphinx',
        'kaybee'
    ]
)
