import './Footer.css'
import {Link} from "react-router-dom";

function Footer() {
    return (
        <footer className='footer'>
            <h2 className='footer__title'>Учебный проект Яндекс.Практикум х BeatFilm.</h2>
            <div className="footer__container">
                <p className='footer__copyright'>© 2022</p>
                <ul className="footer__links">
                    <li><Link to='/' className='footer__link'>Яндекс.Практикум</Link></li>
                    <li><Link to='/' className='footer__link'>Github</Link></li>
                </ul>
            </div>
        </footer>
    )
}

export default Footer