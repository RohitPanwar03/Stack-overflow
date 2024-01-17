import questionmodel from "../Models/questionmodel.js"
import mongoose from "mongoose";

export const Askquestion = async (req, res) => {
    const postquestionData = req.body;
    const userId = req.userId;
    const postQuestion = new questionmodel({ ...postquestionData, userId });
    try {
        await postQuestion.save();
        res.status(200).json("Question Posted Successfully")
    } catch (error) {
        console.log(error);
        res.status(404).json("something went wrong in posting Question")
    }
}

export const getAllquestions = async (req, res) => {
    try {
        const questionList = await questionmodel.find().sort({ askedOn: -1 })
        res.status(200).json(questionList);

    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}

export const deletequestions = async (req, res) => {
    const { id: _id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(_id)) {
        return res.status(404).send("question unavailable")
    }
    try {
        await questionmodel.findByIdAndDelete(_id)
        res.status(200).json({ message: "Successfully deleted" })
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}

export const voteQuestion = async (req, res) => {
    const { id: _id } = req.params;
    const { value } = req.body;
    const userId = req.userId;
    if (!mongoose.Types.ObjectId.isValid(_id)) {
        return res.status(404).send("question unavailable....")
    }
    try {
        const question = await questionmodel.findById(_id);
        const upIndex = question.upVote.findIndex((id) => id === String(userId))
        const downIndex = question.downVote.findIndex((id) => id === String(userId))

        if (value === 'upVote') {
            if (downIndex !== -1) {
                question.downVote = question.downVote.filter((id) => id !== String(userId))
            }
            if (upIndex === -1) {
                question.upVote.push(userId)
            } else {
                question.upVote = question.upVote.filter((id) => id !== String(userId))
            }
        }
        if (value === 'downVote') {
            if (upIndex !== -1) {
                question.upVote = question.upVote.filter((id) => id !== String(userId))
            }
            if (downIndex === -1) {
                question.downVote.push(userId)
            } else {
                question.downVote = question.downVote.filter((id) => id !== String(userId))
            }
        }
        await questionmodel.findByIdAndUpdate(_id, question)
        res.status(200).json({ message: 'Voted Successfully' })
    } catch (error) {
        res.status(400).json({ message: 'Id not found' })
    }
}