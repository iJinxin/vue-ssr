const fs = require('fs')
const Vue = require('vue')
const server = require('express')()
// const renderer = require('vue-server-renderer').createRenderer()
const { createBundleRenderer } = require('vue-server-renderer')

const renderer = createBundleRenderer()

server.get('*', (req, res) => {
  const app = new Vue({
    data: {
      url: req.url
    },
    template: fs.readFileSync('./src/index.template.html', 'utf-8')
  })
  renderer.renderToString(app, (err, html) => {
    if (err) {
      res.status(500).end("500 error")
      return
    }
    res.send(html)
  })
})

server.listen(8080)