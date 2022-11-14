import Main from "../Main/Main";
import Login from "../Login/Login"
import Header from "../Header/Header";
import {Route, Routes, Link, Redirect, useNavigate, Navigate, useLocation} from "react-router-dom";

import '../../index.css'
import {LoggedInContext} from "../context/LoggedInContext";
import {Children, useEffect, useState, useContext} from "react";
import Register from "../Register/Register";
import Movies from "../Movies/Movies";
import NotFoundPage from "../NotFoundPage/NotFoundPage";
import SavedMovies from "../SavedMovies/SavedMovies";
import Profile from "../Profile/Profile";
import {api} from "../../utils/MainApi";
import Popup from "../Popup/Popup";
import {CurrentUserContext} from "../context/CurrentUserContext";
import {UseAuth} from "../../utils/UseAuth";
import {getData} from "../../utils/MoviesApi";

function App() {
    const navigate = useNavigate();
    const [userData, setUserData] = useState({})
    const [loggedIn, setLoggedIn] = useState(false)
    const [popupMassage, setPopupMassage] = useState('')
    const [popupOpen, setPopupOpen] = useState(false)
    const [movies, setMovies] = useState([]);

    function handlePopupClose() {
        setPopupOpen(false)
    }

    function handleRegister(formData) {
        api.register(formData)
            .then((res) => {
                if (res) {
                    setPopupMassage('Вы успешно зарегистрировались! А я авторизировался за Вас:)');
                    setPopupOpen(true);
                    handleLogin(formData)
                }
            })
            .catch((err) => {
                console.log({err})
                setPopupMassage(`${err}`);
                setPopupOpen(true);
            });
    }

    function handleLogin(formData) {
        api.login(formData)
            .then((res) => {
                if (res.token) {
                    localStorage.setItem('token', res.token);
                    setLoggedIn(true)
                    navigate('/movies')
                }
            })
            .catch((err) => {
                console.log({err})
            });
    }

    function handleUpdate(formData) {
        api.updateUser(formData)
            .then((res) => {
                if (res) {
                    setUserData({email: res.email, name: res.name})
                }
            })
            .catch((err) => {
                console.log({err})
            });
    }

    function handleLogout() {
        localStorage.removeItem('token');
        setLoggedIn(false)
        navigate('/')
    }

    function tokenCheck() {
        const token = localStorage.getItem('token');
        if (token) {
            api
                .checkToken(token)
                .then((res) => {
                    if (res) {
                        setLoggedIn(true)
                        setUserData({email: res.email, name: res.name});
                    } else {
                        navigate('/');
                    }
                })
                .catch((err) => console.error(err));
        }
    }

    useEffect(() => {
        tokenCheck()
    }, [loggedIn])

    useEffect(() => {
        getData()
            .then((moviesList) => {
                moviesList.forEach(data => {
                    setMovies(data)
                })
            })
            .catch((err) => {
                console.error(err);
            });
    }, [loggedIn])

    return (
        <LoggedInContext.Provider value={loggedIn}>
            <CurrentUserContext.Provider value={userData}>
                <div className='page'>
                    <Routes>
                        <Route path="/" element={
                            <Main/>
                        }
                        />
                        <Route path='profile' element={
                            <UseAuth>
                                <Profile
                                    handleLogout={handleLogout}
                                    onUpdate={handleUpdate}
                                />
                            </UseAuth>
                        }/>
                        <Route path='saved-movie' element={
                            <UseAuth>
                                <SavedMovies/>
                            </UseAuth>
                        }/>
                        <Route path='movies' element={
                            <UseAuth>
                                <Movies
                                    movie={movies}
                                />
                            </UseAuth>
                        }/>

                        <Route path='signin' element={
                                <Login
                                    isLogin={handleLogin}
                                />
                        }/>
                        <Route path='signup' element={<Register
                            onRegister={handleRegister}
                        />}/>
                        <Route path='*' element={<NotFoundPage/>}/>
                    </Routes>
                </div>
                <Popup popupText={popupMassage} isOpen={popupOpen} popupExit={handlePopupClose}/>
            </CurrentUserContext.Provider>
        </LoggedInContext.Provider>
    )
}

export default App
