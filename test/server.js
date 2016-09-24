/**
 * Server dependencies.
 */

var vomit = require('vomit')
var markdown = require('..')
var http = require('http')
var fs = require('fs')

http.createServer((req, res) => {
  switch(req.url) {
    case '/':
      res.writeHead(200, {'Content-Type': 'text/html'})
      vomit`
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <title>Vomit markdown</title>
        </head>
        <body>
        ${fs.createReadStream(__dirname + '/example.md').pipe(markdown({data: "hello"}))}
        </body>
      </html>
      `.pipe(res)
      break
    default:
      res.end()
  }
}).listen(port || 3000)
