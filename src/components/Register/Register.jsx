import Logo from "../Logo/Logo";
import {Link} from "react-router-dom";
import "./Register.css"
import {useEffect, useState} from "react";
function Register() {
    const[email, setEmail] = useState('')
    const[password, setPassword] = useState('')
    const[emailFocus, setEmailFocus] = useState(false)
    const[passwordFocus, setPasswordFocus] = useState(false)
    const[emailError, setEmailError] = useState('Email не может быть пустым')
    const[passwordError, setPasswordError] = useState('Пароль не может быть меньше 8 символов')
    const[formValid, setFormValid] = useState(false)

    useEffect(()=> {
        if( emailError || passwordError) {
            setFormValid(false)
        } else {
            setFormValid(true)
        }
    }, [emailError, passwordError])

    const emailHandler = (e) => {
        setEmail(e.target.value)
        const re =
            /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
        if(!re.test(String(e.target.value).toLowerCase())) {
            setEmailError('Email не корректен')
        } else {
            setEmailError('')
        }
    }
    const passwordHandler = (e) => {
        setPassword(e.target.value)
        if(e.target.value.length < 8) {
            setPasswordError('пароль не может быть меньше 8 символов')
        } else {
            setPasswordError('')
        }
    }

    const blurHandler = (e) =>{
        switch (e.target.name) {
            case 'email':
                setEmailFocus(true)
                break
            case 'password':
                setPasswordFocus(true)
                break
        }
    }

    return(
    <section className='register'>
        <Logo />
        <h1 className='register__title'>Добро пожаловать!</h1>
        <form className='register__form'>
            <div className="register__form-container">
                <label className='register__form-label'>Имя</label>
                <input className='register__form-input' type="text" required/>
            </div>
            <div className="register__form-container">
                <label className='register__form-label'>E-mail</label>
                <input onChange={emailHandler} value={email} onBlur={e=> blurHandler(e)} name='email' className='register__form-input' type="text" required/>
                {(emailFocus && emailError) && <span>{emailError}</span>}
            </div>
            <div className="register__form-container">
                <label className='register__form-label'>Пароль</label>
                <input onChange={passwordHandler} value={password} onBlur={e=> blurHandler(e)} name='password' className='register__form-input' type="text" required/>
                {(passwordFocus && passwordError) && <span>{passwordError}</span>}
            </div>
            <button disabled={!formValid} className={formValid ?'register__form-button': 'button__disabled'}>Зарегистрироваться</button>
            <p className="register__form-signup">Уже зарегистрированы?
                <Link to="/signin" className="register__form-link">Войти</Link>
            </p>
        </form>
    </section>
    )
}
export default Register