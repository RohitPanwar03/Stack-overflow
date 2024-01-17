import React from 'react'
import { Route, Routes } from 'react-router-dom'
import HomePage from './Pages/HomePage/HomePage'
import Auth from './Pages/Auth/Auth';
import AskQuestion from './Pages/AskQuestion/AskQuestion';
import DisplayQuestion from './Pages/Questions/DisplayQuestion';
import Tags from './Pages/Tags/Tags';
import User from './Pages/Users/User';
import UserProfile from './Pages/UserProfile/UserProfile';
import Questions from './Pages/Questions/Questions';

const AllRoutes = () => {
    return (
        <Routes>
            <Route exact path='/' element={<HomePage />} />
            <Route path='/Auth' element={<Auth />} />
            <Route path='/Questions' element={<Questions />} />
            <Route path='/AskQuestion' element={<AskQuestion />} />
            <Route path='/Questions/:id' element={<DisplayQuestion />} />
            <Route path='/Tags' element={<Tags />} />
            <Route path='/Users' element={<User />} />
            <Route path='/Users/:id' element={<UserProfile />} />

        </Routes>
    )
}

export default AllRoutes
