'use strict'
const crypto = require('crypto')

module.exports = (string, callback) => {
  let encryptedString = crypto
  .createHash("md5")
  .update(string)
  .digest('hex')

  callback(encryptedString)
}
