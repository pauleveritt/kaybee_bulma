from sphinx.application import Sphinx

from kaybee.app import kb
from kaybee.plugins.widgets.base_widget import (
    BaseWidget,
    BaseWidgetModel,
)


class FilteredlistingModel(BaseWidgetModel):
    listing_flag: int


@kb.widget('filtered_listing')
class FilteredlistingWidget(BaseWidget):
    greeting = 'widget greeting'
    props: FilteredlistingModel

    def make_context(self, context, sphinx_app: Sphinx):
        prev = dict(
            link='xyz.html',
            title='Some Next Thing'
        )
        steps = [
            dict(
                docname='a/b/c',
                href='#xyz',
                title='Project Setup',
                excerpt='Use PyCharm to create and open the project with all '
                        'dependencies, then see some of the IDE features in '
                        'action.',
                author_info=dict(
                    headshot='../authors/pauleveritt/paul_headshotx24.jpeg',
                    href='#author_info',
                    title='Paul Everitt'
                ),
                references=[
                    dict(
                        docname='ref/1',
                        href='#path',
                        label='cra'
                    )
                ],
                duration='2m32s',
                published='1998/99/88'
            )
        ]

        filtering = [
            dict(
                heading='Resource Type',
                control='checkbox',
                choices=[
                    dict(label='Article', key='article'),
                    dict(label='Blog Post', key='blogpost'),
                    dict(label='Blog Tutorial', key='blogtutorial'),
                    dict(label='Tip', key='tips'),
                    dict(label='Tutorial', key='tutorial'),
                    dict(label='Webinar', key='webinar'),
                ]
            ), dict(
                heading='Date',
                control='radio',
                choices=[
                    dict(label='Any Time', key='anytime'),
                    dict(label='Today', key='today'),
                    dict(label='This Week', key='thisweek'),
                    dict(label='This Month', key='thismonth'),
                    dict(label='This Year', key='thisyear'),
                ]
            ),
            dict(
                heading='Technology',
                control='select',
                choices=[
                    dict(label='Ansible', key='ansible'),
                    dict(label='AWS', key='aws'),
                    dict(label='create-react-app', key='cra'),
                    dict(label='Docker', key='docker'),
                    dict(label='Enzyme', key='enzyme'),
                    dict(label='Flask', key='flask'),
                ]
            ),
            dict(
                heading='Topic',
                control='select',
                choices=[
                    dict(label='Breakpoints', key='breakpoints'),
                    dict(label='Debugging', key='debugging'),
                    dict(label='HTTP Client', key='httpclient'),
                    dict(label='Navigation', key='navigation'),
                    dict(label='Python Console', key='pythonconsole'),
                ]
            ),
        ]

        context['steps'] = steps
        context['prev'] = prev
        context['filtering'] = filtering
