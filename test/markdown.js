/**
 * Test dependencies.
 */

var test = require('tape')
var fs = require('fs')
var concat = require('concat-stream')
var markdown = require('..')


test('should render markdown', assert => {
  assert.plan(1)
  var result = concat(data => assert.equal(data.toString(), '<h1 id="hello">hello</h1>\n'))
  fs.createReadStream(__dirname + '/hello.md')
    .pipe(markdown())
    .pipe(result)
})

test('should render vomit snippet', assert => {
  assert.plan(1)
  var result = concat(data => assert.equal(data.toString(), '<script>\n    var fn = (function() {function component(data) {\n  return vomit`<button>${data}</button>`\n}return component})()\n    var el = fn("hello")\n    document.currentScript.parentElement.appendChild(el)\n    </script>'))
  fs.createReadStream(__dirname + '/snippet.md')
    .pipe(markdown({
      data: 'hello'
    }))
    .pipe(result)
})
