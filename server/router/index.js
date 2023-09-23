const router = require('express').Router()

const {createPOI, getAllPOI,getIndividualPOI}= require("../controller/poiController")
const {creaseUser, getAllUser,loginUser}= require("../controller/userController")

const {createPost,getAllPost}= require("../controller/postController")

router.route("/user").get(loginUser).post(creaseUser)
router.route("/poi").get(getAllPOI).post(createPOI)
//router.route("/poi/id").get(getIndividualPOI)

router.route("/post").get(getAllPost).post(createPost)

module.exports=router