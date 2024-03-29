import React from 'react'
import { Link } from 'react-router-dom'
import './User.css'

const UserDetails = ({ user }) => {
    return (
        <Link to={`/Users/${user._id}`} className='user-profile-link'>
            <h3>{user.name.charAt(0).toUpperCase()}</h3>
            <h5>{user.name.toUpperCase()}</h5>
        </Link>
    )
}

export default UserDetails
