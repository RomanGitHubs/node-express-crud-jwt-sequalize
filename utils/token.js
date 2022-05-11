const jwt  = require('jsonwebtoken');

const signToken = (payload, secret, options) => {

  console.log(payload, '// PAYLOAD, token.js')
  console.log(secret, '// SECRET, token.js')
  console.log(options, '// OPTIONS, token.js')

  return jwt.sign(payload, secret, options)
}

const verifyToken = (token, secret) => {
  console.log(token)
  console.log(secret)
  return jwt.verify(token, secret)
}

module.exports = {signToken, verifyToken}
