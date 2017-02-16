import ajax from "superagent";

import {
		CHANGE_COLOR_MENU,
		INFO_URL,
		INFO_ERROR,
		INFO_SUCCESS,
		LOGIN_SUCCESS,
		LOGIN_ERROR,
		LOG_OUT,
		LOADING,
		AUTH_URL,
		AUTHENTICATION,
		REQUEST_ERROR,
		ERR_CONNECTION_REFUSED
} from "../constants/utils";

export function changeColorMenu(color) {
    return {
        type: CHANGE_COLOR_MENU,
        payload: color
    }
}

export function getUserData() {
	console.log("GET INFO")
	return (dispatch) => {
		ajax.post(INFO_URL)
            .set({keySession: localStorage.getItem("token")})
			.end(function(err, res) {
				console.log("RESPOSTA", err, res)
				if (err || !res.ok) {
					dispatch({type: INFO_ERROR, payload: res.body})
				} else {
					dispatch({type: INFO_SUCCESS, payload: res.body})
				}
			})
	}
}

export function authUser(empresa, user, senha) {
	return (dispatch) => {
		/*ajax.get(AUTH_URL+"?empresa="+empresa+"&usuario="+user+"&senha="+senha)
			.end(function(err, res) {
				if (err || !res.ok) {
					dispatch({type: LOGIN_ERROR, payload: res.body})
				} else {
					console.log("Auth")
					localStorage.setItem(AUTHENTICATION, res.body.response);
					dispatch({type: LOGIN_SUCCESS, payload: res.body})
				}
			})*/

		ajax.post(AUTH_URL)
			.type('form')
			.send({ empresa: empresa, usuario: user, senha: senha})
			.end(function(err, res) {
				if (err || !res.ok) {
					dispatch({type: LOGIN_ERROR, payload: res.body})
				} else {
					localStorage.setItem(AUTHENTICATION, res.body.response);
					dispatch({type: LOGIN_SUCCESS, payload: res.body})
				}
			})
	}
}

export function logOut() {
	localStorage.removeItem(AUTHENTICATION);
	return {
		type: LOG_OUT,
		payload: "logout"
	}
}

export function loading() {
	return {
		type: LOADING,
		payload: "loading"
	}
}