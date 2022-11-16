import './SearchForm.css'
import {useEffect, useState} from "react";
import {getData} from "../../utils/MoviesApi";

function SearchForm({
                        isLoading,
                        moviesData,
                        onQueryChange,
                        onSwitchChange,
                    }) {
    const [searchInputValue, setSearchInputValue] = useState("")
    const [checkboxValue, setCheckboxValue] = useState(false)
    const [movies, setMovies] = useState([])

    // useEffect(() => {
    //     getData()
    //         .then((moviesList) => {
    //             setMovies(moviesList)
    //         })
    //         .catch((err) => {
    //             console.error(err);
    //         })
    // }, [])

    useEffect(() => {
        setSearchInputValue(localStorage.getItem('searchFilms'))
        setCheckboxValue(localStorage.getItem('OnlyShort') === "true")
        getBaseFilms()
    }, [])

    // function getFilms () {
    //         getData()
    //             .then((moviesList) => {
    //                 setMovies(moviesList)
    //             })
    //             .catch((err) => {
    //                 console.error(err);
    //             });
    // }
    // useEffect(() => {
    //     setCheckboxValue()
    // })
    function getBaseFilms() {
        getData()
            .then((moviesList) => {
                console.log("getData:"+moviesList.length)
                setMovies(moviesList)
            })
            .catch((err) => {
                console.error(err);
            })
            .finally(() => {
                isLoading(false)
            })
        isLoading(true)
    }

    function handleChangeFormValue(e) {
        setSearchInputValue(e.target.value)
    }

    function handleChangeCheckbox(e) {
        setCheckboxValue(e.target.checked)
    }

    function handleSubmitFrom(e) {
        e.preventDefault()
        getBaseFilms()
        console.log("handleSubmitFrom:"+movies.length)
        moviesData(movies)
        onSwitchChange(checkboxValue)
        onQueryChange(searchInputValue)
    }

    return (
        <form onSubmit={handleSubmitFrom} className='search-form'>
            <div className='search-form__container'>
                <input value={searchInputValue} onChange={handleChangeFormValue} required placeholder='Фильм'
                       className='search-form__input' type='search'/>
                <button type='submit' className='search-form__button'></button>
            </div>
            <div className='search-form__wrapper'>
                <label className="switch">
                    <input checked={checkboxValue} onChange={handleChangeCheckbox} type="checkbox" name='checked'/>
                    <span className="slider-green round"></span>
                </label>
                <p className='switch__text'>Короткометражки</p>
            </div>
        </form>
    )
}

export default SearchForm