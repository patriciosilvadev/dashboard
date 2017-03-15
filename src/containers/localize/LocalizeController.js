import React, { Component } from "react";
import { changeProductType } from "../../actions/actionsCommon";
import {
		getLastQueries,
		loadingLocalize,
		searchLocalize,
		searchLocalizeByTelefone,
		searchLocalizeByEmail,
		searchLocalizeByParams,
		searchPessoasRelacionadas,
		searchTelefonesPessoaRelacionada,
		searchEnderecosPessoaRelacionada,
		seeModel,
		closeModel,
		closeTab,
		changeTab,
		closeMessageErrorLocalize
} from "../../actions/index";

import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { Tabs, Tab, Form, FormGroup, FormControl, InputGroup, ControlLabel, Checkbox, Col} from "react-bootstrap";

import BuscaPorRelacionados from "../../components/relacionados/BuscaPorRelacionados";
import Protocolo from "../../components/protocolo/Protocolo";
import LocalizeViewPattern from "./LocalizeViewPattern";
import CreditoView from "../credito/CreditoView";

import MyForm from "../../components/forms/Form";
import Titletab from "../../components/utils/Titletab";

import { LOGO_LOCALIZE, ICON_LOCALIZE, LOADING_GIF } from "../../constants/utils";

import estados from "../../components/utils/common/estados.json";
import menu from "../../components/utils/common/menu.json";
import tiposLogradouro from "../../components/utils/common/tiposLogradouro.json";

class LocalizeController extends Component {

	state = {
		localizeInput: {
			documento: "",
			telefone: "",
			email: "",
			nome: "",
			dataNascimento: "",
			sexo: "",
			estado: "",
			cidade: "",
			bairro: "",
			complemento: "",
			endereco: "",
			cep: "",
			numeroInicial: "",
			numeroFinal: "",
		},
		buscaAvancada: false
	}

	componentWillMount() {
		this.props.getLastQueries();
	}

	componentDidMount() {
		document.title = "Localize > Assertiva";
	}

	//busca as pessoas relacionadas a este doc, tipo é CPF ou CNPJ
	searchPessoasRelacionadas = (doc) => {
		this.props.loadingLocalize();
		this.props.searchPessoasRelacionadas(doc);
	}

	//recebe o documento da pessoa e da pessoa relacionada a esta e
	//irá buscar pelo telefone ou endereço da pessoa
	searchTelefonesPessoaRelacionada = (documento, docPessoaRelacionado) => {
		this.props.loadingLocalize();
		this.props.searchTelefonesPessoaRelacionada(documento, docPessoaRelacionado);
	}

	//recebe o documento da pessoa e da pessoa relacionada a esta e
	//irá buscar pelo telefone ou endereço da pessoa
	searchEnderecosPessoaRelacionada = (documento, docPessoaRelacionado) => {
		this.props.loadingLocalize();
		this.props.searchEnderecosPessoaRelacionada(documento, docPessoaRelacionado);
	}

	searchLocalize = (doc, tipo) => {
		this.props.loadingLocalize();
		this.props.searchLocalize(doc, tipo);
	}

	onFormSubmit = (evt) => {
		evt.preventDefault();

		this.props.loadingLocalize();

		if(this.props.type == "CPF" || this.props.type == "CNPJ") {
			let searchBy = "pf";
			if(this.props.type == "CNPJ")
				searchBy = "pj";
			
			this.props.searchLocalize(this.state.localizeInput.documento, searchBy);
		} else if(this.props.type == "EMAIL") {
			this.props.searchLocalizeByEmail(this.state.localizeInput.email)
		} else if(this.props.type == "TELEFONE") {
			this.props.searchLocalizeByTelefone(this.state.localizeInput.telefone)
		} else if(this.state.localizeInput.endereco) {
			console.log("ENDERE",this.state.localizeInput.endereco)
			
			this.props.searchLocalizeByParams(this.state.localizeInput, this.props.type);
		}

		this.setState({
			localizeInput: {
				documento: "",
				telefone: "",
				email: "",
				nome: "",
				dataNascimento: "",
				sexo: "",
				estado: "",
				cidade: "",
				bairro: "",
				complemento: "",
				enderecoCep: "",
				numeroInicial: "",
				numeroFinal: "",
			},
		});
	}

	onChangeType = (evt) => {
		this.props.changeProductType("localize", evt.target.value)
	}

	onChange = (evt) => {
		this.setState({
			[evt.target.name]: evt.target.value
		})
	}

	onChangeInput = (evt) => {
		let newStateLocalize = this.state.localizeInput;
		newStateLocalize[evt.target.name] = evt.target.value
		this.setState({
			localize: newStateLocalize
		})
	}

	hiddenBuscaAvancada = () => {
		this.setState({
			buscaAvancada: !this.state.buscaAvancada
		})
	}

	closeTab = (index) => {
		{/*Fecha as abas, quando sobrar um chama a funcao para fechar tudo (closeModel)*/}
		if(this.props.datas.length > 1) {
			this.props.closeTab(index);
		} else {
			this.props.closeModel();
		}
	}

	renderForm = () => {
		return (
			<span>
				<Col md={8}>
					<input
						className="form-control"
						type={
							this.props.type == "TELEFONE" ?
								"number"
								: this.props.type == "EMAIL" ?
									"email"
							: "text"
						}
						placeholder={
							this.props.type == "TELEFONE" ?
								"Digite o telefone"
								: this.props.type == "EMAIL" ?
									"Digite o email"
							: "Digite o documento"
						}
						value={
							this.props.type == "TELEFONE" ?
								this.state.localizeInput.telefone
								: this.props.type == "EMAIL" ?
									this.state.localizeInput.email
							: this.state.localizeInput.documento
						}
						name={
							this.props.type == "TELEFONE" ?
								"telefone"
								: this.props.type == "EMAIL" ?
									"email"
							: "documento"
						}
						onChange={this.onChangeInput}
					/>
				</Col>
			</span>
		)
	}

	renderFormEndereco = () => {
		return (
			<span>
				<Col md={10}>
					<input
						className="form-control"
						type="text"
						name="endereco"
						onChange={this.onChangeInput}
						value={this.state.localizeInput.endereco}
						placeholder="Endereço ou CEP"
						required
					/>
				</Col>

				<Col md={7}>
					<input
						className="form-control"
						type="text"
						name="complemento"
						onChange={this.onChangeInput}
						value={this.state.localizeInput.complemento}
						placeholder="Complemento"
					/>
				</Col>
				<Col md={3}>
					<input
						className="form-control"
						type="number"
						name="numeroInicial"
						onChange={this.onChangeInput}
						value={this.state.localizeInput.numeroInicial}
						placeholder="Nº inicial"
					/>
				</Col>
				<Col md={2}>
					<input
						className="form-control"
						type="number"
						name="numeroFinal"
						onChange={this.onChangeInput}
						value={this.state.localizeInput.numeroFinal}
						placeholder="Nº final"
					/>
				</Col>

				<Col md={2}>
					<select
						className="form-control"
						name="estado"
						onChange={this.onChangeInput}
						value={this.state.localizeInput.estado}
					>
						<option value="">Selecione UF</option>
						{estados.estados.map((estado,i) => {
							return <option value={estado.sigla} key={i}>{estado.sigla}</option>
						})}
					</select>
				</Col>
				<Col md={5}>
					<input
						className="form-control"
						type="text"
						name="cidade"
						value={this.state.localizeInput.cidade}
						onChange={this.onChangeInput}
						placeholder="Digite o nome da cidade (sem abreviação)"
					/>
				</Col>
				<Col md={this.state.buscaAvancada ? 5 : 3}>
					<input
						className="form-control"
						type="text"
						name="bairro"
						value={this.state.localizeInput.bairro}
						onChange={this.onChangeInput}
						placeholder="Digite o nome do bairro"
					/>
				</Col>

				{/*Input da busca avançada*/}
				{this.state.buscaAvancada ?
					<Col md={7}>
						<input
							className="form-control"
							name="nome"
							value={this.state.localizeInput.nome}
							onChange={this.onChangeInput}
							type="text"
							placeholder="Digite o Nome" />
					</Col>
				: ""}

				{this.state.buscaAvancada ?
					<Col md={2}>
						<input
							className="form-control"
							type="date"
							name="dataNascimento"
							value={this.state.localizeInput.dataNascimento}
							onChange={this.onChangeInput}
						/>
					</Col>
				: ""}

				{this.state.buscaAvancada ?
					<Col md={1}>
						<select
							className="form-control"
							name="sexo"
							onChange={this.onChangeInput}
							value={this.state.localizeInput.sexo}
						>
							<option value="">Sexo</option>
							<option value="M">M</option>
							<option value="F">F</option>
						</select>
					</Col>
				: ""}
			
			</span>
		)
	}

	renderFormNome = () => {
		return (
			<span>
				<Col md={6}>
					<input
						className="form-control"
						name="nome"
						value={this.state.localizeInput.nome}
						onChange={this.onChangeInput}
						type="text"
						placeholder="Digite o Nome (sem abreviação)"
						required
					/>
				</Col>
				<Col md={2}>
					<input
						className="form-control"
						type="date"
						name="dataNascimento"
						value={this.state.localizeInput.dataNascimento}
						onChange={this.onChangeInput}
					/>
				</Col>
				<Col md={2}>
					<select
						className="form-control"
						name="sexo"
						onChange={this.onChangeInput}
						value={this.state.localizeInput.sexo}
					>
						<option value="">Sexo</option>
						<option value="M">M</option>
						<option value="F">F</option>
					</select>
				</Col>

				<Col md={2}>
					<select
						className="form-control"
						name="estado"
						onChange={this.onChangeInput}
						value={this.state.localizeInput.estado}
					>
						<option value="">Selecione UF</option>
						{estados.estados.map((estado,i) => {
							return <option value={estado.sigla} key={i}>{estado.sigla}</option>
						})}
					</select>
				</Col>
				<Col md={this.state.buscaAvancada ? 6 : 5}>
					<input 
						className="form-control"
						type="text"
						name="cidade"
						onChange={this.onChangeInput}
						value={this.state.localizeInput.cidade}
						placeholder="Digite o nome da cidade (sem abreviação)"
					
					/>
				</Col>
				<Col md={this.state.buscaAvancada ? 4 : 3}>
					<input
						className="form-control"
						type="text"
						name="bairro"
						onChange={this.onChangeInput}
						value={this.state.localizeInput.bairro}
						placeholder="Digite o nome do bairro"
					/>
				</Col>

				{/*Input da busca avançada*/}
				{this.state.buscaAvancada ?
					<Col md={2}>
						<input
							className="form-control"
							type="text"
							name="complemento"
							onChange={this.onChangeInput}
							value={this.state.localizeInput.complemento}
							placeholder="Complemento"
						/>
					</Col>
				: ""}

				{this.state.buscaAvancada ?
					<Col md={4}>
						<input
							className="form-control"
							name="enderecoCep"
							onChange={this.onChangeInput}
							value={this.state.localizeInput.enderecoCep}
							type="text"
							placeholder="Endereço ou CEP" />
					</Col>
				: ""}

				{this.state.buscaAvancada ?
					<Col md={2}>
						<input
							className="form-control"
							type="number"
							name="numeroInicial"
							onChange={this.onChangeInput}
							value={this.state.localizeInput.numeroInicial}
							placeholder="Nº inicial" />
					</Col>
				: ""}
					
				{this.state.buscaAvancada ?
					<Col md={2}>
						<input
							className="form-control"
							type="number"
							name="numeroFinal"
							onChange={this.onChangeInput}
							value={this.state.localizeInput.numeroFinal}
							placeholder="Nº final"
						/>
					</Col>
				: ""}

			</span>
		)
	}

	form = (tipo) => {
		return (
			<MyForm
				icon = {ICON_LOCALIZE}
				logo = {LOGO_LOCALIZE}
				showLogo = {this.props.datas.length == 0 ? true : false}
				onformSubmit = {this.onFormSubmit}
				closeMessageErrorLocalize = {this.props.closeMessageErrorLocalize}
				buscaAvancada={tipo == "NOME" || tipo == "ENDERECO" ? this.state.buscaAvancada : undefined}
				hiddenBuscaAvancada={tipo == "NOME" || tipo == "ENDERECO" ? this.hiddenBuscaAvancada : undefined}
				options={menu.sidebar[0].subItems}
				onChange={this.onChangeType}
                type={this.props.type}
				seeModelo = {this.props.seeModel}
				status = {this.props.status}
				message = {this.props.message}
				lastQueries = {this.props.lastQueries}
			>
				{tipo ?
					tipo == "CPF" || tipo == "CNPJ" ? 
						this.renderForm()
					: tipo == "NOME" ? 
						this.renderFormNome()
						: tipo == "TELEFONE" ?
							this.renderForm()
						: tipo == "EMAIL" ?
							this.renderForm()
						: this.renderFormEndereco()
					: this.renderForm()
				}
			</MyForm>
		)
	}

	render() {
		return(
			<div className="container">
				{this.form(this.props.type)}

				{this.props.loading ? <div className="imgSearching"><img src={LOADING_GIF} /></div> : ""}

				{this.props.datas.length > 0 ? 
					(
						<Tabs
							activeKey={this.props.tabActive}
							onSelect={(key) => {this.props.changeTab(key)}}
							animation={false}
							id="uncontrolled-tab-example"
						>
							{this.props.datas.map((data, index) => {
								return (
									<Tab
										eventKey={data.label}
										title={
											<Titletab
												icon={data.icon}
												label={data.label}
												tipo={data.tipo}
												close={() => this.closeTab(index)}
											/>
										}
										key={index}
									>
										{console.log("DATA", data)}
										{/*Verifica se o produto pesquisado é localize, pois pode ser gerado abas de outros produtos no Localize*/}
										{data.produto == "localize" ?
											<LocalizeViewPattern
												data={data.data}
												tipo={data.tipo}
												index={index}
												searchLocalize={this.searchLocalize}
												searchPessoasRelacionadas={this.searchPessoasRelacionadas}
												pessoasRelacionadas={data.pessoasRelacionadas}
												searchTelefonesPessoaRelacionada={this.searchTelefonesPessoaRelacionada}
												searchEnderecosPessoaRelacionada={this.searchEnderecosPessoaRelacionada}/>
										:
										data.produto == "credito" ?
											<CreditoView
												data={data.data}
												tipo={data.tipo}
												index={index}/>
										: 	<span>
												<BuscaPorRelacionados
													relacionados={data.data}
													searchPerson={this.searchLocalize}
												/>
												<Protocolo info={data.data.cabecalho} />
											</span>
										}
									</Tab>
								)
							})}
						</Tabs>
					)
				: ""}
			</div>
		)
	}
}

function mapStateToProps(state) {
	return {
		datas: state.localize.response,
		status: state.localize.status,
		message: state.localize.message,
		loading: state.localize.loading,
		tabActive: state.localize.tabActive,
		lastQueries: state.localize.lastQueries,
		type: state.localize.type
	}
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators({
			changeProductType,
			getLastQueries,
			loadingLocalize,
			searchLocalize,
			searchLocalizeByTelefone,
			searchLocalizeByEmail,
			searchLocalizeByParams,
			searchPessoasRelacionadas,
			searchTelefonesPessoaRelacionada,
			searchEnderecosPessoaRelacionada,
			seeModel,
			closeModel,
			closeTab,
			changeTab,
			closeMessageErrorLocalize
		},
		dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(LocalizeController);