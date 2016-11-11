'use strict'

const express = require('express')
const kuali = require('./kuali')

const routes = new express.Router()

routes.post('/api/login', (req, res, next) => {
  res.end()
})
routes.get('/api/current-user', (req, res, next) => {
  res.end()
})
routes.get('/api/unapproved-users', (req, res, next) => {
  res.end()
})
routes.post('/api/approve-users', (req, res, next) => {
  res.end()
})
module.exports = routes
