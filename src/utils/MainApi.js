import getResponseData from "./utils";

const baseLink = 'https://api.movies.diplom.nomoredomains.icu';

class MainApi {
    constructor({baseLink, headers}) {
        this.bdlink = baseLink
        this.headers = headers
    }

    register = ({name, email, password}) => {
        return fetch(`${this.bdlink}/signup`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                "Content-Type": "application/json"
            },
            body: JSON.stringify({name, email, password})
        })
            .then(getResponseData)
    }

    updateUser = ({email, name}) => {
        return fetch(`${this.bdlink}/users/me`, {
            method: 'PATCH',
            headers: {
                Accept: 'application/json',
                "Content-Type": "application/json",
                authorization: "Bearer " + localStorage.getItem("token")
            },
            body: JSON.stringify({email, name})
        })
            .then(getResponseData)

    }

    login = ({email, password}) => {
        return fetch(`${this.bdlink}/signin`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                "Content-Type": "application/json"

            },
            body: JSON.stringify({email, password})
        })
            .then(getResponseData)
    }
    checkToken = (token) => {
        return fetch(`${this.bdlink}/users/me`, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                authorization: `Bearer ${token}`
            }
        })
            .then(getResponseData)
            .then((data) => data);
    };

    saveFilm(data) {
        return fetch(`${this.bdlink}/movies`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                "Content-Type": "application/json",
                authorization: "Bearer " + localStorage.getItem("token")
            },
            body: JSON.stringify(data),
        }).then(getResponseData);
    }
    getSaveFilm() {
        return fetch(`${this.bdlink}/movies`, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                "Content-Type": "application/json",
                authorization: "Bearer " + localStorage.getItem("token")
            },
        }).then(getResponseData);
    }
    deleteSaveFilm(id) {
        return fetch(`${this.bdlink}/movies/_id`, {
            method: 'DELETE',
            headers: {
                Accept: 'application/json',
                "Content-Type": "application/json",
                authorization: "Bearer " + localStorage.getItem("token")
            },
        }).then(getResponseData);
    }
}


export const api = new MainApi({
    baseLink: baseLink,
    headers: () => {
        return {
            authorization: "Bearer " + localStorage.getItem("token"),
            'Content-Type':'application/json'
        }
    }
})