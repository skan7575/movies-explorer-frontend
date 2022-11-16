import React from "react";
import {withRouter} from 'react-router-dom';
import Logo from "../Logo/Logo";
import {Link} from "react-router-dom";
import "./Register.css"
import {useEffect, useState} from "react";
import isEmail from 'validator/es/lib/isEmail';
import Popup from "../Popup/Popup";

function Register({onRegister}) {
    const [inputValues, setInputValues] = useState({});
    const [errors, setErrors] = useState({});
    const [isValid, setIsValid] = useState(false);

    const handleInputChange = (e) => {
        const target = e.target;
        const name = target.name;
        const value = target.value;


        if (name === 'email') {
            if (!isEmail(value)) {
                target.setCustomValidity('Проверьте правильность ввода E-mail');
            } else {
                target.setCustomValidity('');
            }
        }
        if (name === 'name') {
            if(value.length < 2) {
                target.setCustomValidity('Поле имя не может быть меньше 2 символов');
            }
            else {
                target.setCustomValidity('');
            }
        }
        if (name === 'password') {
            if(value.length < 8) {
                target.setCustomValidity('Пароль не может содержать менее 8 символов');
            }
            else {
                target.setCustomValidity('');
            }
        }
        setInputValues({...inputValues, [name]: value});
        setErrors({...errors, [name]: target.validationMessage});
        setIsValid(target.closest('form').checkValidity());
    }
    const handleSubmit = (e) => {
        localStorage.clear();
        e.preventDefault();
        onRegister(inputValues);
        setInputValues('')

    };

    return (
        <>
            <main className='register'>
                <Logo/>
                <h1 className='register__title'>Добро пожаловать!</h1>
                <form onSubmit={handleSubmit} className='register__form'>
                    <div className="register__form-container">
                        <label className='register__form-label'>Имя</label>
                        <input onChange={handleInputChange} value={inputValues.name || ''} name='name'
                               className='register__form-input' type="text" required/>
                        <span className='register__error'>{errors.name}</span>
                    </div>
                    <div className="register__form-container">
                        <label className='register__form-label'>E-mail</label>
                        <input onChange={handleInputChange} value={inputValues.email || ''} name='email'
                               className='register__form-input' type="email" required/>
                        <span className='register__error'>{errors.email}</span>
                    </div>
                    <div className="register__form-container">
                        <label className='register__form-label'>Пароль</label>
                        <input onChange={handleInputChange} value={inputValues.password || ''} name='password'
                               className='register__form-input' type="password" required/>
                        <span className='register__error'>{errors.password}</span>
                    </div>
                    <button disabled={!isValid}
                            className={isValid ? 'register__form-button' : 'button__disabled'}>Зарегистрироваться
                    </button>
                    <p className="register__form-signup">Уже зарегистрированы?
                        <Link to="/signin" className="register__form-link">Войти</Link>
                    </p>
                </form>
            </main>
        </>
    )
}

export default Register