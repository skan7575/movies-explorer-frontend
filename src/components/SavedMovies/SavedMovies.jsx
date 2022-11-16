import './SavedMovies.css'
import Header from "../Header/Header";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import SearchForm from "../SearchForm/SearchForm";
import Footer from "../Footer/Footer";
import {useEffect, useState} from "react";
import Preloader from "../Preloader/Preloader";
import {api} from "../../utils/MainApi";
function SavedMovies({savedFilms}) {
    const [isLoading, setIsLoading] = useState(false)
    const [movies, setMovies] = useState([]);
    const [query, setQuery] = useState("")
    const [onlyShort, setOnlyShort] = useState(false)

    const savedFilmsSet = new Set(savedFilms.map((item) => item.movieId))

    function deleteSaveFilm(id) {
        api.deleteSaveFilm(id.movieId)
            .then(res => {
                console.log(res)
            })
            .catch(err => {
                console.log(err)
            })
        console.log(id.movieId)
    }

    function onQueryChange(query) {
        setQuery(query)
    }

    function onSwitchChange(value) {
        setOnlyShort(value)
    }
    function onMoviesData(value) {
        setMovies(value)
    }
    return(
        <>
            <Header />
            <main className='movies'>
                <SearchForm
                    isLoading={setIsLoading}
                    moviesData={onMoviesData}
                    onQueryChange={onQueryChange}
                    onSwitchChange={onSwitchChange}/>
                {isLoading === true ? (<Preloader />) : (<MoviesCardList onDelete={deleteSaveFilm} movies={movies} savedMoviesSet={savedFilmsSet} />)}
            </main>
            <Footer />
        </>
    )
}
export default SavedMovies