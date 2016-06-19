'use strict'
const express = require('express')
const router = express.Router()
let User = require('./../models/user.js')

router.post('/', (req, res, next) => {
  User.login(req.body.username, req.body.password, (err, doc) => {
    if (err) {
      next(err)
    } else {
      res.json(doc)
    }
  })
})

module.exports = router
