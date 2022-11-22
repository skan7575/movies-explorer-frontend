import Header from "../Header/Header";
import SearchForm from "../SearchForm/SearchForm";
import './Movies.css'
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Footer from "../Footer/Footer";
import {useState, useEffect} from "react";
import {getData} from "../../utils/MoviesApi";
import Preloader from "../Preloader/Preloader";

function Movies({onSave, savedFilms, onDelete}) {
    const [movies, setMovies] = useState([]);
    const [query, setQuery] = useState("")
    const [onlyShort, setOnlyShort] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [searchText, setSearchText] = useState('ничего не найдено')

    useEffect(() => {
        getBaseFilms()
    }, [])

    const filterMovies = movies
        .filter(({ nameRU, duration }) => {
            const queryLowerCase = ((localStorage.getItem('searchFilms') === null)? query : localStorage.getItem('searchFilms')).toLowerCase()
            const onlyShortChoice = ((localStorage.getItem('OnlyShort') === null)? onlyShort : localStorage.getItem('OnlyShort') === "true")
            return nameRU.toLowerCase().includes(queryLowerCase)
                && (!onlyShortChoice || duration <= 40)
        })

    const savedFilmsSet = new Set(savedFilms.map((item) => item.movieId))

    function onSearchSubmit(query, onlyShort) {
        console.log("onSearchSubmit"+query+" "+onlyShort)
        setQuery(query)
        localStorage.setItem('searchFilms', query)
        setOnlyShort(onlyShort)
        localStorage.setItem('OnlyShort', onlyShort)

        getBaseFilms()
    }

    function getBaseFilms() {
        setIsLoading(true)
        if(localStorage.getItem('BaseFilms') !== null) {
            const baseFilms = JSON.parse(localStorage.getItem('BaseFilms'))
            const moviesLocalStorage = localStorage.getItem('searchFilms')
            setIsLoading(false)
            if (moviesLocalStorage === null) {
                return
            } else setMovies(baseFilms)
            setSearchText('ничего не найдено')
        }
        else {
            getData()
                .then((moviesList) => {
                    localStorage.setItem('BaseFilms', JSON.stringify(moviesList))
                    const moviesLocalStorage = localStorage.getItem('searchFilms')
                    if (moviesLocalStorage === null) {
                        return
                    } else setMovies(moviesList)
                    setSearchText('ничего не найдено')

                })
                .catch((err) => {
                    setSearchText('Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз')
                    console.error(err);
                })
                .finally(() => {
                    setIsLoading(false)
                })
        }

    }

    return (
        <>
            <Header/>
            <main className='movies'>
                <SearchForm
                    isLoading={setIsLoading}
                    onSubmit={onSearchSubmit}/>
                {isLoading === true ? (<Preloader />) : (<MoviesCardList searchText={searchText} onSave={onSave} onDelete={onDelete} movies={filterMovies} savedMoviesSet={savedFilmsSet} />)}
            </main>
            <Footer/>
        </>
    )
}

export default Movies
