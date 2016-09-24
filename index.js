/**
 * Dependencies.
 */

var marked = require('marked')
var through = require('through')


/**
 *
 */

module.exports = function() {
  return through(function(data) {
      this.queue(marked(data.toString()))
  })
}


/**
 * Override code highlighting.
 */

marked.setOptions({
  highlight: function (code, lang, callback) {
    //console.log(code, lang)
  }
});
