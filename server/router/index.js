const router = require('express').Router()

const {createPOI, getAllPOI,getIndividualPOI}= require("../controller/poiController")
const {createUser, getAllUser,loginUser}= require("../controller/userController")

const {createPost,getAllPost}= require("../controller/postController")

router.route("/signup").post(createUser)
router.route("/login").post(loginUser)
router.route("/poi").get(getAllPOI).post(createPOI)
//router.route("/poi/id").get(getIndividualPOI)

router.route("/post").get(getAllPost).post(createPost)

module.exports=router