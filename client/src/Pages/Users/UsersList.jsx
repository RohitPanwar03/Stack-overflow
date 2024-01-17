import React from 'react'
import { useSelector } from 'react-redux';
import UserDetails from './UserDetails';
import './User.css'

const UsersList = () => {

    const users = useSelector((state) => state.usersReducer)
    return (
        <div className='userList-container'>
            {
                users.map((user) => (
                    < UserDetails user={user} key={user?._id} />
                ))
            }
        </div>
    )
}

export default UsersList
