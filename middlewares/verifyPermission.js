const verifyPermission = async (req, res, next) => {
  const user = req.user
  console.log(user)

  try {

    if (!user) {
      return res.status(403).json({ message: 'Нужен пльзователь' })
    }

    if (!user.role || user.role !== 'Admin') {
      return res
        .status(403)
        .json({ message: 'Ты не Админ.' })
    }

    next()

  } catch (e) {
    console.error(e)
    console.log('Ошибка в verifyPermission middleware')
    next(e)
  }
}

module.exports = verifyPermission;
