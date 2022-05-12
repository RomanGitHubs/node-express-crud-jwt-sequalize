const catchError = require("../../utils/catchError");
const db = require("../../db/models");
const argon2 = require("argon2");
const { signToken } = require("../../utils/token");
const ACCESS_TOKEN_SECRET = require("../../utils/constans");

const registerUser = async (req, res, next) => {

  const role = req.body.role;
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const email = req.body.email;
  const password = req.body.password;
  const dob = req.body.dob;

  try {

    if (!role || !firstName || !lastName || !email || !password || !dob) {
      catchError('Поля должны быть зпаолнены', 404)
    }

    const existingUser = await db.User.findOne({ where: { email } })

    if (existingUser) {
      catchError('Пользователь с такием email уже существует', 409)
    }

    const hashedPassword = await argon2.hash(password)

    const newUser = await db.User.create({
      role: role,
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: hashedPassword,
      dob: dob,
    })

    const user = { id: newUser.id, role, firstName, lastName, email, dob }

    if (!user) {
      return res.status(400).json({ message: 'Должен быть предоставлен пользователь' })
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
    console.log('Ошибка в  registerUser service')
    next(e)
  }
}

module.exports = registerUser;
