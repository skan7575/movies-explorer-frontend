import Header from "../Header/Header";
import SearchForm from "../SearchForm/SearchForm";
import './Movies.css'
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Footer from "../Footer/Footer";
import {useState, useEffect} from "react";
import {getData} from "../../utils/MoviesApi";
import Preloader from "../Preloader/Preloader";
import preloader from "../Preloader/Preloader";

function Movies({onSave, savedFilms}) {
    const [movies, setMovies] = useState([]);
    const [query, setQuery] = useState("")
    const [onlyShort, setOnlyShort] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        const saveMoviesList = JSON.parse(localStorage.getItem('moviesSearchList'))
        if(localStorage.getItem('moviesSearchList') !== null) {
            setMovies(saveMoviesList)
        } else return
    }, [setMovies])

    const filterMovies = movies
        .filter(({ nameRU, duration }) => {
            const queryLowerCase = ((localStorage.getItem('searchFilms') === null)? query : localStorage.getItem('searchFilms')).toLowerCase()
            const onlyShortChoice = ((localStorage.getItem('OnlyShort') === null)? onlyShort : localStorage.getItem('OnlyShort') === "true")
            return nameRU.toLowerCase().includes(queryLowerCase)
                && (!onlyShortChoice || duration <= 40)
        })

    const savedFilmsSet = new Set(savedFilms.map((item) => item.movieId))

    function onQueryChange(query) {
        setQuery(query)
        localStorage.setItem('searchFilms', query)
    }

    function onSwitchChange(value) {
        setOnlyShort(value)
        console.log(onlyShort)
        localStorage.setItem('OnlyShort', value)
    }
    function onMoviesData(value) {
        console.log("onMoviesData:"+value.length)
        setMovies(value)
        localStorage.setItem('moviesSearchList', JSON.stringify(value))
    }
    return (
        <>
            <Header/>
            <main className='movies'>
                <SearchForm
                    isLoading={setIsLoading}
                    moviesData={onMoviesData}
                    onQueryChange={onQueryChange}
                    onSwitchChange={onSwitchChange}/>
                {isLoading === true ? (<Preloader />) : (<MoviesCardList onSave={onSave} movies={filterMovies} savedMoviesSet={savedFilmsSet} />)}
            </main>
            <Footer/>
        </>
    )
}

export default Movies
