import Main from "../Main/Main";
import Login from "../Login/Login"
import Header from "../Header/Header";
import {Route, Routes, Link, Redirect} from "react-router-dom";
import '../../index.css'
import CurrentUserContext from "../context/CurrentUserContext";
import {useState} from "react";
import Register from "../Register/Register";
import Movies from "../Movies/Movies";
import NotFoundPage from "../NotFoundPage/NotFoundPage";
import SavedMovies from "../SavedMovies/SavedMovies";
import Profile from "../Profile/Profile";

function App() {
    const [loggedIn, setLoggedIn] = useState(false)
    return (
        <CurrentUserContext.Provider>
            <div className='page'>
                <Routes>
                    <Route path="/" element={<Main />}
                           loggedIn={loggedIn}
                    />
                    <Route path='profile' element={<Profile />} />
                    <Route path='saved-movie' element={<SavedMovies />} />
                    <Route path='movies' element={<Movies />}/>
                    <Route path='signin' element={<Login />}/>
                    <Route path='signup' element={<Register />}/>
                    <Route path='*' element={<NotFoundPage />}/>
                </Routes>
            </div>
        </CurrentUserContext.Provider>
    )
}

export default App