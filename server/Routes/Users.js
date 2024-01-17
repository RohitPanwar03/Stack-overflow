import express from "express";

import { login, signup } from './../Controllers/auth.js';
import { getAllUsers, updateProfile } from './../Controllers/Users.js';
import { authmiddleware } from './../Middlewares/authmiddleware.js';

const router = express.Router()

router.post('/signup', signup)
router.post('/login', login)

router.get('/getAllUsers', getAllUsers)
router.patch('/update/:id', authmiddleware, updateProfile)

export default router