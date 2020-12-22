const express = require('express')
const path = require('path')
const shrinkRay = require('shrink-ray-current')
/*eslint-disable no-console */

const port = 5000
const app = express()

app.use(shrinkRay())
app.use(express.static(path.join(__dirname, 'dist')))

app.get('*.js', (req, res, next) => {
  req.url = req.url + '.br'
  res.set('Content-Encoding', 'br')
  next()
})

app.get('*.css', (req, res, next) => {
  req.url = req.url + '.br'
  res.set('Content-Encoding', 'br')
  next()
})

app.get('*.woff2', (req, res, next) => {
  req.url = req.url + '.br'
  res.set('Content-Encoding', 'br')
  next()
})

app.get('/', (_, res) => {
  res.setHeader(
    'Cache-Control',
    'no-store, no-cache, must-revalidate, proxy-revalidate'
  )
  res.sendFile(path.join(__dirname, 'dist', 'index.html'))
})
app.listen(port, (err) => {
  if (err) {
    console.log(err)
  } else {
    console.log('Web started on port ', port)
  }
})
