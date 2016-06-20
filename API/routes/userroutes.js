'use strict'
const express = require('express')
const router = express.Router()
let User = require('./../models/user.js')
let checkToken = require('./../middlewares/checkToken.js')

router.get('/', (req, res, next) => {
  User.getUsers((err, users) => {
    if (err) {
      next(err)
    } else {
      res.json(users)
    }
  })
})

router.post('/', (req, res, next) => {
  User.createUser(req.body, (err, user) => {
    if (err) {
      next(err)
    } else {
      res.json(user)
    }
  })
})

router.put('/changeusername', checkToken, (req, res, next) => {
  User.updateUsername(req.body.username, req.user._doc._id, (err, user) => {
    if (err) {
      next(err)
    } else {
      res.json(user)
    }
  })
})

router.delete('/', checkToken, (req, res, next) => {
  User.removeById(req.user._doc._id, (err, doc) => {
    if (err) {
      next(err)
    } else {
      res.json(doc)
    }
  })
})

module.exports = router
