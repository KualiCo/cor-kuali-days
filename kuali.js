const request = require('request-promise')

const KUALI_SERVER = 'https://kd2016-tst.kuali.co'

function authenticate(authHeader) {
  return request({
    method: 'POST',
    uri: `${KUALI_SERVER}/api/v1/auth/authenticate`,
    headers: {
      'Authorization': authHeader
    },
    json: true
  }).then(res => res.token)
}

function getCurrentUser(token) {
  return request({
    method: 'GET',
    uri: `${KUALI_SERVER}/api/v1/users/current`,
    headers: {
      'Authorization': `Bearer ${token}`
    },
    json: true
  })
}

function getUnapprovedUsers(token) {
  return request({
    method: 'GET',
    uri: `${KUALI_SERVER}/api/v1/users/?approved=false`,
    headers: {
      'Authorization': `Bearer ${token}`
    },
    json: true
  })
}

function approveUser(user, token) {
  user.approved = true
  return request({
    method: 'PUT',
    uri: `${KUALI_SERVER}/api/v1/users/${user.id}`,
    headers: {
      'Authorization': `Bearer ${token}`
    },
    body: user,
    json: true
  })
}

module.exports = {
  authenticate,
  getCurrentUser,
  getUnapprovedUsers,
  approveUser
}