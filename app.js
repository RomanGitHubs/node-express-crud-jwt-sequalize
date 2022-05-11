const { json, urlencoded } = require("express");
const cookieParser = require('cookie-parser');
const express = require('express')
const appRoutes = require("./routes/appRoutes.js");
const app = express()
const PORT = 5000

app.use(json())
app.use(urlencoded({ extended: true }))
app.use(cookieParser())

app.use('/api', appRoutes);

app.use((e,req,res,next)=>{
  res.status(e.status).json({message: e.message, status: e.status})
})


app.listen(PORT, () =>
  console.log(`Server started on ${PORT} port`))

