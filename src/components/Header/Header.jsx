import Logo from "../Logo/Logo";
import Navigation from "../Navigation/Navigation";
import './Header.css'

function Header({loggedIn}) {
    return(
        <header className='header'>
            <Logo />
            <Navigation/>
        </header>
    )
}
export default Header