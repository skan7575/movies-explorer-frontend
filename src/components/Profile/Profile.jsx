import './Profile.css'
import React, {useEffect, useState} from "react";
import Header from "../Header/Header";
import {CurrentUserContext} from "../context/CurrentUserContext";
import isEmail from "validator/es/lib/isEmail";

function Profile({onUpdate, handleLogout}) {
    const currentUser = React.useContext(CurrentUserContext);
    const [inputValues, setInputValues] = useState({ });
    const [errors, setErrors] = useState({});
    const [isValid, setIsValid] = useState(false);

    useEffect(() => {
        setInputValues({ name: currentUser.name, email: currentUser.email })
    }, [currentUser])

    const handleInputChange = (e) => {
        const target = e.target;
        const name = target.name;
        const value = target.value;

        if (name === 'name') {
            if (value.length < 2) {
                target.setCustomValidity('Поле имя не может быть меньше 2 символов');

            } else if (value === currentUser.name) {
                target.setCustomValidity('Поле соответствует текущим данным');
            } else
                target.setCustomValidity('');
        }

        if (name === 'email') {
            if (!isEmail(value)) {
                target.setCustomValidity('Проверьте правильность ввода E-mail');
            } else if (value === currentUser.email) {
                target.setCustomValidity('Поле соответствует текущим данным');
            } else if (value.length <= 0) {
                target.setCustomValidity('Поле обязательно к заполению');
            } else {
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
    }


    return (
        <>
            <Header/>
            <main className='profile'>
                <h1 className='profile__title'>Привет, {currentUser.name}</h1>
                <form onSubmit={updateUser} className='profile__from'>
                    <div className='profile__from-container'>
                        <label className='profile__from-label'>
                            Имя
                        </label>
                        <input required
                               value={inputValues.name}
                               onChange={handleInputChange}
                               type="text"
                               name='name'
                               className='profile__from-input'/>
                        <span className='profile__error'>{errors.name}</span>
                    </div>
                    <div className='profile__from-container'>
                        <label className='profile__from-label'>
                            E-mail
                        </label>
                        <input
                            required
                            name='email'
                            value={inputValues.email}
                            onChange={handleInputChange}
                            type="text"
                            className='profile__from-input'/>
                        <span className='profile__error'>{errors.email}</span>
                    </div>
                    <button disabled={!isValid}
                            className={`${isValid ? 'profile__from-button' : 'profile__from-button profile__from-button_disabled'}`}>Редактировать
                    </button>
                </form>
                <button onClick={handleLogout} className='profile__exit-button'>Выйти из аккаунта</button>
            </main>
        </>
    )
}

export default Profile