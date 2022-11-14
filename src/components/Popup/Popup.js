import './Popup.css'
function Popup({popupText, isOpen, popupExit}){
    return(
        <div className={`popup ${isOpen ? 'popup_open' : ''} `}>
            <button onClick={popupExit} className='popup__button-exit'></button>
            <p className='popup__text'>{popupText}</p>
        </div>
    )
}
export default Popup