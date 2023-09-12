const router = require('express').Router()

const {creasePOI, getAllPOI,getIndividualPOI}= require("../controller/poiController")
const {creaseUser, getAllUser,loginUser}= require("../controller/userController")


router.route("/poi").get(getAllPOI).post(creasePOI)
router.route("/poi/id").get(getIndividualPOI)

router.route("/user").get(loginUser).post(creaseUser)



module.exports=router