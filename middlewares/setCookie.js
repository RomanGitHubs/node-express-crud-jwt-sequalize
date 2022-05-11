const { readFileSync } = require('fs');
const { ACCESS_TOKEN_SECRET } = require('./constans')
const COOKIE_NAME = require('./index');
const { signToken } = require('../utils/token.js');

const PRIVATE_KEY = readFileSync('./utils/private_key.pem', 'utf8')

const setCookie = async (req, res, next) => {
  const user = req.user
  console.log(user, "// USER IN COOKIE")

  if (!user) {
    return res.status(400).json({ message: 'Должен быть предоставлен пользователь' })
  }

  try {
    const accessToken = await signToken(
      { id: user.id, email: user.email ,role: user.role },
      ACCESS_TOKEN_SECRET,
      {
        expiresIn: '1h'
      }
    )

    // let refreshToken
    // if (!req.cookies[COOKIE_NAME]) {
    //   refreshToken = await signToken({ userId: user.id }, PRIVATE_KEY, {
    //     algorithm: 'RS256',
    //     expiresIn: '7d'
    //   })
    //
    //   res.cookie(COOKIE_NAME, refreshToken, {
    //     httpOnly: true,
    //     secure: true,
    //     sameSite: 'none'
    //   })
    // }

    res.status(200).json({ user, accessToken })
  } catch (e) {
    console.log('Ошибка в setCookie middleware')
    next(e)
  }
}

module.exports = setCookie;
