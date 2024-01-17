import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import userrouter from './Routes/Users.js'
import questionrouter from './Routes/QuestionRoute.js'
import dotenv from 'dotenv'
import answerRouter from './Routes/AnswerRoute.js'



const app = express()
app.use(express.json({ limit: "30mb", extended: true }))
app.use(express.urlencoded({ limit: "30mb", extended: true }))
app.use(cors())
dotenv.config()

app.get('/', (req, res) => {
    res.send("This is stack overflow clone API")
})

app.use('/user', userrouter)

app.use('/questions', questionrouter)
app.use('/answer', answerRouter)

const Port = process.env.PORT || 5000

const DATABASE = process.env.Connection_URL

mongoose.connect(DATABASE, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => app.listen(Port, () => {
        console.log(`server running on port ${Port}`)
    })).catch((err) => {
        console.log(err.message)
    })