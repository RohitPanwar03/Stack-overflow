import express from 'express';
import { Askquestion, getAllquestions, deletequestions, voteQuestion } from './../Controllers/questioncontroller.js';
import { authmiddleware } from '../Middlewares/authmiddleware.js';


const router = express.Router()

router.post('/Ask', authmiddleware, Askquestion);
router.get('/get', getAllquestions);
router.delete('/delete/:id', authmiddleware, deletequestions);
router.patch('/vote/:id', authmiddleware, voteQuestion);


export default router