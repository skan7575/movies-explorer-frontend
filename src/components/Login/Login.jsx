import './Login.css'
import Logo from "../Logo/Logo";
import {Link} from "react-router-dom";
import {useState} from "react";
import isEmail from "validator/es/lib/isEmail";
import React from "react";
function Login({isLogin}) {
    const [inputValues, setInputValues] = useState({});
    const [errors, setErrors] = useState({});
    const [isValid, setIsValid] = useState(false);

    const handleInputChange = (e) => {
        const target = e.target;
        const name = target.name;
        const value = target.value;

        if (name === 'password') {
            if(value.length < 6 || value.length <= 0) {
                target.setCustomValidity('Пароль не может содержать менее 6 символов');
            }
            else {
                target.setCustomValidity('');
            }
        }
        if (name === 'email') {
            if(!isEmail(value) || value.length <= 0) {
                target.setCustomValidity('Введите корректный E-mail');
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
        e.preventDefault();
        isLogin(inputValues);
        setInputValues('')
    };
    return(
        <main className='login'>
            <Logo />
            <h1 className='login__title'>Рады видеть!</h1>
            <form onSubmit={handleSubmit} className='login__form'>
                <div className="login__form-container">
                    <label className='login__form-label'>E-mail</label>
                    <input onChange={handleInputChange} value={inputValues.email || ''} name='email' className='login__form-input' type="text" required/>
                    <span className='login__error'>{errors.email}</span>
                </div>
                <div className="login__form-container">
                    <label className='login__form-label'>Пароль</label>
                    <input onChange={handleInputChange} value={inputValues.password || ''} name='password' className='login__form-input' type="password" required/>
                    <span className='login__error'>{errors.password}</span>
                </div>
                <button disabled={!isValid}
                        className={isValid ? 'login__form-button' : 'button__disabled'}>Войти
                </button>
                <p className="login__form-signup">Ещё не зарегистрированы?
                    <Link to="/signup" className="login__form-link">Регистрация</Link>
                </p>
            </form>
        </main>
    )
}
export default Login