import express from 'express'
import { registerUser, loginUser } from '../controllers/userControllers.js'


const router = express.Router()



// register user routes
router.post('/register', registerUser)

// login user routes
router.post('/login', loginUser)

export { router as usersRoutes}