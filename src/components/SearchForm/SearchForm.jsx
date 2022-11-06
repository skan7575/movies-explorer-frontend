import './SearchForm.css'

function SearchForm() {
    return (
        <form className='search-form'>
            <div className='search-form__container'>
                <input placeholder='Фильм' className='search-form__input' type='search'/>
                <button className='search-form__button'></button>
            </div>
            <div className='search-form__wrapper'>
                <label className="switch">
                    <input type="checkbox"/>
                    <span className="slider-green round"></span>
                </label>
                <p className='switch__text'>Короткометражки</p>
            </div>
        </form>
    )
}

export default SearchForm