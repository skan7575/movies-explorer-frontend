import './Profile.css'
import Header from "../Header/Header";
function Profile() {
    return(
        <>
            <Header />
            <main className='profile'>
                <h1 className='profile__title'>Привет, Сергей!</h1>
                <form className='profile__from'>
                    <div className='profile__from-container'>
                        <label  className='profile__from-label'>
                            Имя
                        </label>
                        <input placeholder='Сергей' type="text" className='profile__from-input'/>
                    </div>
                    <div className='profile__from-container'>
                        <label className='profile__from-label'>
                            E-mail
                        </label>
                        <input placeholder='mail.ru' type="text" className='profile__from-input'/>
                    </div>
                    <button className='profile__from-button'>Редактировать</button>
                </form>
                <button className='profile__exit-button'>Выйти из аккаунта</button>
            </main>
        </>
    )
}
export default Profile