import './Techs.css'

function Techs() {
    return (
        <section className='techs' id='techs'>
            <div className='techs__container'>
                <h2 className='project__title'>Технологии</h2>
                <h3 className='techs-title'>7 технологий</h3>
                <p className='techs-text'>
                    На курсе веб-разработки мы освоили технологии, которые применили в дипломном проекте.
                </p>
                <ul className='techs__list'>
                    <li><p className='techs__list-item'>HTML</p></li>
                    <li><p className='techs__list-item'>CSS</p></li>
                    <li><p className='techs__list-item'>JS</p></li>
                    <li><p className='techs__list-item'>React</p></li>
                    <li><p className='techs__list-item'>Git</p></li>
                    <li><p className='techs__list-item'>Express.js</p></li>
                    <li><p className='techs__list-item'>mongoDB</p></li>
                </ul>
            </div>
        </section>
    )
}

export default Techs