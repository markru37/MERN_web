import { useContext } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { AuthContext } from '../../context/AuthContext'
import './Navigation.css'



let Navigation = () => {
    const navigate = useNavigate();
    const auth = useContext(AuthContext)

    const logoutHandler = (event) => {
        event.preventDefault()
        auth.logout()
        navigate('/')
    }
    return (
        <header className="header">
            <div className="header__logo">markru</div>
            <div className="header__list">
                <NavLink className="header__link" to="/create">Create</NavLink>
                <a className="header__link" href="/" onClick={logoutHandler}>Logout</a>
            </div>
        </header>
    )
}

export default Navigation