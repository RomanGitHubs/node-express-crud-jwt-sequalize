const verifyPermission = async (req, res, next) => {
  const user = req.user
  console.log('1212412')

  if (!user) {
    return res.status(403).json({ message: 'Нужен пльзователь' })
  }

  if (!user.role || user.role !== 'Admin') {
    return res
      .status(403)
      .json({ message: 'Ты не Админ.' })
  }

  next()
}

module.exports = verifyPermission;
