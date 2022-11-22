import Main from "../Main/Main";
import Login from "../Login/Login"
import {Route, Routes, useNavigate, Navigate,} from "react-router-dom";

import '../../index.css'
import {LoggedInContext} from "../context/LoggedInContext";
import {useEffect, useState} from "react";
import Register from "../Register/Register";
import Movies from "../Movies/Movies";
import NotFoundPage from "../NotFoundPage/NotFoundPage";
import SavedMovies from "../SavedMovies/SavedMovies";
import Profile from "../Profile/Profile";
import {api} from "../../utils/MainApi";
import Popup from "../Popup/Popup";
import {CurrentUserContext} from "../context/CurrentUserContext";
import {UseAuth} from "../../utils/UseAuth";

function App() {
    const navigate = useNavigate();
    const [userData, setUserData] = useState({})
    const [loggedIn, setLoggedIn] = useState(localStorage.getItem('token'))
    const [popupMassage, setPopupMassage] = useState('')
    const [popupOpen, setPopupOpen] = useState(false)
    const [savedFilms, setSavedFilms] = useState([])

    useEffect(() => {
        tokenCheck()
    }, [])
    useEffect(() => {
        getSavedFilms()
    }, [])

    function getSavedFilms() {
        if (localStorage.getItem('savedMovies') !== null) {
            setSavedFilms(JSON.parse(localStorage.getItem('savedMovies')))
        } else {
            api.getSaveFilm()
                .then((res) => {
                    localStorage.setItem('savedMovies', JSON.stringify(res))
                    setSavedFilms(res)
                })
                .catch(err => {
                    if(err === 'Ошибка: 401') {
                        handleLogout()
                    }
                    else {
                        console.log(err)
                    }
                })
        }
    }

    function handlePopupClose() {
        setPopupOpen(false)
    }

    function handleRegister(formData) {
        api.register(formData)
            .then((res) => {
                if (res) {
                    handleLogin(formData)
                }
            })
            .catch((err) => {
                console.log({err})
                setPopupMassage('Данный email уже зарегистрирован');
                setPopupOpen(true)
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
                setPopupMassage('Проверьте логин или пароль');
                setPopupOpen(true)
            });
    }

    function handleUpdate(formData) {
        api.updateUser(formData)
            .then((res) => {
                if (res) {
                    setPopupMassage('Ваш профиль обновлен');
                    setPopupOpen(true)
                    setUserData({email: res.email, name: res.name})
                }
            })
            .catch(err => {
                if(err === 'Ошибка: 401') {
                    handleLogout()
                }
                else {
                    console.log(err)
                }
                }
            )
    }

    function handleLogout() {
        localStorage.clear();
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
                        handleLogout()
                        navigate('/');
                    }
                })
                .catch((err) => console.error(err));
        }
    }


    function handleDeleteFilm(id) {
        const savedMovie = savedFilms.find((item) => item.movieId === id)
        if (savedMovie == null) return
        const savedMovieId = savedMovie._id
        api.deleteSaveFilm(savedMovieId)
            .then((res) => {
                setSavedFilms((prevState) => {
                    const result = prevState.filter((e) => e._id !== savedMovieId)
                    localStorage.setItem('savedMovies', JSON.stringify(result))
                    return result
                })
            })
            .catch(err => {
                if(err === 'Ошибка: 401') {
                    handleLogout()
                }
                else {
                    console.log(err)
                }
                }
            )

    }

    function handleSaveFilm(movie) {
        const refactorMovie = {
            ...movie,
            image: `https://api.nomoreparties.co/${movie.image.formats.thumbnail.url}`,
            thumbnail: `https://api.nomoreparties.co/${movie.image.formats.thumbnail.url}`,
            movieId: movie.id
        };
        delete refactorMovie.id
        delete refactorMovie.created_at
        delete refactorMovie.updated_at
        api.saveFilm(refactorMovie)
            .then(res => {
                setSavedFilms((savedFilms) => {
                    savedFilms.push(res.data)
                    localStorage.setItem("savedMovies", JSON.stringify(savedFilms))
                    return savedFilms
                })
            })
            .catch(err => {
                    if (err === 'Ошибка: 401') {
                        handleLogout()
                    } else
                        console.log(err.name)
                }
            )
        console.log(movie)
    }

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
                            <UseAuth children={<SavedMovies onDelete={handleDeleteFilm} savedFilms={savedFilms}/>}>
                            </UseAuth>
                        }/>
                        <Route path='movies' element={
                            <UseAuth children={<Movies onDelete={handleDeleteFilm} onSave={handleSaveFilm}
                                                       savedFilms={savedFilms}/>}>
                            </UseAuth>
                        }/>
                        <Route path='signin' element={
                            !loggedIn ?
                                <Login
                                    isLogin={handleLogin}
                                /> : <Navigate to="/"/>
                        }/>
                        <Route path='signup' element={
                            !loggedIn ?
                                <Register
                                    onRegister={handleRegister}
                                /> : <Navigate to='/'/>}
                        />
                        <Route path='*' element={<NotFoundPage/>}/>
                    </Routes>
                </div>
                <Popup popupText={popupMassage} isOpen={popupOpen} popupExit={handlePopupClose}/>
            </CurrentUserContext.Provider>
        </LoggedInContext.Provider>
    )
}

export default App
