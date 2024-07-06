import express from 'express'
import { getPosts, addPosts, deletePosts, updatePosts , getUserPost } from '../controllers/postControllers.js'
import auth from '../middleware/auth.js'

const router = express.Router()

// get post routes
router.get('/', getPosts)

//get all user post
router.get('/user',auth ,getUserPost)

// add post routes
router.post('/', auth, addPosts)

// delete post routes
router.delete('/delete/:id',auth, deletePosts)
// delete post routes
router.put('/update/:id',auth, updatePosts)


export { router as postsRoutes}