import {useContext} from "react";
import {LoggedInContext} from "../components/context/LoggedInContext";
import {Navigate} from "react-router-dom";


export const UseAuth = ({children}) => {
    const loggedIn = useContext(LoggedInContext)
    if (!loggedIn) {
        return <Navigate to="/" replace/>
    }
    return children
}
