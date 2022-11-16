import './MoviesCardList.css'
import MoviesCard from "../MoviesCard/MoviesCard";
import {useEffect, useState} from "react";
import {useLocation} from "react-router-dom";
import Preloader from "../Preloader/Preloader";

function MoviesCardList({movies, query, onlyShort, isLoading, onSave, onDelete}
) {
    const [firstPageSize, setFirstPageSize] = useState()
    const [nextPageSize, setNextPageSize] = useState()
    const [displayedSize, setDisplayedSize] = useState()
    const [availableWidth, setAvailableWidth] = useState(window.innerWidth)
    const [moreButton, setMoreButton] = useState(2)
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
                    {movies.slice(0, displayedSize).map((item) => {
                        return <MoviesCard
                            onDelete={onDelete}
                            onSave={onSave}
                            key={item.id}
                            movie={item}
                        />
                    })}
                    {movies.length === 0 ? (<h2>Ничего не найдено</h2>) : ''}
                </ul>)}

            {movies.length > displayedSize ? (
                <button onClick={handleSubmitMore} className='movies-card-button' type="button"
                        name="more">Ещё</button>) : ''}
        </>
    )
}

export default MoviesCardList