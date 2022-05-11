const { readFileSync } = require('fs');
const COOKIE_NAME = require('./constans');
const VERIFICATION_CODE = require('./constans');
const { verifyToken } = require('../utils/token.js');

const PUBLIC_KEY = readFileSync('./utils/public_key.pem', 'utf-8')

const verifyAuth = async (req, res, next) => {
  const verificationCode = req.headers['x-verification-code']

  if (!verificationCode || verificationCode !== VERIFICATION_CODE) {
    return res.status(403).json({ message: 'Нет кода верификации' })
  }

  const refreshToken = req.cookies[COOKIE_NAME]

  if (!refreshToken) {
    return res.status(403).json({ message: 'Нет токена обновления' })
  }

  try {
    const decoded = await verifyToken(refreshToken, PUBLIC_KEY)

    console.log('Декодированный токен обновления', decoded)
    if (!decoded) {
      return res.status(403).json({ message: 'Неправильный токен обновления' })

    }

    req.user = decoded
    next()

  } catch (e) {
    if (e.name === 'TokenExpiredError') {
      return res.status(401).json({ message: 'Токен обновления просрочен' })
    }

    console.error(e)
    console.log('Ошибка в verifyAuth middleware')
    next(e)
  }
}

module.exports = verifyAuth;
