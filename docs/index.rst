.. kbbhomepage::
    published: 2009-10-21 12:23
    default_navpage: learn/index

=======================================
Kaybee: Knowledge Base for Static Sites
=======================================

.. filteredlisting::
    name: kbbfl
    filename: ../catalog.json

.. raw:: html

    <section class="section">
        <div class="container">
          <p class="subtitle">
            Write and organize content with pleasure. Kaybee is a
            static site generator based on Sphinx which
            emphasizes good looks, rich interconnections, and
            creating your own kinds of documents.
          </p>
        </div>
    </section>
    <section class="section hero is-primary">
        <div class="container">
          <h1 class="title">
            Hello World
          </h1>
          <p class="subtitle">
            My first website with <strong>Bulma</strong>!
          </p>
        </div>
    </section>
    <section class="section hero is-info">
        <div class="container">
          <h1 class="title">
            Hello World
          </h1>
          <p class="subtitle">
            My first website with <strong>Bulma</strong>!
          </p>
        </div>
    </section>

Contents
--------

.. toctree::
    :hidden:

    learn/index
    about
    technologies/index
    blog/index
    articles/index
    features/index
    authors/index
    topics/index
    ide/index
    resources/index
    tips/index
    README

.. querylist::
    name: ql1
    template: querylist
    queries:
        - label: Recent Blog Posts
          style: primary
          query:
              rtype: section
              limit: 5
        - label: Recent Articles
          style: info
          query:
              rtype: article
              limit: 5
