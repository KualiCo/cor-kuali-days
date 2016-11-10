'use strict'

const express = require('express')
const request = require('request-promise')
const kuali = require('./kuali')

const routes = new express.Router()

routes.post('/api/login', (req, res, next) => {
  kuali.authenticate(req.get('Authorization'))
  .then(token => {
    req.session.token = token
    res.end()
  }).catch(next)
})
routes.get('/api/current-user', (req, res, next) => {
  kuali.getCurrentUser(req.session.token)
  .then(user => {
    res.send(user)
  }).catch(err => {
    next(err)
  })
})
routes.get('/api/unapproved-users', (req, res, next) => {
  kuali.getUnapprovedUsers(req.session.token)
  .then(users => {
    res.send(users)
  }).catch(err => {
    next(err)
  })
})
routes.post('/api/approve-users', (req, res, next) => {
  const userList = req.body
  Promise.all(userList.map(u => {
    return kuali.approveUser(u, req.session.token)
  })).then(() => {
    res.end()
  }).catch(err => {
    next(err)
  })
})

module.exports = routes
