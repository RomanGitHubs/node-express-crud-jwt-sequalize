const catchError = require("../utils/catchError.js")

const verifyPermission = async (req, res, next) => {
  const user = req.user

  try {

    if (!user) {
      catchError('Нужен пльзователь' , 403)
    }

    if (!user.role || user.role !== 'Admin') {
      catchError('Ты не Админ' , 403)
    }

    next()

  } catch (e) {
    console.log('Ошибка в verifyPermission middleware')
    next(e)
  }
}

module.exports = verifyPermission;
