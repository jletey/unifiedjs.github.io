'use strict'

var unified = require('unified')
var markdown = require('remark-parse')
var frontmatter = require('remark-frontmatter')
var remark2rehype = require('remark-rehype')
var raw = require('rehype-raw')
var slug = require('rehype-slug')
var autolink = require('rehype-autolink-headings')
var highlight = require('rehype-highlight')
var pkg = require('../../package.json')
var rehypeLink = require('../plugin/rehype-link')
var link = require('../atom/icon/link')
var rewriteUrls = require('../plugin/rehype-rewrite-urls')
var abbr = require('../plugin/rehype-abbreviate')

var origin = pkg.homepage

module.exports = unified()
  .use(markdown)
  .use(frontmatter)
  .use(remark2rehype, {allowDangerousHTML: true})
  .use(raw)
  .use(highlight, {subset: false, ignoreMissing: true})
  .use(slug)
  .use(autolink, {
    behavior: 'prepend',
    properties: {ariaLabel: 'Link to self', className: ['anchor']},
    content: link()
  })
  .use(abbr, {
    AST: 'Abstract syntax tree',
    CLI: 'Command-line interface',
    DOM: 'Document object model',
    HSL: 'Hue, saturation, lightness',
    HTML: 'Hypertext markup language',
    JSX: null,
    MDX: null,
    XML: 'Extensible Markup Language'
  })
  .use(rehypeLink)
  .use(rewriteUrls, {origin})
  .freeze()
