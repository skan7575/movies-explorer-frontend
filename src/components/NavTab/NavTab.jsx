import { Link, animateScroll as scroll } from "react-scroll";
import './NavTab.css'
function NevTab() {
    return(
        <div className='nevtab__links'>
            <Link to='about-project' smooth={true} offset={-70} className='nevtab__link'>О проекте</Link>
            <Link to='techs' smooth={true} offset={-70} className='nevtab__link'>Технологии</Link>
            <Link to='about-me' smooth={true} offset={-70} className='nevtab__link'>Студент</Link>
        </div>
    )
}
export default NevTab