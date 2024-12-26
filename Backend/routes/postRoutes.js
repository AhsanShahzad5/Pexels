import express from "express";
const router = express.Router();
import protectRoute from "../middleware/protectRoute.js";
import {test , createPost , getPost , deletePost , likeUnlikePost , replyToPost , getUserPosts , getFeedPosts , getAllPosts} from '../controllers/postControllers.js'

router.get('/test' , test)

// router.get('/feed' , getFeedPosts)
// router.get('/:id' , getPost)
// router.get('/user/:username' , getUserPosts)
// router.post('/create' ,createPost)
// router.delete('/:id'  , deletePost)
// router.put('/like/:id'  , likeUnlikePost)
// router.put('/reply/:id' , replyToPost)

router.get('/all' , getAllPosts)
router.get('/feed' ,protectRoute, getFeedPosts)
router.get('/:id' , getPost)
router.get('/user/:username' , getUserPosts)
router.post('/create' , protectRoute ,createPost)
router.delete('/:id' , protectRoute , deletePost)
router.put('/like/:id' , protectRoute , likeUnlikePost)
router.put('/reply/:id' , protectRoute , replyToPost)


export default router;