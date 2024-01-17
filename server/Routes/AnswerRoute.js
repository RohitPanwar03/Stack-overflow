import express from "express";
import { deleteAnswer, postAnswer } from './../Controllers/postAnswer.js';
import { authmiddleware } from "../Middlewares/authmiddleware.js";

const router = express.Router()

router.patch('/post/:id', authmiddleware, postAnswer)
router.patch('/delete/:id', authmiddleware, deleteAnswer)

export default router