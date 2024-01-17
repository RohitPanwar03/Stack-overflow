import mongoose from "mongoose";

const userschema = mongoose.Schema({
    name: {
        type: String,
        reuired: true
    }, email: {
        type: String,
        reuired: true
    },
    password: {
        type: String,
        reuired: true
    },
    about: {
        type: String
    },
    tags: {
        type: [String],
    },
    joinedOn: {
        type: Date,
        default: Date.now
    }
})

export default mongoose.model('Users', userschema)