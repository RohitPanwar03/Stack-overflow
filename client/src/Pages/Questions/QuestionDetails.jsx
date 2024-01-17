import React, { useState } from 'react'
import "./Question.css"
import moment from 'moment'
import copy from 'copy-to-clipboard'
import { useSelector, useDispatch } from 'react-redux';
import {
    useLocation,
    useParams, Link, useNavigate
} from 'react-router-dom'

import upvote from '../../assets/sort-up.svg';
import downvote from '../../assets/sort-down.svg'
import Avatar from "../../components/Avatar/Avatar"
import DisplayAnswers from './DisplayAnswers';
import { postAnswer, deletequestions, voteQuestion } from '../../actions/questionaction'

const QuestionDetails = () => {

    const { id } = useParams()
    const questionList = useSelector(state => state.questionreducer);

    const [Answer, setAnswer] = useState("")
    const user = useSelector((state) => state.currentuserReducer)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const location = useLocation()
    const url = 'https://stack-overflow-rohit.onrender.com'


    const handlepostanswer = (e, answerLength) => {
        e.preventDefault()
        if (user === null) {
            alert("Login First")
            navigate('/Auth')
        } else {
            if (Answer === '') {
                alert("Enter a answer before submitting")
            } else {
                dispatch(postAnswer({ id, noOfAnswers: answerLength + 1, answerBody: Answer, userAnswered: user.result.name }));
                setAnswer("")
            }
        }
    }

    const handleshare = () => {
        copy(url + location.pathname)
        alert('Copied url : ' + url + location.pathname)
    }

    const handledelete = () => {
        dispatch(deletequestions(id, navigate))
    }

    const handleUpVotes = () => {
        if (user === null) {
            alert('Login first to Vote')
            navigate('/Auth')
        }
        else {
            dispatch(voteQuestion(id, 'upVote'))
        }
    }

    const handleDownVotes = () => {
        if (user === null) {
            alert('Login first to Vote')
            navigate('/Auth')
        }
        else {
            dispatch(voteQuestion(id, 'downVote'))
        }
    }

    return (
        <div className='question-details-page'>
            {
                questionList.data === null ? (
                    <h1>Loading...</h1>
                )
                    :
                    (
                        <>
                            {
                                questionList.data.filter((question) => question._id === id).map((question) => (
                                    <div key={question._id}>
                                        <section className='question-details-container'>
                                            <h1>{question.questionTitle}</h1>
                                            <div className='question-details-container-2'>
                                                <div className="question-votes">
                                                    <img src={upvote} alt="up" width={18} className='votes-icon' onClick={handleUpVotes} />
                                                    <p>{question.upVote.length - question.downVote.length}</p>
                                                    <img src={downvote} alt="down" width={18} className="votes-icon" onClick={handleDownVotes} />
                                                </div>
                                                <div style={{ width: "100%" }}>
                                                    <p className='question-body'>{question.questionBody}</p>
                                                    <div className="question-details-tags">
                                                        {
                                                            question.questionTags.map((tag) => (
                                                                <p key={tag}>{tag}</p>
                                                            ))
                                                        }
                                                    </div>
                                                    <div className="question-actions-user">
                                                        <div>
                                                            <button type='button' onClick={handleshare}>Share</button>
                                                            {
                                                                user?.result?._id === question?.userId && (
                                                                    <button type='button' onClick={handledelete}>Delete</button>
                                                                )
                                                            }
                                                        </div>
                                                        <div>
                                                            <p>
                                                                asked {moment(question.askedOn).fromNow()}
                                                            </p>
                                                            <Link to={`/Users/${question.userId}`} className='user-link' style={{ color: "#0086d8" }}>
                                                                <Avatar backgroundColor="orange" color='white' px="8px" py="5px" borderRadius="4px">{question.userPosted.charAt(0).toUpperCase()}</Avatar>
                                                                <div>
                                                                    {question.userPosted}
                                                                </div>
                                                            </Link>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </section>
                                        {
                                            question.noOfAnswers !== 0 && (
                                                <section>
                                                    <h3>{question.noOfAnswers} Answers</h3>
                                                    <DisplayAnswers key={question._id} question={question} handleshare={handleshare} />

                                                </section>
                                            )
                                        }
                                        <section className='post-ans-container'>
                                            <h3>Your Answer</h3>
                                            <form onSubmit={(e) => { handlepostanswer(e, question.answer.length) }}>
                                                <textarea name="" id="" cols='30' rows='10' onChange={e => setAnswer(e.target.value)}></textarea><br />
                                                <input type="submit" className='post-ans-btn' value='Post Your Answers' />
                                            </form>
                                            <p>
                                                Browse other Question tagged
                                                {
                                                    question.questionTags.map((tag) => (
                                                        <Link to='/Tags' key={tag} className='ans-tags'>
                                                            {' '} {tag} {' '}
                                                        </Link>
                                                    ))
                                                } or ;
                                                <Link to='/AskQuestion' style={{ textDecoration: "none", color: "#009dff" }}>{' '}ask your own question</Link>
                                            </p>
                                        </section>
                                    </div>
                                ))
                            }
                        </>

                    )}
        </div >
    )
}

export default QuestionDetails
