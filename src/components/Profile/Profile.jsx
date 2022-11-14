import './Profile.css'
import React, {useState} from "react";
import Header from "../Header/Header";
import {CurrentUserContext} from "../context/CurrentUserContext";
import isEmail from "validator/es/lib/isEmail";
import {Navigate} from "react-router-dom";
function Profile({onUpdate, handleLogout}) {
    const [inputValues, setInputValues] = useState({});
    const [errors, setErrors] = useState({});
    const [isValid, setIsValid] = useState(false);
    const currentUser = React.useContext(CurrentUserContext);



    const handleInputChange = (e) => {
        const target = e.target;
        const name = target.name;
        const value = target.value;

        if (name === 'email') {
            if (!isEmail(value)) {
                target.setCustomValidity('Проверьте правильность ввода E-mail');
            }
            if(value === currentUser.email) {
                target.setCustomValidity('Поле соответствует текущим данным');
            }
            else {
                target.setCustomValidity('');
            }
        }
        if (name === 'name') {
            if(value.length < 2) {
                target.setCustomValidity('Поле имя не может быть меньше 2 символов');
            }
            if(value === currentUser.name) {
                target.setCustomValidity('Поле соответствует текущим данным');
            }
            else {
                target.setCustomValidity('');
            }
        }
        setInputValues({...inputValues, [name]: value});
        setErrors({...errors, [name]: target.validationMessage});
        setIsValid(target.closest('form').checkValidity());
    }

    const updateUser = (e) => {
        e.preventDefault();
        onUpdate(inputValues)
        setInputValues('')
    }
    return(
        <>
            <Header/>
            <main className='profile'>
                <h1 className='profile__title'>Привет, {currentUser.name}</h1>
                <form onSubmit={updateUser} className='profile__from'>
                    <div className='profile__from-container'>
                        <label  className='profile__from-label'>
                            Имя
                        </label>
                        <input required name='name' value={inputValues.name || ''} onChange={handleInputChange} placeholder={currentUser.name} type="text" className='profile__from-input'/>
                        <span className='profile__error'>{errors.name}</span>
                    </div>
                    <div className='profile__from-container'>
                        <label className='profile__from-label'>
                            E-mail
                        </label>
                        <input required name='email' value={inputValues.email || ''} onChange={handleInputChange} placeholder={currentUser.email} type="text" className='profile__from-input'/>
                        <span className='profile__error'>{errors.email}</span>
                    </div>
                    <button disabled={!isValid} className={`${isValid ? 'profile__from-button' : 'profile__from-button profile__from-button_disabled'}`}>Редактировать</button>
                </form>
                <button onClick={handleLogout} className='profile__exit-button'>Выйти из аккаунта</button>
            </main>
        </>
    )
}
export default Profile