'use strict'

const path = require('path')
const express = require('express')
const session = require('express-session')
const routes = require('./routes')

const PORT = process.env.PORT || 8000

const app = express()
app.use(session({
  secret: 'definitely not keyboard cat',
  cookie: { maxAge: 3600000 },
  resave: true,
  saveUninitialized: true,
  secure: false,
  httpOnly: false
}))

app.use(express.static(path.join(__dirname, 'build')))
app.use(routes)
app.get('*', (req, res, next) => {
  if (req.accepts('html')) {
    res.sendFile(path.join(__dirname, 'build', 'index.html'))
  } else {
    next()
  }
})

app.listen(PORT, () => console.log(`Server started on port ${PORT}`))

