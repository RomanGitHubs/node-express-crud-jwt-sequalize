const catchError = require("../../utils/catchError");
const db = require("../../db/models");

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
module.exports = getUser;
