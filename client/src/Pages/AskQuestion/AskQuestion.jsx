import React, { useState } from 'react'
import "./AskQuestion.css"
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { askQuestion } from '../../actions/questionaction';

const AskQuestion = () => {

    const [questionTitle, setquestionTitle] = useState('')
    const [questionBody, setquestionBody] = useState('')
    const [questionTags, setquestionTags] = useState('')

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector((state) => state.currentuserReducer);

    const handlesubmit = (e) => {
        e.preventDefault();
        if (user) {
            if (questionTitle && questionBody && questionTags) {
                dispatch(
                    askQuestion(
                        {
                            questionTitle,
                            questionBody,
                            questionTags,
                            userPosted: user.result.name,
                            userId: user?.result?._id
                        },
                        navigate
                    )
                );
            } else alert("Please enter all the fields");
        } else alert("Login to ask question");

    }

    return (
        <div className='ask-question'>
            <div className="ask-ques-container">
                <h1>Ask a Public Question</h1>
                <form onSubmit={handlesubmit}>
                    <div className="ask-form-container">
                        <label htmlFor="ask-ques-title">
                            <h4>Title</h4>
                            <p>Be specific and imagine you're asking a question to another person</p>
                            <input type="text" placeholder='e.g. is there an R function for finding the index of an element in a vector' id='ask-ques-title' onChange={(e) => { setquestionTitle(e.target.value) }} />
                        </label>
                        <label htmlFor="ask-ques-body">
                            <h4>Body</h4>
                            <p>Includes all the information someone would need to answer your question</p>
                            <textarea name="" id="ask-ques-body" onChange={(e) => { setquestionBody(e.target.value) }} />
                        </label>
                        <label htmlFor="ask-ques-tags">
                            <h4>Tags</h4>
                            <p>Add up to 5 tags to describe what your question is about</p>
                            <input type="text" placeholder='e.g. (xml typescript wordpress)' id='ask-ques-tags' onChange={(e) => { setquestionTags(e.target.value) }} />
                        </label>
                    </div>
                    <input type="submit" value='Review your question' className='review-btn' />
                </form>
            </div>
        </div>
    )
}

export default AskQuestion
