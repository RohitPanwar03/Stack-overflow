import React from 'react'
import "./HomeMainbar.css"
import { useLocation, useNavigate } from 'react-router-dom';
import QuestionList from './QuestionList';
import { useSelector } from 'react-redux';

const HomeMainbar = () => {

    const location = useLocation()
    const user = 1
    const navigate = useNavigate()

    const questionList = useSelector(state => state.questionreducer);


    // const questionList = [{
    //     id: 1,
    //     upVote: 3,
    //     downVote: 2,
    //     noOfAnswers: 2,
    //     questionTitle: "What is a function?",
    //     questionBody: "It meant to be",
    //     questionTags: ["java", "react.js", "node.js", "mongodb"],
    //     userPosted: "mano",
    //     userId: 1,
    //     askedOn: "jan 1",
    //     answer: [{
    //         answrBody: "Answer",
    //         userAnswered: "kumar",
    //         answeredOn: "jan 2",
    //         userId: 2
    //     }]
    // }, {
    //     id: 2,
    //     upVote: 3,
    //     downVote: 2,
    //     noOfAnswers: 1,
    //     questionTitle: "What is a function?",
    //     questionBody: "It meant to be",
    //     questionTags: ["java", "python", "node.js", "rust"],
    //     userPosted: "mano",
    //     userId: 1,
    //     askedOn: "jan 1",
    //     answer: [{
    //         answrBody: "Answer",
    //         userAnswered: "kumar",
    //         answeredOn: "jan 2",
    //         userId: 2
    //     }]
    // }]

    const checkAuth = () => {
        if (user === null) {

            alert("Login or Sign up to ask questioins")
            navigate('/Auth')

        }
        else {
            navigate('/AskQuestion')
        }
    }

    return (
        <div className='main-bar'>
            <div className='main-bar-header'>
                {
                    location.pathname === '/' ? <h1>Top Questions</h1> : <h1>All Questions</h1>
                }
                <button onClick={checkAuth} className='ask-btn'>Ask Question</button>
            </div>
            <div>
                {
                    questionList.data === null ?
                        <h1>Loading...</h1> :
                        <>
                            <p>{questionList.length} questions</p>
                            <QuestionList questionList={questionList.data} />
                        </>
                }
            </div>
        </div>
    )
}

export default HomeMainbar
