const db = require("../models");


 // async getUsers(req, res) {
 //   db.User.findAll().then(users => res.json(users));
 // }

 const getUser = async (req, res) => {

  const userId = req.user?.userId

  if (!userId) {
    return res.status(400).json({ message: 'Нужен  ID пользователя!' })
  }

  try {
    const user = await db.User.findAll({ where: { id: req.params.id } })

    req.user = user

    next('route')
  } catch (e) {
    console.log('*getUser service')
    next(e)
  }



   // const userId = req.params.id
   //
   // if (!userId) {
   //   return res.status(400).json({ message: 'Нужен  ID пользователя!' })
   // }
   //
   // db.User.findAll({ where: { id: req.params.id } }).then(users => {
   //   res.json(users)
   // })
 }

const registerUser = async (req, res) => {
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

  db.User.create({
    role: role,
    firstName: firstName,
    lastName: lastName,
    email: email,
    password: password,
    dob: dob
  }).then(data => {
    res.send(data)
  }).catch(err=>console.log(err));

}

const loginUser = async (req, res, next) => {


}


const logoutUser = async (req, res, next) => {

}

const editUser = async (req, res) => {

  if(!req.body) return res.sendStatus(400);

  const userid = req.body.id;
  const role = req.body.role;
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const email = req.body.email;
  const password = req.body.password;
  const dob = req.body.dob;

  db.User.update({role: role, firstName: firstName,
    lastName: lastName, email: email,
    password: password, dob: dob}, {where: {id: userid}
  }).then(data => {
    res.send(data)
  }).catch(err=>console.log(err));

}

const removeUser = async (req, res) => {
  const userid = req.params.id;
  db.User.destroy({where: {id: userid} })

  return res.json(db.User.rows);
}


module.exports = {getUser, registerUser, loginUser, logoutUser, editUser, removeUser}

