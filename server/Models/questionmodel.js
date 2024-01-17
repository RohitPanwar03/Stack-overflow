import mongoose from 'mongoose';

const questionschema = mongoose.Schema({
    questionTitle: {
        type: String,
        required: "Question must have a title"
    },
    questionBody: {
        type: String,
        required: "Question must have a Body"
    },
    questionTags: {
        type: [String],
        required: "Question must have a Tag"
    },
    noOfAnswers: {
        type: Number,
        default: 0
    },
    upVote: {
        type: [String],
        default: []
    },

    downVote: {
        type: [String],
        default: []
    },
    userPosted: {
        type: String,
        required: "Question must have a Author"
    },
    userId: {
        type: String,
    },
    askedOn: {
        type: Date,
        default: Date.now
    },
    answer: [{
        userAnswered: String,
        answerBody: String,
        userId: String,
        answeredOn: { type: Date, default: Date.now }
    }],
})

export default mongoose.model("Question", questionschema)