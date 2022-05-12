const ACCESS_TOKEN_SECRET = require('../utils/constans')
const { verifyToken } = require('../utils/token.js');
const catchError = require("../utils/catchError");

const verifyAccess = async (req, res, next) => {

  try {
    if (!req.headers.authorization) catchError('Нет токена доступа', 403)

    const accessToken = req.headers.authorization.split(' ')[1]

    const decoded = verifyToken(accessToken, ACCESS_TOKEN_SECRET)

    if (!decoded) {
      catchError('Неправильный токен доступа', 403)
    }

    req.user = decoded

    next()
  } catch (e) {
    if (e.name === 'TokenExpiredError') {
      return res.status(401).json({ message: 'Срок токена доступа истек' })
    }
    console.log('Error verifyAccess middleware')
    next(e)
  }
}

module.exports = verifyAccess;
