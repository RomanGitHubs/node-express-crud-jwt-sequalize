const { ACCESS_TOKEN_SECRET } = require('./constans')
const { verifyToken } = require('../utils/token.js');

const verifyAccess = async (req, res, next) => {
  const accessToken = req.headers.authorization.split(' ')[1]

  if (!accessToken) {
    return res.status(403).json({ message: 'Нет токена доступа' })
  }

  try {
    console.log(accessToken)
    console.log(">>>AA>>>", ACCESS_TOKEN_SECRET )
    const decoded = verifyToken(accessToken, ACCESS_TOKEN_SECRET)
    console.log('Декодированный токен доступа: ', decoded)

    if (!decoded) {
      return res.status(403).json({ message: 'Неправильный токен доступа' })
    }

    req.user = decoded

    next()
  } catch (e) {
    if (e.name === 'TokenExpiredError') {
      return res.status(401).json({ message: 'Срок токена доступа истек' })
    }

    console.error(e)
    console.log('Error verifyAccess middleware')
    next(
      {status: 400,
      message: e.message,
      }
    )
  }
}

module.exports = verifyAccess;
