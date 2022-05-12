const catchError = require("../../utils/catchError");
const db = require("../../db/models");

const removeUser = async (req, res, next) => {

  const email = req.body.email

  try {

    if (!email) {
      catchError('Нужен  email пользователя' , 400)
    }

    let user = await db.User.findOne({ where: { email } })

    if (!user) {
      catchError('Пользователь не найден' , 404)
    }

    await db.User.destroy({where: {email } })

    res.status(200).json({ message: `Пользовтель с email:${email} был удален` })

  } catch (e) {
    console.log('Ошибка в removeUser service')
    next(e)
  }
}

module.exports = removeUser;
