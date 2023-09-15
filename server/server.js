const express = require('express')

const router= require("./router")
const cors = require("cors")


const app = express()
const port = 4000
require("dotenv").config()

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());



app.get('/', (req, res) => {
  res.send('Server is running')
})

app.use(router)

app.listen(port, () => {
  console.log(`app is listening on  http://localhost:${port}`)
})
