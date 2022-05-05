const db = require("../models");

class userController {

   async getUsers(req, res) {
     db.User.findAll().then(users => res.json(users));
   }

   async getUser(req, res) {

     const userId = req.params.id

     if (!userId) {
       return res.status(400).json({ message: 'Нужен  ID пользователя!' })
     }

     db.User.findAll({ where: { id: req.params.id } }).then(users => {
       res.json(users)
     })
   }

  async registerUser(req, res) {
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

  async loginUser(req, res, next) {


  }


  async logoutUser(req, res, next) {


  }

  async editUser(req, res) {

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

  async removeUser(req, res) {
    const userid = req.params.id;
    db.User.destroy({where: {id: userid} })

    return res.json(db.User.rows);
  }
}

module.exports = new userController();
