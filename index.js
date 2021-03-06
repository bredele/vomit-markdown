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
    str.replace(/\`\`\`vomit((.|\n)*)\`\`\`/g, function(all, expr, _, idx) {
      queue(marked(str.substring(i, idx)))
      queue(render(expr, data))
      i = idx + all.length
    })
    queue(marked(str.substring(i)))
  })
}




/**
 * Render code and live example.
 *
 * @param {String} code
 * @param {Object} data
 * @api private
 */

function render(code, data) {
  var js = '```js' + code + '```'
  return `<div class="vomit-snippet"><div class="column">${marked(js)}</div><div class="column"><script>
(function() {${code}document.currentScript.parentElement.appendChild(component(${JSON.stringify(data.data)}))
})()</script></div></div>`
}
