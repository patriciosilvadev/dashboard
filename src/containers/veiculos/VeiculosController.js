import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { Alert, Col, Form, FormGroup, Tabs, Tab, } from "react-bootstrap";

import VeiculosView from "./VeiculosView";
import MyForm from "../../components/forms/Form";
import MyButton from "../../components/button/MyButton";
import UltimasConsultas from "../../components/UltimasConsultas";
import Titletab from "../../components/utils/Titletab";
import Panel from "../../components/panel/Panel";
import { VeiculoslDescription } from "../../components/ProductDescription";
import { FieldGroup, MyCheckboxGroup, SelectGroup } from "../../components/forms/CommonForms";

import {
		changeTab,
		closeMessageErrorVeiculos,
		closeModel,
		closeTab,
		getLastQueries,
		loadingVeiculos,
		searchByVeiculos,
		seeModel
} from "../../actions/actionsVeiculos";
import { changeProductType } from "../../actions/actionsCommon";

import { LOGO_VEICULOS, ICON_VEICULOS, LOADING_GIF, TOOLTIP_SEARCH_BY_DOCUMENT_MESSAGE, TOOLTIP_SEE_PRODUCT_MODEL_MESSAGE, TOOLTIP_SEE_PRODUCT_DETAILS_MESSAGE } from "../../constants/utils";
import { COMPANY_NAME_SHORT, COMPANY_PRODUCT_VEICULOS, COMPANY_PRODUCT_VEICULOS_LABEL } from "../../constants/constantsCompany";
import { AGREGADOS_CODE, BDV_CODE, DECODIFICADOR_CODE, LOCALIZACAO_CODE, PROPRIETARIOS_CODE, LEILAO_CODE, SINISTRO_CODE } from "../../constants/constantsVeiculos";

import menu from "../../components/utils/common/menu.json";
import estados from "../../components/utils/common/estados.json";
import { todosProdutos } from "../../components/utils/common/produtos.js";

const produtoInformacoes = todosProdutos[COMPANY_PRODUCT_VEICULOS_LABEL];
const quantidadeCheckboxPorCol = 5;

class VeiculosController extends Component {
	state = {
		input: {
			localizaVeiculo: false,
			crlv: false,
			binFederal: false,
			binEstadual: false,
			gravame: false,
			decodificadorChassi: false,
			precificador: false,
			binRF: false,
			binRenajud: false,
			proprietariosAnteriores: false,
			agregados: false,
			localizaPlaca: false,
			leilao: false,
			indicioSinistro: false,
			leilao2: false,
			pt: false,
			renavam: false,
			decodificador2: false,
			decodificadorUnion: false
		},
		showMessageErrorWhenNotSelectedAnyCheckBox: false,
		showCheckboxes: true,
		optionsSelected: [],
		options:[
			{
				inline: false,
				checked: false,
				name: "binEstadual",
				text: "BIN ESTADUAL"
			},
			{
				inline: false,
				checked: false,
				name: "binFederal",
				text: "BIN FEDERAL"
			},
			{
				inline: false,
				checked: false,
				name: "binRF",
				text: "BIN FEDERAL + ROUBO E FURTO"
			},
			{
				inline: false,
				checked: false,
				name: "binRenajud",
				text: "BIN JUDICIAL RENAJUD"
			},
			{
				inline: false,
				checked: false,
				name: "decodificadorUnion",
				text: "DECODIFICADOR UNION"
			},
			{
				inline: false,
				checked: false,
				name: "leilao2",
				text: "LEILÃO 2"
			},
			{
				inline: false,
				checked: false,
				name: "leilao",
				text: "VEICULOS OFERTADOS A LEILÃO"
			},
			{
				inline: false,
				checked: false,
				name: "pt",
				text: "SINISTRO IRRECUPERÁVEL PT"
			},
			{
				inline: false,
				checked: false,
				name: "gravame",
				text: "GRAVAME - DETALHES DO FINANCIAMENTO"
			},
			{
				inline: false,
				checked: false,
				name: "decodificadorChassi",
				text: "DECODIFICADOR DE CHASSI"
			},
			{
				inline: false,
				checked: false,
				name: "agregados",
				text: "AGREGADO VEICULAR"
			},
			{
				inline: false,
				checked: false,
				name: "proprietariosAnteriores",
				text: "HISTÓRICO DE PROPRIETÁRIOS ANTERIORES"
			},
			{
				inline: false,
				checked: false,
				name: "localizaVeiculo",
				text: "LOCALIZADOR DE CHASSI E MOTOR"
			},
			{
				inline: false,
				checked: false,
				name: "crlv",
				text: "CONSULTA CRLV - DOCUMENTO"
			},
			{
				inline: false,
				checked: false,
				name: "localizaPlaca",
				text: "LOCALIZADOR DE PLACA"
			},
			{
				inline: false,
				checked: false,
				name: "precificador",
				text: "PRECIFICADOR"
			},
			{
				inline: false,
				checked: false,
				name: "indicioSinistro",
				text: "INDICIO DE SINISTRO"
			},
			{
				inline: false,
				checked: false,
				name: "motor",
				text: "LOCALIZADOR DE MOTOR"
			},
			{
				inline: false,
				checked: false,
				name: "decodificador2",
				text: "DECODIFICADOR DE CHASSI - FIPE E MOLICAR"
			}
		]
	}

	componentDidMount() {
		document.title = COMPANY_PRODUCT_VEICULOS + " > " + COMPANY_NAME_SHORT;
	}

	onChangeCheckBox = (name,index) => {
		let options = this.state.options.concat();
		let optionsSelected = this.state.optionsSelected.concat();
		let input = Object.assign({}, this.state.input);
		let pos = 0;

		for(let i=index; i<options.length; i+=quantidadeCheckboxPorCol) {
			if(options[i].name == name) {
				pos = i;
				i = options.length;
			}
		}

		options[pos].checked = !options[pos].checked;

		let posArrayOptionsSelected = optionsSelected.indexOf(options[pos].name);
		if(posArrayOptionsSelected === -1) {
			input[options[pos].name] = true;
			optionsSelected.push(options[pos].name);
		}
		else {
			input[options[pos].name] = false;
			optionsSelected.splice(posArrayOptionsSelected, 1);
		}

		this.setState({options, optionsSelected, input});
	}
	
	onChangeType = (evt) => {
		this.props.changeProductType(COMPANY_PRODUCT_VEICULOS_LABEL, evt.target.value);
	}

	onChangeInput = (evt) => {
		let input = Object.assign({}, this.state.input);
		input[evt.target.name.toLowerCase()] = evt.target.value;

		this.setState({ input })

	}

	onCloseTab = (index) => {
		if(this.props.datas.length === 1)
			this.setState({
				showCheckboxes: true
			});
		
		this.props.closeTab(index);
	}

	onFormSubmit = (evt) => {
		evt.preventDefault();
		let optionsSelected = this.state.optionsSelected;

		if(optionsSelected.length === 0) {
			this.setState({
				showMessageErrorWhenNotSelectedAnyCheckBox: true
			})
		} else {
			this.setState({
				showCheckboxes: false
			})

			/**(tipoInput, input, dataToSend, flagsSelected) */
			this.props.searchByVeiculos(this.props.type, this.state.input[this.props.type.toLowerCase()], this.state.input, this.state.optionsSelected);
		}
	}

	renderCheckboxes = () => {
		let options = this.state.options;
		let showCheckboxes = this.state.showCheckboxes;
		
		if(showCheckboxes) {
			return (
				<span>
					{this.state.showMessageErrorWhenNotSelectedAnyCheckBox ?
						<Col md={12}>
							<Alert bsStyle="danger" className="text-center" onDismiss={() => this.setState({
								showMessageErrorWhenNotSelectedAnyCheckBox:false
							})}>
								Selecione ao menos uma opção no checkbox
							</Alert>
						</Col>
					: ""}

					<Col md={3} sm={6}>
						<MyCheckboxGroup
							options={options.slice(0,5)}
							onChange={this.onChangeCheckBox}
						/>
					</Col>
					<Col md={3} sm={6}>
						<MyCheckboxGroup
							options={options.slice(5,10)}
							onChange={this.onChangeCheckBox}
						/>
					</Col>
					<Col md={3} sm={6}>
						<MyCheckboxGroup
							options={options.slice(10,15)}
							onChange={this.onChangeCheckBox}
						/>
					</Col>
					<Col md={3} sm={6}>
						<MyCheckboxGroup
							options={options.slice(15,20)}
							onChange={this.onChangeCheckBox}
						/>
					</Col>
				</span>
			)
		} else {
			return (
				<Col md={12}  className="text-center">
					<a href="#" onClick={() => this.setState({showCheckboxes: true})}>Exibir filtros da busca</a>
				</Col>
			)
		}
	}

	form = (tipo) => {
		return (
			<Panel>
				<Col md={12}>
					<MyForm
						logo = {LOGO_VEICULOS}
						showLogo = {false}
						onformSubmit = {this.onFormSubmit}
						closeMessageError = {this.props.closeMessageErrorVeiculos}
						options={produtoInformacoes.subItems}
						onChange={this.onChangeType}
						type={this.props.type}
						seeModelo = {this.seeModelSearch}
						status = {this.props.status}
						message = {this.props.message}
						lastQueries = {this.props.lastQueries[this.props.type]}
						moreInfoToShow={this.renderCheckboxes(this.state.options)}
					>

						{this.renderForm()}
						
					</MyForm>
				</Col>
			</Panel>
		)
	}

	renderForm = () => {
		let type = this.props.type;
		return (
			<Col md={7}>
				<FieldGroup
					id={type}
					type="text"
					name={type}
					value={this.state.input[type]}
					onChange={this.onChangeInput}
					required
					placeholder={"DIGITE: " + type} />
			</Col>

		)
	}

	seeModelSearch = () => {
		this.setState({
			showCheckboxes: false
		})

		this.props.seeModel();
	}

	render() {
		let datas = this.props.datas;
		return (
			<div className="container my-container">
				{this.form(this.props.type)}

				<div style={{marginBottom:15}} />

                {datas.length === 0 ?
					<span>
						<VeiculoslDescription />
						<div style={{marginBottom:15}} />
                        <UltimasConsultas
                            consultas={this.props.lastQueries}
                            type={this.props.type} />
					</span>
                :
						<Tabs
							activeKey={this.props.tabActive}
							onSelect={(key) => {this.props.changeTab(key)}}
							id="uncontrolled-tab-example"
						>
							{this.props.datas.map((data, index) => {
								return (
									<Tab
										animation={true}
										eventKey={data.label}
										title={
											<Titletab
												icon={data.icon}
												label={data.label.length > 20 ? data.label.substring(0,20)+"..." : data.label}
												close={() => this.onCloseTab(index)}
											/>
										}
										key={index}
									>
										<VeiculosView
											data={data.data}
											tipo={data.tipo}
											index={index}
											searchPerson={this.searchLocalize}/>

									</Tab>
								)
							})}
						</Tabs>
					
				}
				
			</div>
		);
	}
}

function mapStateToProps(state) {
	return {
		datas: state.veiculos.response,
		status: state.veiculos.status,
		message: state.veiculos.message,
		loading: state.veiculos.loading,
		tabActive: state.veiculos.tabActive,
		lastQueries: state.veiculos.lastQueries,
		type: state.veiculos.type
	}
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators({
		changeProductType,
		changeTab,
		closeMessageErrorVeiculos,
		closeModel,
		closeTab,
		getLastQueries,
		loadingVeiculos,
		searchByVeiculos,
		seeModel
	}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(VeiculosController);