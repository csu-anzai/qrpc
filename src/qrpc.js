const express = require('express')
const app = express()
const { log } = require('./utils')

app.get('/', async (req, res, next) => {
  res.json({ hello: ', world!' })
})

app.listen(9983, () => {
  log('starting api server ...', 'wait')
  log('ready on http://localhost:9983', 'ready')
})
