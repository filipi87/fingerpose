const express = require('express')

const loadConfig = function () {
  const config = require('./app.json')
  return config
}

const start = async () => {
  const config = loadConfig()
  const app = express()
  app.use('/', express.static('./demo', {
      index: 'index2.html'
  }))
  app.use('/dist', express.static('./dist'))
  app.listen(config.port, () => {
    console.log(`recognition-service listening on port ${config.port}`)
  })
}
start()

