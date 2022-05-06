const db = require("../models");
const argon2 = require("argon2");
const {signToken} = require("../utils/token");
const {COOKIE_NAME} = require("../middlewares");

const getUser = async (req, res, next) => {

  const id = req.body.id;

  if (!id) {
    return res.status(400).json({ message: 'Нужен  ID пользователя!' })
  }

  try {
    const user = await db.User.findOne({ where: { id } })

    res.send(user)

  } catch (e) {
    console.log('Ошибка в  getUser service')
    next(e)
  }
}

const registerUser = async (req, res, next) => {
  console.log(req.body)

  const role = req.body.role;
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const email = req.body.email;
  const password = req.body.password;
  const dob = req.body.dob;

  if (!role || !firstName || !lastName || !email || !password || !dob) {
    return res.status(400).json({ Error: 'Поля не могут быть пустыми' });
  }

  try {
    const existingUser = await db.User.findOne({ where: { email } })

    if (existingUser) {
      return res
        .status(409)
        .json({ message: 'Пользователь с такием email уже существует' })
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

    res.send({ id: newUser.id, role, firstName, lastName, email, dob })

    next('route')
  } catch (e) {
    console.log('Ошибка в  registerUser service')
    next(e)
  }
}


const loginUser = async (req, res, next) => {

  const userEmail = req.body.email
  const userPassword = req.body.password

  if (!userEmail || !userPassword) {
    return res
      .status(400)
      .json({ message: 'Нужны лонгин и папроль' })
  }

  try {
    let existingUser = await User.findOne({ userEmail });

    if (!existingUser) {
      return res.status(404).json({ message: 'Такого пользователя нет' })
    }

    const isPasswordCorrect = await argon2.verify(existingUser.password, userPassword)

    if (!isPasswordCorrect) {
      return res.status(403).json({ message: 'Неправильный пароль' })
    }

    return {
      user: {
        id: existingUser.id,
        email: existingUser.email,
        role: existingUser.role,
      },
      token: signToken(existingUser)
    }

  } catch (e) {
    console.log('Ошибка в  loginUser service')
    next(e)
  }

}

const logoutUser = async (req, res, next) => {
  res.clearCookie(COOKIE_NAME)
  res.status(200).json({ message: 'Вы вышли из системы' })
}

const editUser = async (req, res, next) => {

  if(!req.body) return res.sendStatus(400);

  const id = req.body.id;
  const role = req.body.role;
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const email = req.body.email;
  const password = req.body.password;
  const dob = req.body.dob;

  try {
    await db.User.update({
      role: role, firstName: firstName,
      lastName: lastName, email: email,
      password: password, dob: dob
    }, {
      where: { id }
    })

    res.send(await db.User.findOne({ where: { id }}))

    next('route')
  } catch (e) {
    console.log('Ошибка в removeUser service')
    next(e)
  }
}

const removeUser = async (req, res, next) => {

  const email = req.body.email

  if (!email) {
    return res
      .status(400)
      .json({ message: 'Нужен  email пользователя' })
  }
  try {
    let user = await db.User.findOne({ where: { email } })

    if (!user) {
      return res.status(404).json({ message: 'Пользователь не найден' })
    }

    await db.User.destroy({where: {email } })

    res.status(200).json({ message: `Пользовтель с email:${email} был удален` })

    next('route')
  } catch (e) {
    console.log('Ошибка в removeUser service')
    next(e)
  }
}


module.exports = {getUser, registerUser, loginUser, logoutUser, editUser, removeUser}

