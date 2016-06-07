'use strict'
const express = require('express')
const router = express.Router()
let User = require('./../models/user.js')

router.post('/', (req, res, next) => {
  User.createUser(req.body, (err, user) => {
    if (err) {
      next(err)
    } else {
      res.json(user)
    }
  })
})

module.exports = router
