import './SavedMovies.css'
import Header from "../Header/Header";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import SearchForm from "../SearchForm/SearchForm";
import Footer from "../Footer/Footer";
import {useEffect, useState} from "react";
import Preloader from "../Preloader/Preloader";
import {api} from "../../utils/MainApi";

function SavedMovies({savedFilms, onDelete}) {
    const [isLoading, setIsLoading] = useState(false)
    const [movies, setMovies] = useState([]);
    const [query, setQuery] = useState("")
    const [onlyShort, setOnlyShort] = useState(false)
    const [searchText, setSearchText] = useState('ничего не найдено')

    const savedFilmsSet = new Set(savedFilms.map((item) => item.movieId))

    useEffect(() => {
        getBaseFilms()
    }, [])


    const filterMovies = movies
        .filter(({nameRU, duration}) => {
            const queryLowerCase = query
            const onlyShortChoice = onlyShort
            return nameRU.toLowerCase().includes(queryLowerCase)
                && (!onlyShortChoice || duration <= 40)
        })

    function onSearchSubmit(query, onlyShort) {
        setQuery(query.toLowerCase())
        setOnlyShort(onlyShort)
    }

    function getBaseFilms() {
        setIsLoading(true)
        if (localStorage.getItem('savedMovies') !== null) {
            setMovies(JSON.parse(localStorage.getItem('savedMovies')))
            setSearchText('ничего не найдено')
            setIsLoading(false)
        } else {
            api.getSaveFilm()
                .then((moviesList) => {
                    localStorage.setItem('savedMovies', JSON.stringify(moviesList))
                    setMovies(moviesList)
                    setSearchText('ничего не найдено')
                })
                .catch((err) => {
                    console.error(err);
                    setSearchText('Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз')
                })
                .finally(() => {
                    setIsLoading(false)
                })
        }
    }
    function handlerOnDelete(id) {
        onDelete(id)
        setMovies((prevState) => prevState.filter((e) => e.movieId !== id))
    }

    return (
        <>
            <Header/>
            <main className='movies'>
                <SearchForm
                    isLoading={setIsLoading}
                    onSubmit={onSearchSubmit}/>
                {isLoading === true ? (<Preloader/>) : (
                    <MoviesCardList searchText={searchText} onDelete={handlerOnDelete} movies={filterMovies}
                                    savedMoviesSet={savedFilmsSet}/>)}
            </main>
            <Footer/>
        </>
    )
}

export default SavedMovies