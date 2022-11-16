import React, {useState} from "react";
import './MoviesCard.css'
import jpg from '../../images/pic__COLOR_pic.jpg'
import {Link, useLocation} from "react-router-dom";


function MoviesCard(
    {
        name,
        duration,
        thumbnail,
        trailerLink,
        savedMovies,
        onSave,
        onDelete,
        movie,
        allSavedMovies,
    }
) {
    const {pathname} = useLocation();
    const [favorite, setFavorite] = useState(false);

    function handleFavoriteToggle() {
        onSave(movie)
        setFavorite(!favorite)
    }

    function handleFavoriteDelete() {
        onDelete(movie)
    }

    return (
        <li className='movies-card-list__item'>
            <div className='movies-card__about'>
                <h2 className='movies-card__title'>{movie.nameRU}</h2>
                <p className='movies-card__time'>{movie.duration}</p>
            </div>
            <a href={movie.trailerLink} target="_blank" rel="noopener noreferrer">
                <img className='movies-card__image' alt={movie.nameRU}
                                       src={`https://api.nomoreparties.co/${movie.image.formats.thumbnail.url}`}/>
            </a>
            {pathname === '/saved-movie' ? (
                <button type="button" className="movies-card__button movies-card__button_delete"
                        onClick={handleFavoriteDelete}/>
            ) : (
                <button type="button"
                        className={`movies-card__button movies-card__button${favorite ? '_active' : '_inactive'}`}
                        onClick={handleFavoriteToggle}>{favorite ? '' : 'сохранить'}</button>
            )}
        </li>
    )
}

export default MoviesCard