const catchError = require("../../utils/catchError");
const db = require("../../db/models");

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

module.exports = editUser;
