import './AboutMe.css'
import me from '../../images/me.jpg'
import {Link, NavLink} from "react-router-dom";
function AboutMe(){
    return(
        <section className='about-me' id='about-me'>
            <h2 className='project__title'>Студент</h2>
            <div className='about-me__container'>
                <div className='about-me__about'>
                    <h3 className='about-me__title'>Сергей</h3>
                    <p className='about-me__text'>Фронтенд-разработчик, 24 года</p>
                    <p className='about-me__history'>
                        Пытаюсь довести проекты до идела, в первую очередь смотрю на юзабилити пользователей
                    </p>
                    <ul className='about-me__list'>
                        <li><a target='_blank' rel="noopener noreferrer" className='about-me__list-item' href='https://vk.com/inafoxi'>Vk</a></li>
                        <li><a target='_blank' className='about-me__list-item' href='https://github.com/skan7575'>GitHub</a></li>
                    </ul>
                </div>
                <img className='about-me__photo' src={me} alt="Сергей"/>
            </div>
        </section>
    )
}
export default AboutMe