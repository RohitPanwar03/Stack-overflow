import { useEffect } from 'react'
import "./Navbar.css"
import { Link, useNavigate } from 'react-router-dom';
import logo from '../../assets/logo.png'
import search from '../../assets/search-solid.svg'
import Avatar from '../Avatar/Avatar';
import { useSelector, useDispatch } from 'react-redux'
import { setCurrentuser } from '../../actions/currentuser';
import { jwtDecode } from 'jwt-decode';

const Navbar = () => {

    const user = useSelector((state) => (state.currentuserReducer))
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const handlelogout = () => {
        dispatch({ type: 'LOGOUT' });
        navigate('/')
        dispatch(setCurrentuser(null))
    }

    useEffect(() => {
        const token = user?.token
        if (token) {
            const decodedToken = jwtDecode(token)
            if (decodedToken.exp * 1000 < new Date().getTime()) {
                handlelogout()
            }
        }
        dispatch(setCurrentuser(JSON.parse(localStorage.getItem("Profile"))))
    }, [dispatch])


    return (
        <nav className='main-nav'>
            <div className='navbar'>

                <Link to="" className='nav-item nav-logo'>
                    <img src={logo} alt="logo" />
                </Link>
                <Link to="" className='nav-item nav-btn'>About </Link>
                <Link to="" className='nav-item nav-btn'>Products</Link>
                <Link to="" className='nav-item nav-btn'>For Teams </Link>
                <form >
                    <input type="text" placeholder='Search...' />
                    <img className='search-icon' src={search} alt="search" width={"18rem"} />
                </form>
                {user === null ?
                    <Link to="/Auth" className='nav-item nav-links'>Login</Link> :
                    <>
                        <Avatar backgroundColor="#009dff" px="10px" py="7px" borderRadius="50%"><Link to={`/Users/${user?.result?._id}`} style={{ color: "white", textDecoration: "none" }}>{user.result.name.charAt(0).toUpperCase()}</Link></Avatar>
                        <button className='nav-item nav-links' onClick={handlelogout}>Log Out</button>
                    </>}
            </div>
        </nav >
    )
}

export default Navbar
