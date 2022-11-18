import './Login.css'
import Logo from "../Logo/Logo";
import {Link} from "react-router-dom";
function Login() {
    return(
        <main className='login'>
            <Logo />
            <h1 className='login__title'>Рады видеть!</h1>
            <form className='login__form'>
                <div className="login__form-container">
                    <label className='login__form-label'>E-mail</label>
                    <input className='login__form-input' type="text"/>
                </div>
                <div className="login__form-container">
                    <label className='login__form-label'>Пароль</label>
                    <input className='login__form-input' type="text"/>
                </div>
                <button className='login__form-button'>Войти</button>
                <p className="login__form-signup">Ещё не зарегистрированы?
                    <Link to="/signup" className="login__form-link">Регистрация</Link>
                </p>
            </form>
        </main>
    )
}
export default Login