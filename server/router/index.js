const router = require('express').Router()

const {testGetAll, testadduser}= require("../controller/testController")


router.route("/test").get(testGetAll).post(testadduser)

module.exports=router