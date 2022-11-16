import {useContext, useEffect, useState} from "react";
import {LoggedInContext} from "../components/context/LoggedInContext";
import {Navigate, useLocation} from "react-router-dom";


export const UseAuth = ({children}) => {

    const loggedIn = useContext(LoggedInContext)
    if (!loggedIn) {
        return <Navigate to="/" replace/>
    }
    return children
}
