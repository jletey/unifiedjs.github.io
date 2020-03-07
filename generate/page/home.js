'use strict'

var h = require('hastscript')
var block = require('../atom/macro/block')
var articlesList = require('../component/article/list')
var articlesSort = require('../component/article/helper-sort')
var sortPkg = require('../component/package/helper-sort')
var listPkg = require('../component/package/list')
var sponsors = require('../component/sponsor/list')
var cases = require('../component/case/list')
var compact = require('../util/fmt-compact')
var pick = require('../util/pick-random')
var page = require('./page')

module.exports = home

function home(data) {
  var {packageByName, projectByRepo} = data
  var names = sortPkg(data, Object.keys(packageByName))
  var repos = Object.keys(projectByRepo)
  var downloads = names.map(d => packageByName[d].downloads).reduce(sum, 0)
  var stars = repos.map(d => projectByRepo[d].stars).reduce(sum, 0)
  var d = pick(names.slice(0, 75), 5)

  return page(
    [
      h('.landing', [
        h('.article', [
          h('h2', 'Content as structured data'),
          h('p', [
            'We compile content to syntax trees and syntax trees to content. ',
            h('br'),
            'We ',
            h('em', 'also'),
            ' provide hundreds of packages to work on the trees in ',
            'between. ',
            h('br'),
            h('strong', 'You'),
            ' can build on the ',
            h('strong', 'unified collective'),
            ' to make all kinds of interesting things. '
          ])
        ])
      ])
    ],
    [
      h('.article.content', [
        h('h2', 'Build'),
        h('p', [
          h('b', 'We provide the building blocks'),
          ': from tiny, focussed, modular utilities to plugins that combine ',
          'them to perform bigger tasks. ',
          'And much, much more. ',
          'You can build on unified, mixing and matching building blocks ',
          'together, to make all kinds of interesting new things. '
        ])
      ]),
      cases(data.users, {max: 6}),
      h('.article.content', [
        h('h2', 'Learn'),
        h('p', [
          h('b', 'We provide the interface'),
          ': for parsing, inspecting, transforming, and serializing content. ',
          'You work on structured data. ',
          'Learn how to plug building blocks together, write your own, and ',
          'make things with unified. '
        ])
      ]),
      articlesList({pathname: '/learn/'}, articlesSort(data.articles), {
        max: 6
      }),
      h('.article.content', [
        h('h2', 'Explore'),
        h('p', [
          'The ever growing ecosystem that the unified collective provides ',
          'today consists of ' + repos.length + ' open source projects, ',
          'with a combined ',
          h('strong', compact(stars)),
          ' stars on GitHub. ',
          'In the last 30 days, the ' + names.length + ' packages maintained ',
          'in those projects were downloaded ',
          h('strong', compact(downloads)),
          ' times from npm. ',
          'Much of this is maintained by our teams, yet others are provided ',
          'by the community. '
        ])
      ]),
      listPkg(data, d, {trail: explore()}),
      h('.article.content', [
        h('h2', 'Sponsor'),
        h('p', [
          'Maintaining the collective, developing new projects, keeping ',
          'everything fast and secure, and helping users, is a lot of work. ',
          'Thankfully, we are backed financially by our sponsors. ',
          'This allows us to spend more time maintaining our projects and ',
          'developing new ones. ',
          'To support our efforts financially, sponsor or back us on ',
          h('a', {href: 'http://opencollective.com/unified'}, 'OpenCollective'),
          '.'
        ])
      ]),
      sponsors(data.sponsors, {max: 6})
    ]
  )

  function explore() {
    return block(
      h(
        'a.box.more',
        {href: '/explore/'},
        h('.column', [
          h(
            'p',
            'See ' +
              names.length +
              ' packages and ' +
              repos.length +
              ' projects'
          )
        ])
      )
    )
  }
}

function sum(a, b) {
  return a + (b || 0)
}
