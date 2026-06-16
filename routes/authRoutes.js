import express from 'express'
const router = express.Router()

import { userRegister , userLogin, userDashboard } from '../controllers/authController.js'

import authenticateToken from '../middleware/authenticateToken.js'

router.post('/register' , userRegister)

router.post('/login' , userLogin)

router.get('/dashboard', authenticateToken, userDashboard)

export default router