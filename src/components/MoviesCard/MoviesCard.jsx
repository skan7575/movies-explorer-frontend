import React, {useState} from "react";
import './MoviesCard.css'
import jpg from '../../images/pic__COLOR_pic.jpg'
import {useLocation} from "react-router-dom";


function MoviesCard(props) {
    const {pathname} = useLocation();
    const [favorite, setFavorite] = useState(false);

    function handleFavoriteToggle() {
        setFavorite(true)
    }
    function handleFavoriteDelete() {

    }

    return (

        <li className='movies-card-list__item'>
            <div className='movies-card__about'>
                <h2 className='movies-card__title'>В погоне за Бенкси</h2>
                <p className='movies-card__time'>27 минут</p>
            </div>
            <img className='movies-card__image' src={jpg} alt="описание картинки будет использовано при создании функционала"/>
            {pathname === '/saved-movie' ? (
                <button type="button" className="movies-card__button movies-card__button_delete" onClick={handleFavoriteDelete} />
            ) : (
                <button type="button" className={`movies-card__button movies-card__button${favorite ? '_active' : '_inactive'}`}
                        onClick={handleFavoriteToggle}>{favorite ? '' : 'сохранить'}</button>
            )}
        </li>
    )
}

export default MoviesCard