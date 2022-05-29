// import { useContext } from 'react'
// import { useNavigate } from 'react-router-dom'
import { NavLink } from 'react-router-dom'
// import { AuthContext } from '../../context/AuthContext'
import './Navigation.css'



let Navigation = () => {
    // const navigate = useNavigate();
    // const auth = useContext(AuthContext)

    // const logoutHandler = (event) => {
    //     event.preventDefault()
    //     auth.logout()
    //     navigate('/')
    //     onClick={logoutHandler}
    // }
    return (
        <header className="header">
            <div className="header__logo">markru</div>
            <div className="header__list">
                <NavLink className="header__link" to="/create">Create</NavLink>
                <a className="header__link" href="/" >Logout</a>
            </div>
        </header>
    )
}

export default Navigation