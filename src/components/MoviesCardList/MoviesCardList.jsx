import './MoviesCardList.css'
import MoviesCard from "../MoviesCard/MoviesCard";
import {useEffect, useState} from "react";
import {useLocation} from "react-router-dom";
import Preloader from "../Preloader/Preloader";

function MoviesCardList({movies, savedMoviesSet, isLoading, onSave, onDelete, searchText}
) {

    const [nextPageSize, setNextPageSize] = useState()
    const [displayedSize, setDisplayedSize] = useState()
    const [availableWidth, setAvailableWidth] = useState(window.innerWidth)
    const location = useLocation();

    function handleSubmitMore() {
        setDisplayedSize((displayedSize) => displayedSize + nextPageSize)
    }

    useEffect(() => {
        const handleWindowResize = () => {
            setAvailableWidth(window.innerWidth);
        };

        if (location.pathname === '/movies') {
            if (availableWidth <= 480) {
                setDisplayedSize(5)
                setNextPageSize(1)
            } else if (availableWidth <= 768) {
                setDisplayedSize(8)
                setNextPageSize(2)
            } else {
                setDisplayedSize(12)
                setNextPageSize(3)
            }
        }

        window.addEventListener('resize', handleWindowResize);
        return () => {
            window.removeEventListener('resize', handleWindowResize);
        };

    }, [availableWidth, location]);


    return (
        <>
            {isLoading ? (<Preloader />) :
                (<ul className='movies-card-list'>
                    {}
                    {movies.slice(0, displayedSize).map((item) => {
                        const filmId = (item.movieId == null) ? item.id : item.movieId
                        const key = (item.movieId == null) ? item.id : item._id
                        return <MoviesCard
                            id={filmId}
                            name={item.nameRU}
                            duration={item.duration}
                            trailerLink={item.trailerLink}
                            thumbnail={(item.thumbnail != null)? item.thumbnail : `https://api.nomoreparties.co/${item.image.formats.thumbnail.url}`}
                            onDelete={onDelete}
                            onSave={onSave}
                            isFavorite={savedMoviesSet.has(filmId)}
                            key={key}
                            movie={item}
                        />
                    })}
                    {localStorage.getItem('searchFilms') === null ? '' : (movies.length > 0 ? '' : <p>{searchText}</p>)}
                </ul>)}

            {movies.length > displayedSize ? (
                <button onClick={handleSubmitMore} className='movies-card-button' type="button"
                        name="more">Ещё</button>) : ''}
        </>
    )
}

export default MoviesCardList