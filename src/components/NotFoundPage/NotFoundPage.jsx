import './NotFoundPage.css'
import {Link} from "react-router-dom";
function NotFoundPage() {
    return(
        <section className='not-found'>
            <h1 className='not-found__title'>404</h1>
            <p  className='not-found__description'>Страница не найдена</p>
            <Link to='/' className='not-found__button'>Назад</Link>
        </section>
    )
}
export default NotFoundPage