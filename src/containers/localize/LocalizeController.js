import React, { Component } from "react";
import {
		loadingLocalize,
		searchLocalize,
		searchLocalizeByParams,
		searchTelefonesRelacionados,
		searchPessoasRelacionadas,
		searchEnderecosRelacionados,
		searchEmailsRelacionados,
		seeModel,
		closeModel,
		getEstados } from "../../actions/index";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import LocalizeView from "./LocalizeView";

import Form from "../../components/Form";
import Tabs from "../../components/Tabs";
import TabContent from "../../components/TabContent";
import TabPane from "../../components/TabPane";

import { LOGO_LOCALIZE, ICON_LOCALIZE } from "../../constants/constantsLocalize";

class LocalizeController extends Component {
	constructor(props) {
		super(props);

		this.state = {
			documento: "",
			telefone: "",
			nome: "",
			endereco: "",
			estado: "",
			cidade: "",
			bairro: "",
			tabActive: "",
			tipo: ""
		}

		this.onLocalizeSubmit = this.onLocalizeSubmit.bind(this);
		this.searchLocalize = this.searchLocalize.bind(this);
		this.searchPessoasRelacionadas = this.searchPessoasRelacionadas.bind(this);
		this._showTelefonesRelacionados = this._showTelefonesRelacionados.bind(this);
		this._showEnderecosRelacionados = this._showEnderecosRelacionados.bind(this);
		this._showEmailsRelacionados = this._showEmailsRelacionados.bind(this);
		this.onChange = this.onChange.bind(this);
		this._changeTab = this._changeTab.bind(this);
		this.form = this.form.bind(this);
	}

	componentWillMount() {
		this.props.getEstados()
	}

	componentDidMount() {
		document.title = "Assertiva > Localize";
	}

	searchPessoasRelacionadas(doc) {
		this.props.loadingLocalize();
		this.props.searchPessoasRelacionadas(doc);
	}

	searchLocalize(doc, tipo) {
		this.props.loadingLocalize();
		this.props.searchLocalize(doc, tipo);
	}

	onLocalizeSubmit(evt) {
		evt.preventDefault();

		this.props.loadingLocalize();

		let tipo = this.state.tipo ? this.state.tipo :  location.pathname.split("/")[3].toUpperCase();

		if(tipo == "CPF" || tipo == "CNPJ") {
			let searchBy = "pf";
			if(tipo == "CNPJ")
				searchBy = "pj";
			
			this.props.searchLocalize(this.state.documento, searchBy);
		} else {
			const params = {
				telefone: this.state.telefone,
				nome: this.state.nome,
				endereco: this.state.endereco,
				estado: this.state.estado,
				cidade: this.state.cidade,
				bairro: this.state.bairro,
				
			}
			this.props.searchLocalizeByParams(params, tipo);
		}

		this.setState({
			documento: "",
			telefone: "",
			nome: "",
			endereco: "",
			estado: "",
			cidade: "",
			bairro: "",
			tabActive: "",
			tipo: ""
		});

	}

	_changeTab(tab) {
		this.setState({
			tabActive: tab
		})
	}

	_showTelefonesRelacionados(doc, docTelefone) {
		this.props.searchTelefonesRelacionados(doc, docTelefone);
	}
	
	_showEnderecosRelacionados(doc) {
		this.props.searchEnderecosRelacionados(doc);
	}

	_showEmailsRelacionados(doc) {
		this.props.searchEmailsRelacionados(doc);
	}

	onChange(evt) {
		this.setState({
			[evt.target.name]: evt.target.value
		})
	}

	renderForm() {
		return (
			<Form
				options = {["CPF", "CNPJ", "TELEFONE", "NOME", "ENDERECO"]}
				optionSelected = {location.pathname.split("/")[3].toUpperCase()}
				tipo = {this.state.tipo}
				icon = {ICON_LOCALIZE}
				logo = {LOGO_LOCALIZE}
				datas = {this.props.datas}
				onChange = {this.onChange}
				onformSubmit = {this.onLocalizeSubmit}
				seeModelo = {this.props.seeModel}
				closeModelo = {this.props.closeModel}
				status = {this.props.status}
				message = {this.props.message} >
				
				<input
					value={this.state.documento}
					type="text"
					className="form-control input-search "
					placeholder="Digite o documento"
					name="documento"
					required
					style={{width:320, display:"inline-block"}}
					onChange={this.onChange} />

			</Form>
		)
	}

	renderFormTelefone() {
		return (
			<Form
				options = {["CPF", "CNPJ", "TELEFONE", "NOME", "ENDERECO"]}
				optionSelected = {location.pathname.split("/")[3].toUpperCase()}
				tipo = {this.state.tipo}
				icon = {ICON_LOCALIZE}
				logo = {LOGO_LOCALIZE}
				datas = {this.props.datas}
				onChange = {this.onChange}
				onformSubmit = {this.onLocalizeSubmit}
				seeModelo = {this.props.seeModel}
				closeModelo = {this.props.closeModel}
				status = {this.props.status}
				message = {this.props.message} >
				
				<input
					value={this.state.telefone}
					type="number"
					className="form-control input-search "
					placeholder="Digite o DD e o número"
					name="telefone"
					size="10"
					required
					style={{width:320, display:"inline-block"}}
					onChange={this.onChange} />

			</Form>
		)
	}

	renderFormNomeEndereco(formType) {
		return (
			<Form
				options = {["CPF", "CNPJ", "TELEFONE", "NOME", "ENDERECO"]}
				optionSelected = {location.pathname.split("/")[3].toUpperCase()}
				tipo = {this.state.tipo}
				icon = {ICON_LOCALIZE}
				logo = {LOGO_LOCALIZE}
				datas = {this.props.datas}
				onChange = {this.onChange}
				onformSubmit = {this.onLocalizeSubmit}
				seeModelo = {this.props.seeModel}
				closeModelo = {this.props.closeModel}
				status = {this.props.status}
				message = {this.props.message} >
				
				<input
					value={formType == "nome" ? this.state.nome : this.state.endereco}
					type="text"
					className="form-control"
					placeholder={"Digite o " + formType}
					name={formType}
					size="10"
					required
					style={{width:445, display:"inline-block"}}
					onChange={this.onChange} />

				<select
					className="form-control  input-search"
					name="estado"
					value={this.state.estado}
					onChange={this.onChange}
					style={{width:120}}>
					<option value="">Selecione</option>
					{this.props.estados.map((estado, index) => {
						return <option value={estado.sigla} key={index}>{estado.nome}</option>
					})}
				</select>

				<input
					value={this.state.cidade}
					type="text"
					className="form-control input-search"
					placeholder="Cidade"
					name="cidade"
					style={{width:220, display:"inline-block"}}
					onChange={this.onChange} />

				<input
					value={this.state.bairro}
					type="text"
					className="form-control"
					placeholder="Bairro"
					name="bairro"
					style={{width:215, display:"inline-block"}}
					onChange={this.onChange} />

				<input
					value={formType == "nome" ? this.state.endereco : this.state.nome}
					type="text"
					className="form-control input-search"
					placeholder={formType == "nome" ? "Endereço": "Nome"}
					name={formType == "nome" ? "endereco": "nome"}
					style={{width:425, display:"inline-block"}}
					onChange={this.onChange} />

			</Form>
		)
	}

	form() {
		let pathTipo = location.pathname.split("/")[3].toUpperCase();
		let tipo = this.state.tipo;

		if(!tipo) {
			tipo = pathTipo;
		}

		return (
			pathTipo || tipo ?
				tipo == "CPF" || tipo == "CNPJ" ? 
					this.renderForm()
				: tipo == "NOME" ? 
					this.renderFormNomeEndereco("nome")
					: tipo == "TELEFONE" ?
					this.renderFormTelefone()
					: this.renderFormNomeEndereco("endereco")
			: this.renderForm()
		)
	}

	render() {
		return(
			<div className="container">
				{this.form()}

				{this.props.loading ? <div className="imgSearching"><img src="../../../public/loading.gif" /></div> : ""}

				{this.props.datas.length == 0 ? "" : 
					(<div>
						
						<Tabs tabs={this.props.datas}
							  onChangeTab={this._changeTab}
							  tabActive={this.state.tabActive} />
							
						<TabContent>
							{this.props.datas.map((data, index) => {
								console.log("LOCALIZE", data);
								return (
									<TabPane 
										tabActive={this.state.tabActive}
										label={data.label}
										index={index}
										key={index} >

										{/*Verifica se o produto pesquisado é localize, pois pode ser gerado abas de outros produtos no Localize*/}
										{data.produto == "localize" ?
											<LocalizeView
												data={data}
												searchLocalize={this.searchLocalize}
												showPessoasRelacionadas={this._showPessoasRelacionadas}
												showTelefonesRelacionados={this._showTelefonesRelacionados}
												pessoasRelacionadas={this.searchPessoasRelacionadas}
												showEnderecosRelacionados={this._showEnderecosRelacionados}/>
										
										: ""}

									</TabPane>
								)
							})}
						</TabContent>
						
					</div>)}

			</div>
		)
	}
}

function mapStateToProps(state) {
	return {
		datas: state.localize.response,
		status: state.localize.status,
		message: state.localize.message,
		estados: state.estados,
		loading: state.localize.loading
	}
}

function mapDispatchToProps(dispacth) {
	return bindActionCreators({
			loadingLocalize,
			searchLocalize,
			searchLocalizeByParams,
			searchPessoasRelacionadas,
			searchTelefonesRelacionados,
			searchEnderecosRelacionados,
			searchEmailsRelacionados,
			seeModel,
			closeModel,
			getEstados
		},
		dispacth);
}

export default connect(mapStateToProps, mapDispatchToProps)(LocalizeController);