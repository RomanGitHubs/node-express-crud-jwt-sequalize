const logoutUser = async (req, res) => {

  res.status(200).json({ message: 'Вы вышли из системы' })
}

module.exports = logoutUser;
