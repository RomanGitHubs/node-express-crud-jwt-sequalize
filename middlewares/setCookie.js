const { readFileSync } = require('fs');
const { ACCESS_TOKEN_SECRET, COOKIE_NAME } = require('./index');
const { signToken } = require('../utils/token.js');

const PRIVATE_KEY = readFileSync('./config/private_key.pem', 'utf8')

const setCookie = async (req, res, next) => {
  const user = req.user

  if (!user) {
    return res.status(400).json({ message: 'User must be provided' })
  }

  try {
    const accessToken = await signToken(
      { userId: user.userId, role: user.role },
      ACCESS_TOKEN_SECRET,
      {
        expiresIn: '1h'
      }
    )

    let refreshToken
    if (!req.cookies[COOKIE_NAME]) {
      refreshToken = await signToken({ userId: user.userId }, PRIVATE_KEY, {
        algorithm: 'RS256',
        expiresIn: '7d'
      })

      res.cookie(COOKIE_NAME, refreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: 'none'
      })
    }

    res.status(200).json({ user, accessToken })
  } catch (e) {
    console.log('*setCookie middleware')
    next(e)
  }
}

module.exports = setCookie;
