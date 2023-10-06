const router = require('express').Router();

import { createPOI, getAllPOI, getIndividualPOI, searchPOI } from '../controller/poiController';
import { createUser, getAllUser, loginUser } from '../controller/userController';
import { createPost, getAllPost } from '../controller/postController';

router.route('/signup').post(createUser);
router.route('/login').post(loginUser);
router.route('/poi').get(getAllPOI).post(createPOI);
router.route('/search').post(searchPOI);
//router.route("/poi/id").get(getIndividualPOI)

router.route('/post').get(getAllPost).post(createPost);

export { router };