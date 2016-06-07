'use strict'
const jwt = require('jsonwebtoken')
const config = require('./../config')

module.exports = (req, res, next) => {
  let token = req.body.token || req.query.token || req.headers['authorization']

  if (token) {
    jwt.verify(token, config.secretKey, (err, decoded) => {
      if (err) {
        err.status = 401
        next(err)
      } else {
        req.user = decoded
        next()
      }
    })
  } else {
    let err = new Error('No token provided')
    err.status = 401
    next(err)
  }
}
