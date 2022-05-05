const { jwt } = require('jsonwebtoken');

const signToken = async (payload, secret, options) =>
  await jwt.sign(payload, secret, options)

const verifyToken = async (token, secret) =>
  await jwt.verify(token, secret)

module.exports = {signToken, verifyToken}
