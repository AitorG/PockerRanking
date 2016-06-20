'use strict'
const mongoose = require('mongoose')
const Schema = mongoose.Schema
const encryptString = require('./../helpers/encryptString')
const jwt = require('jsonwebtoken')
const config = require('./../config.js')

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

userSchema.statics.removeById = function(userId, callback) {
  if (!userId) {
    callback(new Error('userId is required'), null)
  } else {
    this.remove({ _id: userId }, (err, doc) => {
      callback(err, doc)
    })
  }
}

userSchema.statics.login = function(username, password, callback) {
  if (!username || !password) {
    callback(new Error('username or password are required'), null)
  } else {
    encryptString(password, encryptedPassword => {
      this.findOne({ username: username, password: encryptedPassword }, { password: 0 }, (err, doc) => {
        if (err) {
          callback(err, null)
        } else if (doc) {
          let token = jwt.sign(doc, config.secretKey, { expiresIn: config.tokenExpireIn })
          callback(null, { user: doc, token: token })
        } else if (!doc) {
          callback(new Error('Username or password invalid'), null)
        }
      })
    })
  }
}

userSchema.statics.getUsers = function(callback) {
  this.find({}, { password: 0 }, (err, users) => {
    if (err) {
      callback(err, null)
    } else {
      callback(null, users)
    }
  })
}

userSchema.statics.updateUsername = function(username, userId, callback) {
  if (username && userId) {
    this.findById(userId, (err, doc) => {
      if (err) {
        callback(err, null)
      } else {
        doc.username = username
        doc.save((err, doc) => {
          callback(err, doc)
        })
      }
    })
  } else {
    callback(new Error('Username and userId is required'), null)
  }
}

module.exports = mongoose.model('User', userSchema)
