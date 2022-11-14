import './MoviesCardList.css'
import MoviesCard from "../MoviesCard/MoviesCard";

function MoviesCardList(props
) {

    return (
        <ul className='movies-card-list'>
            <MoviesCard
                movie={props.movie}
            />
            <MoviesCard
                movie={props.movie}
            />
            <MoviesCard
                movie={props.movie}
            />
        </ul>

    )
}

export default MoviesCardList