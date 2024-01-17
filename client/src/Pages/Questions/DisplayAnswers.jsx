import React from 'react'
import moment from 'moment';
import { Link, useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux';
import Avatar from './../../components/Avatar/Avatar';
import { deleteAnswer } from '../../actions/questionaction';

const DisplayAnswers = ({ question, handleshare }) => {


    const user = useSelector((state) => (state.currentuserReducer));
    const dispatch = useDispatch()
    const { id } = useParams()

    const handleDelete = (answerId, noOfAnswers) => {
        dispatch(deleteAnswer(id, answerId, noOfAnswers - 1))
        // console.log(answerId)
    }

    return (
        <div>
            {
                question.answer.map((ans) => (
                    <div className="display-ans" key={ans._id}>
                        <p>{ans.answerBody}</p>
                        <div className="question-actions-user">
                            <div>
                                <button type='button' onClick={handleshare}>Share</button>
                                {
                                    user?.result?._id === ans?.userId && (
                                        <button type='button' onClick={() => handleDelete(ans._id, question.noOfAnswers)}>Delete</button>
                                    )
                                }
                            </div>
                            <div>
                                <p>answered {moment(ans.answeredOn).fromNow()}</p>
                                <Link to={`/Users/${ans.userId}`} className='user-link' style={{ color: "#0086d8" }}>
                                    <Avatar backgroundColor="blue" color='white' px="8px" py="5px" borderRadius='4px'>{ans.userAnswered.charAt(0).toUpperCase()}</Avatar>
                                    <div>
                                        {ans.userAnswered}
                                    </div>
                                </Link>
                            </div>

                        </div>

                    </div>
                ))
            }
        </div>
    )
}

export default DisplayAnswers
