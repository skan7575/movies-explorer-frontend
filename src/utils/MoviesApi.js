import getResponseData from "./utils";

const baseLink = 'https://api.nomoreparties.co/beatfilm-movies';

export const getData = () => {
    return fetch(`${baseLink}`, {
        headers: {
            Accept: 'application/json',
            "Content-Type": "application/json"
        }
    })
        .then(getResponseData)
}
