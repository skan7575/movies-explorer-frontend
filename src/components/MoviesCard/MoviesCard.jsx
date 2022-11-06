import './MoviesCard.css'
import jpg from '../../images/pic__COLOR_pic.jpg'
function MoviesCard() {
    return(
        <li className='movies-card-list__item'>
            <div className='movies-card__about'>
                <h2 className='movies-card__title'>В погоне за Бенкси</h2>
                <p className='movies-card__time'>27 минут</p>
            </div>
            <img className='movies-card__image' src={jpg} alt=""/>
            <button className='movies-card__saved'>Сохранить</button>
        </li>
    )
}
export default MoviesCard