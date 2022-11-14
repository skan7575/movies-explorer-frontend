import {useContext, useEffect} from "react";
import {LoggedInContext} from "../components/context/LoggedInContext";
import {Navigate, useLocation} from "react-router-dom";


export const UseAuth = ({children}) => {
    useEffect(()=> {
        console.log(pathname)
    })
    const pathname = useLocation()
    const LoggedIn = useContext(LoggedInContext)

    if (!LoggedIn) {
        return <Navigate to="/" replace/>
    }
    return children
}
