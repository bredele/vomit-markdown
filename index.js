/**
 * Dependencies.
 */

var marked = require('marked')
var through = require('through')


/**
 *
 */

module.exports = function(data) {
  return through(function(chunk) {
    var that = this
    marked(chunk.toString(), (err, content) => {
      that.queue(err ? render(err, data) : content)
    })
  })
}


/**
 * Override code highlighting.
 */

marked.setOptions({
  highlight: function (code, lang, cb) {
    if(lang == 'vomit') cb(snippet(code))
  }
})


/**
 * Render highlighted code and live example.
 *
 * @param {String} code
 * @param {Object} data
 * @api private
 */

function render(code, data) {
  return `<script>
    ${code}
    var el = fn(${JSON.stringify(data.data)})
    document.currentScript.parentElement.appendChild(el)
    </script>`
}


/**
 * Render snippet script.
 *
 * @param {String} code
 * @api private
 */

function snippet(code)  {
  return `var fn = (function() {${code}return component})()`
}
