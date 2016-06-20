'use strict'
let should = require('should')
let mongoose = require('mongoose');
let config = require('./../config');
let User = require('./../models/user')
mongoose.connect(config.database);

describe('UserSpec', () => {
  describe('createUser', () => {
    it('Should return a error if username or password or admin are null', (done) => {
      let userToCreate = {
        username: null,
        password: null,
        admin: null,
        points: null,
        lastGame: null,
      }
      User.createUser(userToCreate, (err, user) => {
        err.message.should.be.equal('User validation failed')
        done()
      })
    })

    it('Should return a error if username are in use', (done) => {
      let userToCreate = {
        username: 'zamarrowski',
        password: 'lolazo03',
        admin: true,
        points: null,
        lastGame: null,
      }
      User.createUser(userToCreate, (err, user) => {
        err.message.should.be.equal('Username in use')
        done()
      })
    })

    it('Should return a error if points or lastGame are not null', (done) => {
      let userToCreate = {
        username: Math.random(),
        password: Math.random(),
        admin: false,
        points: 54,
        lastGame: new Date()
      }
      User.createUser(userToCreate, (err, user) => {
        err.message.should.be.equal('Points and lastgame should be null')
        done()
      })
    })

    it('Should return a doc with user', (done) => {
      let userToCreate = {
        username: Math.random().toString(),
        password: Math.random().toString(),
        admin: false,
        points: null,
        lastGame: null
      }
      User.createUser(userToCreate, (err, user) => {
        user.username.should.be.equal(userToCreate.username)
        user.admin.should.be.equal(userToCreate.admin)
        done()
      })
    })
  })

  describe('removeById()', () => {
    it('Should return n:1 and ok:1 when delete a user', (done) => {
      let userToCreate = {
        username: Math.random().toString(),
        password: 'password',
        admin: false,
        points: null,
        lastGame: null
      }
      User.createUser(userToCreate, (err, user) => {
        User.removeById(user._id, (err, response) => {
          response.result.ok.should.be.equal(1)
          response.result.n.should.be.equal(1)
          done()
        })
      })
    })

    it('Should return error if userId is null', (done) => {
      User.removeById(null, (err, response) => {
        err.message.should.be.equal('userId is required')
        done()
      })
    })
  })

  describe('login()', () => {
    it('Should return a user doc if login is correct', (done) => {
      let loginInfo = {
        username: 'zamarrowski',
        password: 'lolazo03',
      }
      User.login(loginInfo.username, loginInfo.password, (err, doc) => {
        doc.user.username.should.be.equal('zamarrowski')
        done()
      })
    })

    it('Should return a user doc without password if login is correct', (done) => {
      let loginInfo = {
        username: 'zamarrowski',
        password: 'lolazo03',
      }
      User.login(loginInfo.username, loginInfo.password, (err, doc) => {
        doc.user.username.should.be.equal('zamarrowski')
        should.not.exist(doc.user.password)
        done()
      })
    })

    it('Should return a token if login is correct', (done) => {
      let loginInfo = {
        username: 'zamarrowski',
        password: 'lolazo03',
      }
      User.login(loginInfo.username, loginInfo.password, (err, doc) => {
        doc.user.username.should.be.equal('zamarrowski')
        should.exist(doc.token)
        done()
      })
    })

    it('Should return a error if password or username are null', (done) => {
      let loginInfo = {
        username: null,
        password: 'lolazo03',
      }
      User.login(loginInfo.username, loginInfo.password, (err, doc) => {
        err.message.should.be.equal('username or password are required')
        done()
      })
    })

    it('Should return a error if user not found', (done) => {
      let loginInfo = {
        username: 'trytofindthisusername',
        password: 'trytofindthisusername',
      }
      User.login(loginInfo.username, loginInfo.password, (err, doc) => {
        err.message.should.be.equal('Username or password invalid')
        done()
      })
    })

  })

  describe('getUsers', () => {
    it('Should return an array of users', (done) => {
      User.getUsers((err, users) => {
        users.length.should.be.above(0)
        users.should.be.instanceof(Array)
        done()
      })
    })

    it('Should return an array of users without passwords', (done) => {
      User.getUsers((err, users) => {
        should.not.exist(users[0].password)
        done()
      })
    })
  })

  describe('updateUsername', () => {
    it('Should return a user with the same username', (done) => {
      let userToCreate = {
        username: Math.random().toString(),
        password: Math.random().toString(),
        admin: false,
        points: null,
        lastGame: null
      }
      let newUsername = Math.random().toString()
      User.createUser(userToCreate, (err, user) => {
        User.updateUsername(newUsername, user._id, (err, updatedUser) => {
          updatedUser.username.should.be.equal(newUsername)
          User.removeById(updatedUser._id, (err, doc) => {
            done()
          })
        })
      })
    })

    it('Should return a error if username is null', (done) => {
      User.updateUsername(null, null, (err, updatedUser) => {
        err.message.should.be.equal('Username and userId is required')
        done()
      })
    })

    it('Should return a error if userId is null', (done) => {
      User.updateUsername(null, null, (err, updatedUser) => {
        err.message.should.be.equal('Username and userId is required')
        done()
      })
    })
  })

  describe('Change password', () => {
    it('Should return a user with the new password', (done) => {
      let userToCreate = {
        username: Math.random().toString(),
        password: Math.random().toString(),
        admin: false,
        points: null,
        lastGame: null
      }
      let newPassword = Math.random().toString()
      User.createUser(userToCreate, (err, user) => {
        User.changePassword(userToCreate.password, newPassword, user._doc._id, (err, updatedUser) => {
          updatedUser.password.should.not.equal(user.password)
          User.removeById(updatedUser._id, (err, doc) => {
            done()
          })
        })
      })
    })

    it('Should return a error if oldpassword is incorrect', (done) => {
      let userToCreate = {
        username: Math.random().toString(),
        password: Math.random().toString(),
        admin: false,
        points: null,
        lastGame: null
      }
      let newPassword = Math.random().toString()
      User.createUser(userToCreate, (err, user) => {
        User.changePassword(user.password, 'distinta', user._doc._id, (err, user) => {
          err.message.should.be.equal('Password is incorrect')
          done()
        })
      })
    })

    it('Should return a error if password is null', (done) => {
      User.changePassword(null, null, null, (err, user) => {
        err.message.should.be.equal('Password, newPassword and userId are required')
        done()
      })
    })

    it('Should return a error if newPassword is null', (done) => {
      User.changePassword(null, null, null, (err, user) => {
        err.message.should.be.equal('Password, newPassword and userId are required')
        done()
      })
    })

    it('Should return a error if userId is null', (done) => {
      User.changePassword(null, null, null, (err, user) => {
        err.message.should.be.equal('Password, newPassword and userId are required')
        done()
      })
    })

  })

})
