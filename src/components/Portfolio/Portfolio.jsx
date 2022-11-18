import './Portfolio.css'
import {Link} from "react-router-dom";
import link from '../../images/text__COLOR_font-main.svg'

function Portfolio() {
    return (
        <section className='portfolio'>
            <h2 className='portfolio__title'>Портфолио</h2>
            <ul className='portfolio__list'>
                <li>
                    <a target='_blank' href='https://github.com/skan7575/how-to-learn' className='portfolio__list-item portfolio__list-item_underline'>Статичный сайт
                    </a>
                </li>
                <li>
                    <a target='_blank' href='https://github.com/skan7575/russian-travel' className='portfolio__list-item portfolio__list-item_underline'>Адаптивный сайт
                    </a>
                </li>
                <li>
                    <a target='_blank' href='https://github.com/skan7575/react-mesto-api-full' className='portfolio__list-item'>Одностраничное приложение
                    </a>
                </li>
            </ul>
        </section>
    )
}

export default Portfolio