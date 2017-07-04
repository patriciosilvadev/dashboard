import * as constants from "../constants/constantsRelatorios"
import {
		CHANGE_LOCALIZE_TYPE,
		CHANGE_TAB,
		CLOSE_TAB,
		ERR_CONNECTION_REFUSED,
		ERR_CONNECTION_REFUSED_MESSAGE,
		ERROR_503,
		LAST_QUERIES,
		LOADING,
		NENHUM_REGISTRO,
		REQUEST_ERROR,
		SUCCESS
} from "../constants/utils"

const getInitialState = {
    relatorios: [],
    relatoriosR12: []
}

export default function(state=getInitialState, action) {
    switch(action.type) {
        case constants.GET_RELATORIOS: {
            return {
                relatorios: [
                    {id:6, tipo:"R6", descricao:"Consultas de Localize, Crédito, Veículos e Foco Fiscal"},
                    {id:7, tipo:"R7", descricao:"Envio de SMS"},
                    {id:8, tipo:"R8", descricao:"Consumo do Base Certa"},
                    {id:9, tipo:"R9", descricao:"Consumo total de todos os produtos"},
                    {id:12, tipo:"R12", descricao:"Consultas de Localize, Crédito e Veículos em tela"}
                ],
                relatoriosR12: state.relatorios,
                status: "",
                message: "",
                loading: false
            }
        }

        case constants.FILTER_RELATORIO: {
            return {
                relatorios: state.relatorios,
                relatoriosR12: state.relatorios,
                status: "",
                message: "",
                loading: false
            }
        }

        case constants.FILTER_RELATORIO_R12: {
            return {
                relatorios: state.relatorios,
                relatoriosR12: JSON.parse(action.payload.response.response),
                status: "",
                message: "",
                loading: false
            }
        }

        case constants.LOADING_RELATORIO: {
            return {
                relatorios: state.relatorios,
                relatoriosR12: state.relatorios,
                status: "",
                message: "",
                loading: true
            }
        }

        case ERR_CONNECTION_REFUSED:
            return {
                relatorios: state.relatorios,
                relatoriosR12: state.relatorios,
                status: ERR_CONNECTION_REFUSED,
                message: ERROR_503,
                loading: false
            }

        case REQUEST_ERROR:
            return {
                relatorios: state.relatorios,
                relatoriosR12: state.relatorios,
                status: REQUEST_ERROR,
                message: action.payload.mensagem,
                loading: false
            }   
    }

    return state;
}