import './NotFoundPage.css'
import {Link, useNavigate} from "react-router-dom";
function NotFoundPage() {
    const navigate = useNavigate()

    const goBack = () => navigate(-1)
    return(
        <section className='not-found'>
            <h1 className='not-found__title'>404</h1>
            <p  className='not-found__description'>Страница не найдена</p>
            <button onClick={goBack} className='not-found__button'>Назад</button>
        </section>
    )
}
export default NotFoundPage