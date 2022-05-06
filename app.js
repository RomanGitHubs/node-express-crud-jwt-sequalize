const { json, urlencoded } = require("express");
const cookieParser = require('cookie-parser');
const { setSecurityHeaders } = require("./middlewares");
const appRoutes = require("./routes/appRoutes.js");

const express = require('express')

const PORT = 5000
const app = express()

// app.use(setSecurityHeaders)

app.use(json())
app.use(urlencoded({ extended: true }))
app.use(cookieParser())

app.use('/api', appRoutes);


app.listen(PORT, () =>
  console.log(`Server started on ${PORT}`))

