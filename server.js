const fs = require('fs')
const path = require('path')
const express = require('express')
const {
  createBundleRenderer
} = require('vue-server-renderer')
const resolve = file => path.resolve(__dirname, file)

// ======== const =========
const isProd = process.env.NODE_ENV === 'production'

// ======== basic functions ==========
const app = express()

const serverBundle = require('./dist/vue-ssr-server-bundle.json')
const template = fs.readFileSync('./src/index.template.html', 'utf-8')
const clientManifest = require('./dist/vue-ssr-client-manifest.json')
const renderer = createBundleRenderer(serverBundle, {
  runInNewContext: false, // 推荐
  template: template,
  clientManifest: clientManifest
})

// app.use('/dist', express.static('./dist', true))

app.get('*', (req, res) => {
  const context = {
    url: req.url,
    title: 'vue ssr'
  }
  // 这里无需传入一个应用程序，因为在执行 bundle 时已经自动创建过。
  // 现在我们的服务器与应用程序已经解耦！
  renderer.renderToString(context, (err, html) => {
    // 处理异常……
    if (err) {
      if (err.code === 404) {
        res.status(404).end('Page not found!')
      } else {
        res.status(500).end('500 error')
      }
    } else {
      res.send(html)
    }
  })
})

const port = process.env.PORT || 9999
app.listen(port, () => {
  console.log(`server started at localhost:${port}`)
})