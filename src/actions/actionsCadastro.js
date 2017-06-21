import ajax from "superagent";
import {
    ADD_NEW_USER,
    CLOSE_MESSAGE_ERROR,
    GET_USERS_CADASTRO,
    GET_USERS_BY_GROUP_ID,
    GET_PERMISSOES_USER,
    GET_GROUPS_CADASTRO,
    GET_CONSULTAS_GRUPO,
    LOADING_CADASTRO,
    URL_GET_GRUPOS_CADASTRO,
    URL_GET_USERS_BY_GROUP_ID,
    URL_GET_USERS_CADASTRO,
    URL_ADD_NEW_USER,
	URL_UPDATE_USER
} from "../constants/constantsCadastro";

import { api, apiGetWithKeySession } from "../api/Api";

import { ERR_CONNECTION_REFUSED, REQUEST_ERROR } from "../constants/utils";

export function addNewUser(usuario) {
	let url = URL_ADD_NEW_USER
		+"?usuario.grupoUsuarioVO.id="+usuario.grupoUsuarioVO.id
		+"&usuario.perfilVO.id="+usuario.perfilVO.id
		+"&usuario.usuario="+usuario.usuario
		+"&usuario.email1="+usuario.email1
		+"&usuario.email2"+usuario.email2
		+"&usuario.statusAtivo="+usuario.statusAtivo
		+"&usuario.tipoLimitacao="+usuario.tipoLimitacao
		+"&usuario.periodoLimitacao"+usuario.periodoLimitacao
		+"&usuario.limiteValorString="+parseInt(usuario.limiteValorString)
		+"&usuario.obs="+usuario.obs;

	return (dispatch) => {
		ajax.post(url)
			.set({keySession: localStorage.getItem("token")})
			.end(function(error, response) {
				if (response.body) {
					if (response.status == 200 && !response.body.erro) {
						dispatch({type: ADD_NEW_USER, payload: response.body})
					} else {
						dispatch({type: REQUEST_ERROR, payload: response.body.erro})
					}
				} else {
					dispatch({type: ERR_CONNECTION_REFUSED, payload: error})
				}
			})
	}
}

export function updateUser(usuario, tipo) {
	let url = URL_UPDATE_USER
		+"?usuario.id="+usuario.id
		+"&usuario.grupoUsuarioVO.id="+usuario.grupoUsuarioVO.id
		+"&usuario.perfilVO.id="+usuario.perfilVO.id
		+"&usuario.usuario="+usuario.usuario
		+"&usuario.email1="+usuario.email1
		+"&usuario.email2"+usuario.email2
		+"&usuario.statusAtivo="+usuario.statusAtivo
		+"&usuario.tipoLimitacao="+usuario.tipoLimitacao
		+"&usuario.periodoLimitacao"+usuario.periodoLimitacao
		+"&usuario.limiteValorString="+parseInt(usuario.limiteValorString)
		+"&usuario.obs="+usuario.obs;

	return (dispatch) => {
		ajax.put(url)
			.set({keySession: localStorage.getItem("token")})
			.end(function(error, response) {
				if (response.body) {
					if (response.status == 200 && !response.body.erro) {
						dispatch({type: ADD_NEW_USER, payload: response.body})
					} else {
						dispatch({type: REQUEST_ERROR, payload: response.body.erro})
					}
				} else {
					dispatch({type: ERR_CONNECTION_REFUSED, payload: error})
				}
			})
	}
}

export function closeMessageError() {
    return {
        type: CLOSE_MESSAGE_ERROR,
        payload: "closemessage"
    }
}

export function loadingCadastro() {
    return {
        type: LOADING_CADASTRO,
        payload: "loading"
    }
}

export function getGruposCadastro(maxResult) {
	let url = URL_GET_GRUPOS_CADASTRO

	let search = GET_GROUPS_CADASTRO
	let data = `?maxResult=${maxResult}`

	return (dispatch) => {
		apiGetWithKeySession(dispatch, url, data, search)
	}
}

export function getUsersCadastro() {
	let url = URL_GET_USERS_CADASTRO

	let search = GET_USERS_CADASTRO
	let data = ""

	return (dispatch) => {
		apiGetWithKeySession(dispatch, url, data, search)
	}
}

export function getConsultasGrupo(grupoId) {
    return {
        type: GET_CONSULTAS_GRUPO,
        payload: grupoId
    }
}

export function getPermissoesUser(userId) {
    return {
        type: GET_PERMISSOES_USER,
        payload: userId
    }
}

export function getUsersByGroupId(groupId, groupDescription) {
	let url = URL_GET_USERS_BY_GROUP_ID

	let search = GET_USERS_BY_GROUP_ID
	let data = groupId ? ("?usuario.grupoUsuarioVO.id=" + groupId) : ("?usuario.usuario=" + groupDescription)

	return (dispatch) => {
		apiGetWithKeySession(dispatch, url, data, search)
	}
}
