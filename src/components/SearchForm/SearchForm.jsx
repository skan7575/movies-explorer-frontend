import './SearchForm.css'
import {useEffect, useState} from "react";
import {useLocation} from "react-router-dom";

function SearchForm({onSubmit}) {
    const [searchInputValue, setSearchInputValue] = useState(' ')
    const [checkboxValue, setCheckboxValue] = useState(false)
    const [errors, setErrors] = useState('');
    const location = useLocation()
    useEffect(() => {
        if(location.pathname === '/saved-movie') {
            setSearchInputValue('')
            setCheckboxValue('')
        } else if(location.pathname === '/movies' && localStorage.getItem('searchFilms') === null) {
            setSearchInputValue('')
            setCheckboxValue('')
        }

        else {
            setSearchInputValue(localStorage.getItem('searchFilms'))
            setCheckboxValue(localStorage.getItem('OnlyShort') === "true")
        }

    }, [])

    function handleChangeFormValue(e) {
        setSearchInputValue(e.target.value)
        if (e.target.value.length >= 1) {
            setErrors('')
        }
         else  {
            setErrors('')
        }
    }

    function handleChangeCheckbox(e) {
        setCheckboxValue(e.target.checked)
        onSubmit(searchInputValue, !checkboxValue)
    }

    function handleSubmitFrom(e) {
        e.preventDefault()
        if(searchInputValue.length < 1 && location.pathname === '/movies') {
            setErrors('Нужно ввести ключевое слово')
        } else {
            onSubmit(searchInputValue, checkboxValue)
        }
    }

    return (
        <form onSubmit={handleSubmitFrom} className='search-form'>
            <div className='search-form__container'>
                <input value={searchInputValue} onChange={handleChangeFormValue}  placeholder={errors}
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