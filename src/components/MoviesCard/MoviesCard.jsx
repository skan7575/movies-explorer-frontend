import React, {useState} from "react";
import './MoviesCard.css'
import { useLocation} from "react-router-dom";


function MoviesCard(
    {
        id,
        name,
        duration,
        thumbnail,
        trailerLink,
        isFavorite,
        movie,
        onSave,
        onDelete
    }
) {
    const {pathname} = useLocation();
    const [favorite, setFavorite] = useState(isFavorite);
    let hours = Math.floor(duration / 60);
    let minutes = Math.floor(duration - hours * 60);

    function handleFavoriteToggle() {
        onSave(movie)
        setFavorite(!favorite)
    }

    function handleFavoriteDelete() {
        onDelete(id)
        setFavorite(!favorite)
    }

    return (
        <li className='movies-card-list__item'>
            <div className='movies-card__about'>
                <h2 className='movies-card__title'>{name}</h2>
                <p className='movies-card__time'>{hours >= 1 ? hours+'ч' : ''} {minutes >= 1 ? minutes+ ' минут' : ''}</p>
            </div>
            <a href={trailerLink} target="_blank" rel="noopener noreferrer">
                <img className='movies-card__image' alt={name}
                                       src={thumbnail}/>
            </a>
            {pathname === '/saved-movie' ? (
                <button type="button" className="movies-card__button movies-card__button_delete"
                        onClick={handleFavoriteDelete}/>
            ) : (
                <button type="button"
                        className={`movies-card__button movies-card__button${favorite ? '_active' : '_inactive'}`}
                        onClick={favorite ? handleFavoriteDelete : handleFavoriteToggle}>{favorite ? '' : 'сохранить'}</button>
            )}
        </li>
    )
}

export default MoviesCard