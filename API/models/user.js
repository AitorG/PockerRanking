'use strict'
const mongoose = require('mongoose')
const Schema = mongoose.Schema
const encryptString = require('./../helpers/encryptString')

let userSchema = new Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  admin: { type: Boolean, required: true },
  points: Number,
  lastGame: Date
})

userSchema.statics.createUser = function(userToCreate, callback) {
  userToCreate = new this(userToCreate)
  userToCreate.validate(err => {
    if (err) {
      callback(err, null)
    } else {
      this.checkUsername(userToCreate.username, (err, number) => {
        if (err) {
          callback(err, null)
        } else {
          if (number > 0) {
            callback(new Error('Username in use'), null)
          } else {
            if (!userToCreate.points && !userToCreate.lastGame) {
              encryptString(userToCreate.password, encryptedPassword => {
                userToCreate.password = encryptedPassword
                userToCreate.save((err, doc) => {
                  callback(err, doc)
                })
              })
            } else {
                callback(new Error('Points and lastgame should be null'), null)
            }
          }
        }
      })
    }
  })
}

userSchema.statics.checkUsername = function(username, callback) {
  this.count({username: username}, (err, number) => {
    callback(err, number)
  })
}

module.exports = mongoose.model('User', userSchema)
