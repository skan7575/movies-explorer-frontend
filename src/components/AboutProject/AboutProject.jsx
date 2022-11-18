import './AboutProject.css'
function AboutProject() {
    return(
        <section className='about-project' id='about-project'>
            <h2 className='project__title'>О проекте</h2>
            <div className='about-project__container'>
                <div className='about-project__about-item'>
                    <h3 className='about-project__about-title'>
                        Дипломный проект включал 5 этапов
                    </h3>
                    <p className='about-project__about-text'>
                        Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.
                    </p>
                </div>
                <div className='about-project__about-item'>
                    <h3 className='about-project__about-title'>
                        На выполнение диплома ушло 5 недель
                    </h3>
                    <p className='about-project__about-text'>
                        У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.
                    </p>
                </div>
            </div>
            <div className='about-project__lines'>
                <div className='about-project__line about-project__line_green'>
                    <p className='about-project__line-text about-project__line-text_green'>1 неделя</p>
                    <p className='about-project__line-text-after'>Back-end</p>
                </div>
                <div className='about-project__line'>
                    <p className='about-project__line-text'>4 недели</p>
                    <p className='about-project__line-text-after'>Front-end</p>
                </div>
            </div>
        </section>
    )
}
export default AboutProject