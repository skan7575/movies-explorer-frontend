import getResponseData from "./utils";

const baseLink = 'api.movies.diplom.nomoredomains.icu';
export const register = (name, email, password) => {
    return fetch(`${baseLink}/signup`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            "Content-Type": "application/json"
        },
        body: JSON.stringify({name, email, password})
    })
        .then(getResponseData)
}