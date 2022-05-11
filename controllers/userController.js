const db = require("../db/models");
const argon2 = require("argon2");
const { signToken } = require("../utils/token");
const {COOKIE_NAME} = require("../middlewares");
const {ACCESS_TOKEN_SECRET} = require("../middlewares/constans");

function catchError(message, status) {
  const error = new Error(message)
  error.status = status;
  throw error

}

const getUser = async (req, res, next) => {

  const id = req.user?.id;

  try {
    if (!id) {
      catchError('Нужен  ID пользователя!', 400)
    }

    const user = await db.User.findOne({ where: { id } })

    res.send(user)

  } catch (e) {
    console.log('Ошибка в  getUser service')
    next(e)
  }
}

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
    console.log(user, "// USER IN COOKIE")

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

const loginUser = async (req, res, next) => {

  const enteredEmail = req.body.email
  const enteredPassword = req.body.password

  try {

    if (!enteredEmail || !enteredPassword) {
      catchError('Нужны лонгин и папроль', 400)
    }

    let existingUser = await db.User.findOne({ where: {email: enteredEmail} });

    if (!existingUser) {
      catchError('Такого пользователя нет' , 404)
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

const logoutUser = async (req, res, next) => {
  res.clearCookie(COOKIE_NAME)
  res.status(200).json({ message: 'Вы вышли из системы' })
}

const editUser = async (req, res, next) => {

  try {

    if(!req.body) catchError('Нужен пользователь' , 400)

    const id = req.body.id;
    const role = req.body.role;
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const email = req.body.email;
    const password = req.body.password;
    const dob = req.body.dob;

    await db.User.update({
      role: role, firstName: firstName,
      lastName: lastName, email: email,
      password: password, dob: dob
    }, {
      where: { id }
    })

    res.send(await db.User.findOne({ where: { id }}))

  } catch (e) {
    console.log('Ошибка в removeUser service')
    next(e)
  }
}

const removeUser = async (req, res, next) => {

  const email = req.body.email

  try {

    if (!email) {
      catchError('Нужен  email пользователя' , 400)
    }

    let user = await db.User.findOne({ where: { email } })

    if (!user) {
      catchError('ользователь не найден' , 404)
    }

    await db.User.destroy({where: {email } })

    res.status(200).json({ message: `Пользовтель с email:${email} был удален` })

  } catch (e) {
    console.log('Ошибка в removeUser service')
    next(e)
  }
}


module.exports = {
  getUser,
  registerUser,
  loginUser,
  logoutUser,
  editUser,
  removeUser
}




// class TestError extends  Error {
//   constructor(message, status) {
//     super(message);
//     this.message = message;
//     this.status = status
//   }
//
//   static getCustomError(message) {
//     throw new TestError(message, 401)
//   }
//
//   static get404(message) {
//     throw new TestError(message, 404)
//   }
//
// }


// TestError.getCustomError(('BEDA BEDA NEDA'))