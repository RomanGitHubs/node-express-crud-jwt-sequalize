const catchError = require("../../utils/catchError");
const db = require("../../db/models");
const argon2 = require("argon2");
const {signToken} = require("../../utils/token");
const ACCESS_TOKEN_SECRET = require("../../utils/constans");

const loginUser = async (req, res, next) => {

  const enteredEmail = req.body.email
  const enteredPassword = req.body.password

  try {

    if (!enteredEmail || !enteredPassword) {
      catchError('Нужны лонгин и папроль', 400)
    }

    let existingUser = await db.User.findOne({ where: {email: enteredEmail} });

    if (!existingUser) {
      catchError('Такого пользователя не cуществует' , 404)
    }
    const isPasswordCorrect = await argon2.verify(existingUser.password, enteredPassword)

    if (!isPasswordCorrect) {
      catchError('Неправильный пароль' , 403)
    }

    const user = { id: existingUser.id,
      email: existingUser.email,
      role: existingUser.role
    }

    const accessToken = await signToken(
      { id: user.id, email: user.email ,role: user.role },
      ACCESS_TOKEN_SECRET,
      {
        expiresIn: '1h'
      }
    )

    res.status(200).json({ user, accessToken })

  } catch (e) {
    console.log('Ошибка в  loginUser service')
    next(e)
  }
}

module.exports = loginUser;
