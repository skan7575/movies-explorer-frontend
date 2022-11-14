import {Link, NavLink} from "react-router-dom";
import React, {useEffect} from 'react'
import './Navigation.css'
import {LoggedInContext} from "../context/LoggedInContext";
function Navigation() {
    const [isPopupOpen, setIsPopupOpen] = React.useState(false)

    const loggedIn = React.useContext(LoggedInContext)

    function handlePopupOpen() {
        setIsPopupOpen(true)
    }
    function handlePopupClose() {
        setIsPopupOpen(false)
    }
    return(
        <>
            {!loggedIn ? (
                <nav className='navigation-login'>
                    <Link to='signup' className='navigation__signup'>Регистрация</Link>
                    <Link to='signin' className='navigation__signin'>Войти</Link>
                </nav>
            ): (
                <div className={`${isPopupOpen ? "overlay" : "overlay__container"}`}>
                    <nav className={`navigation navigation__popup ${isPopupOpen ? "navigation__popup_open" : ""}`}>
                        <button className="navigation__popup-button" type="button" onClick={handlePopupClose}></button>
                        <div className='navigation__container'>
                            <Link onClick={handlePopupClose} to='/' className='navigation__link navigation__link_mobile'>Главная</Link>
                            <NavLink to='/movies' className='navigation__link'>Фильмы</NavLink>
                            <NavLink to='/saved-movie' className='navigation__link'>Сохранённые фильмы</NavLink>
                        </div>
                        <Link className='navigation__link' to='/profile'><button className='navigation__account'>Аккаунт</button></Link>
                    </nav>
                    <button className={`${!isPopupOpen ? "header__burger":'header__burger_none'}`} onClick={handlePopupOpen}></button>
                </div>
            )}

        </>

    )
}
export default Navigation