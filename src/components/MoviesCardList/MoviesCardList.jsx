import './MoviesCardList.css'
import Movies from "../Movies/Movies";
import MoviesCard from "../MoviesCard/MoviesCard";

function MoviesCardList() {
    return(
        <ul className='movies-card-list'>
            {<MoviesCard />}
            {<MoviesCard />}
            {<MoviesCard />}
            {<MoviesCard />}
            {<MoviesCard />}
            {<MoviesCard />}
            {<MoviesCard />}
            {<MoviesCard />}
            {<MoviesCard />}
        </ul>
    )
}
export default MoviesCardList