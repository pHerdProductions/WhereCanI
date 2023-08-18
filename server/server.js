const express = require('express')
const dotenv=require('dotenv')
const prisma= require('./db/prisma')
const app = express()
const port = 4000
require("dotenv").config()
console.log(process.env.DATABASE_URL)



app.get('/', async (req, res) => {

  await prisma.user.create({
    data: {
      name: "John Doe",
      email: "jondoe@gmail.com",
      password: "123456"
    }
  })
  
  const users = await prisma.user.findMany()
  console.log(users)
  const names = users.map((user) => user.name)
  console.log(names)

  res.send('user was created ' + names)
})

app.listen(port, () => {
  console.log(`app is listening on  http://localhost:${port}`)
})
