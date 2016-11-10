'use strict'

const express = require('express')
const request = require('request-promise')
const kuali = require('./kuali')

const routes = new express.Router()

routes.post('/api/login', (req, res) => {
  kuali.authenticate(req.get('Authorization'))
  .then(token => {
    req.session.token = token
    res.end()
  })
})
routes.get('/api/current-user', (req, res, next) => {
  kuali.getCurrentUser(req.session.token)
  .then(user => {
    res.send(user)
  }).catch(err => {
    next(err)
  })
})

module.exports = routes
