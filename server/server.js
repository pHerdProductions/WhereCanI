import express, { urlencoded, json } from 'express'
import { router } from "./router"
import cors from "cors"
const app = express()
const port = 4000

require("dotenv").config()

app.use(urlencoded({ extended: false }));
app.use(json());
app.use(cors());

app.get('/', (req, res) => {
  res.send('Server is running')
})

app.use(router)

app.listen(port, () => {
  console.log(`app is listening on  http://localhost:${port}`)
})
