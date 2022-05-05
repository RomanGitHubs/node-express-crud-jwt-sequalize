const { json, urlencoded } = require("express");
const cookieParser = require('cookie-parser');
const appRoutes = require("./routes/app.routes");

const express = require('express')
const PORT = 5050
const app = express()


app.use(json())
app.use(urlencoded({ extended: true }))
app.use(cookieParser())

app.use('/api', appRoutes);


app.listen(PORT, () =>
  console.log(`Server started on ${PORT}`))
