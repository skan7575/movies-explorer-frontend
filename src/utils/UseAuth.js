import {useContext, useEffect, useState} from "react";
import {LoggedInContext} from "../components/context/LoggedInContext";
import {Navigate, useLocation, useNavigate} from "react-router-dom";


export const UseAuth = ({children}) => {
    const navigate = useNavigate()
    const loggedIn = useContext(LoggedInContext)
    if (!loggedIn) {
        return <Navigate to="/" replace/>
    }
    return children
}
