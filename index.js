/**
 * Dependencies.
 */

var marked = require('marked')
var through = require('through')


/**
 * Render and highlight vomit component.
 *
 * @param {Object} data
 * @api public
 */

module.exports = function(data) {
  return through(function(chunk) {
    var queue = this.queue.bind(this)
    var str = chunk.toString()
    var i = 0
    str.replace(/\`\`\`vomit([^```]*)\`\`\`/g, function(all, expr, idx) {
      queue(marked(str.substring(i, idx)))
      queue(render(snippet(expr), data))
      i = idx + all.length
    })
    queue(marked(str.substring(i)))
  })
}




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
