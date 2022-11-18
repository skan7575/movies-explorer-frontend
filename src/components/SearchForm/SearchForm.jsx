import './SearchForm.css'
import {useEffect, useState} from "react";
import {getData} from "../../utils/MoviesApi";
import {useLocation} from "react-router-dom";

function SearchForm({onSubmit}) {
    const [searchInputValue, setSearchInputValue] = useState("")
    const [checkboxValue, setCheckboxValue] = useState(false)
    const location = useLocation()
    useEffect(() => {
        if(location.pathname === '/saved-movie') {
            setSearchInputValue('')
            setCheckboxValue('')
        } else {
            setSearchInputValue(localStorage.getItem('searchFilms'))
            setCheckboxValue(localStorage.getItem('OnlyShort') === "true")
        }

    }, [])

    function handleChangeFormValue(e) {
        setSearchInputValue(e.target.value)
    }

    function handleChangeCheckbox(e) {
        setCheckboxValue(e.target.checked)
        onSubmit(searchInputValue, !checkboxValue)
    }

    function handleSubmitFrom(e) {
        e.preventDefault()
        onSubmit(searchInputValue, checkboxValue)
    }

    return (
        <form onSubmit={handleSubmitFrom} className='search-form'>
            <div className='search-form__container'>
                <input value={searchInputValue} onChange={handleChangeFormValue} required={location.pathname === '/saved-movie' ? false : true}  placeholder='Фильм'
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