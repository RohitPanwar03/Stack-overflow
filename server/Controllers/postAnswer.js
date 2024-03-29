import mongoose from 'mongoose';
import questionmodel from '../Models/questionmodel.js'

export const postAnswer = async (req, res) => {
    const { id: _id } = req.params;
    const { noOfAnswers, answerBody, userAnswered } = req.body;
    const userId = req.userId;
    if (!mongoose.Types.ObjectId.isValid(_id)) {
        return res.status(404).send("question unavailable")
    }
    updateNoOfQuestions(_id, noOfAnswers)
    try {
        const updatedQuestion = await questionmodel.findByIdAndUpdate(_id, { $addToSet: { 'answer': [{ answerBody, userAnswered, userId }] } })
        res.status(200).json(updatedQuestion)
    } catch (error) {
        res.status(400).json(error)
    }
}

const updateNoOfQuestions = async (_id, noOfAnswers) => {
    try {
        await questionmodel.findByIdAndUpdate(_id, { $set: { "noOfAnswers": noOfAnswers } })
    } catch (error) {
        console.log(error)
    }
}

export const deleteAnswer = async (req, res) => {
    const { id: _id } = req.params;
    const { answerId, noOfAnswers } = req.body;
    if (!mongoose.Types.ObjectId.isValid(_id)) {
        return res.status(404).send("question unavailable")
    }
    if (!mongoose.Types.ObjectId.isValid(answerId)) {
        return res.status(404).send("Answer unavailable")
    }
    updateNoOfQuestions(_id, noOfAnswers)
    try {
        await questionmodel.updateOne(
            { _id },
            {
                $pull: { 'answer': { _id: answerId } }
            }
        )
        res.status(200).json({ message: "Successfully deleted..." })
    } catch (error) {
        res.status(404).json(error)
    }
}