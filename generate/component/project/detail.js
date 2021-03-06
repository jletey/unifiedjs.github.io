'use strict'

var h = require('hastscript')
var list = require('../package/list')
var sort = require('../package/helper-sort')

module.exports = detail

function detail(data, d) {
  var {packagesByRepo} = data
  var packages = packagesByRepo[d]

  return [
    h(
      '.content',
      h('h3', ['Packages in ', packages.length > 1 ? 'monorepo' : 'project'])
    ),
    list(data, sort(data, packages))
  ]
}
