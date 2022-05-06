const { ACCESS_TOKEN_SECRET } = require('./index');
const { verifyToken } = require('../utils/token.js');

const verifyAccess = async (req, res, next) => {
  const accessToken = req.headers.authorization.split(' ')[1]

  if (!accessToken) {
    return res.status(403).json({ message: 'Нет токена доступа' })
  }

  try {
    const decoded = await verifyToken(accessToken, ACCESS_TOKEN_SECRET)
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

    console.log('Error verifyAccess middleware')
    next(e)
  }
}

module.exports = verifyAccess;
