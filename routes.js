'use strict'

const express = require('express')
const request = require('request-promise')
const kuali = require('./kuali')

const routes = new express.Router()

routes.post('/api/login', (req, res) => {
  kuali.authenticate(req.get('Authorization'))
  .then(token => {
    console.log('token', token)
    req.session.token = token
    console.log('req.session', req.session)
    console.log('req.session.id', req.session.id)
    req.session.save()
    res.end()
  })
})
routes.get('/api/current-user', (req, res, next) => {
  console.log('req.session.id', req.session.id)
  console.log('req.session', req.session)
  kuali.getCurrentUser(req.session.token)
  .then(user => {
    res.send(user)
  }).catch(err => {
    next(err)
  })
})

module.exports = routes
