import './MoviesCardList.css'
import MoviesCard from "../MoviesCard/MoviesCard";

function MoviesCardList(props) {
    return (
            <ul className='movies-card-list'>
                {<MoviesCard
                    card={props.card}
                    isSaved={props.isSaved}
                    isOnlySaved={props.isOnlySaved}
                    onCardSave={props.onCardSave}
                    onCardDelete={props.onCardDelete}
                />}
                {<MoviesCard/>}
                {<MoviesCard/>}
                {<MoviesCard/>}
                {<MoviesCard/>}
                {<MoviesCard/>}
            </ul>

    )
}

export default MoviesCardList