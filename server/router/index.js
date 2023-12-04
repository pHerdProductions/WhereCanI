const router = require('express').Router();

const { getAllUser, createUser, loginUser } = require('../controller/userController');
const { getAllPOI, createPOI, searchPOI, updatePoi } = require('../controller/poiController');
const { getAllPost, createPost } = require('../controller/postController');
const { getAllRating, createRating } = require('../controller/ratingController');

router.route('/user').get(getAllUser).post(createUser);
router.route('/user/login').post(loginUser);

router.route('/poi').get(getAllPOI).post(createPOI).put(updatePoi);
router.route('/poi/search').get(searchPOI);

router.route('/post').get(getAllPost).post(createPost);
router.route('/rating').get(getAllRating).post(createRating);

module.exports = router;
