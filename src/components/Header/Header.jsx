import Logo from "../Logo/Logo";
import Navigation from "../Navigation/Navigation";
import './Header.css'

function Header(props) {
    return(
        <header className='header'>
            <Logo />
            <Navigation loggedIn={props.loggedIn}/>
        </header>
    )
}
export default Header