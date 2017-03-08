import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { Col, Form, FormControl, Button, InputGroup, Pagination } from "react-bootstrap";

import { getGruposCadastro, loadingCadastro, getUsersCadastro } from "../../actions/actionsCadastro";

import Modal from "../../components/Modal";
import Panel from "../../components/panel/Panel";
import Table from "../../components/table/Table";

{/*Funções para o Usuario*/}
import EditarUsuario from "./EditarUsuario";
import ConfigurarPermissoes from "./ConfigurarPermissoes";

{/*Funções para o Grupo*/}
import EditarGrupo from "./EditarGrupo";
import NovoUsuario from "./NovoUsuario";
import AtivarConsultas from "./AtivarConsultas";

class Cadastro extends Component {
    constructor() {
        super();

        this.state = {
            usuario: {
                nome: "",
                grupo: ""
            },
            showAdvancedSearch: false,
            showModal: false,
            screenToShow: "",
            screenTitle: "",
            sizeModal: "",
            activePage: 1
        }
    }

    componentWillMount() {
        this.props.loadingCadastro();
        this.props.getGruposCadastro();
        this.props.getUsersCadastro();
    }

    closeModal = () => {
        this.setState({
            showModal: false
        })
    }

    onChangeUser = (evt) => {
        let newUser = this.state.usuario;
        newUser[evt.target.name] = evt.target.value;

        this.setState({
            usuario: newUser
        })
    }

    onFormSubmit = (evt) => {
        evt.preventDefault();

        console.log("SUBMIT FORM", this.state.usuario);
    }

    openModal = (screen, title, size="") => {
        this.setState({
            showModal: true,
            screenToShow: screen,
            screenTitle: title,
            sizeModal: size
        })
    }

    handleSelect = (eventKey) => {
        this.setState({
            activePage: eventKey
        });
    }

    renderForm = () => {
        return (
            <Form onSubmit={this.onFormSubmit} className="my-form">
                <Col md={this.state.showAdvancedSearch ? 12: 10}>
                    <FormControl
                        type="text"
                        placeholder="Digite o nome do usuário"
                        name="nome"
                        value={this.state.usuario.nome}
                        onChange={this.onChangeUser}
                    />
                </Col>
                {this.state.showAdvancedSearch ?
                    <span>
                        <Col md={2}>
                            <FormControl
                                type="text"
                                placeholder="Digite o nome do usuário"
                                name="nome"
                                value={this.state.usuario.nome}
                                onChange={this.onChangeUser}
                            />
                        </Col>
                        <Col md={2}>
                            <FormControl
                                type="text"
                                placeholder="Digite o nome do usuário"
                                name="nome"
                                value={this.state.usuario.nome}
                                onChange={this.onChangeUser}
                            />
                        </Col>
                        <Col md={2}>
                            <FormControl
                                type="text"
                                placeholder="Digite o nome do usuário"
                                name="nome"
                                value={this.state.usuario.nome}
                                onChange={this.onChangeUser}
                            />
                        </Col>
                        <Col md={2}>
                            <FormControl
                                type="text"
                                placeholder="Digite o nome do usuário"
                                name="nome"
                                value={this.state.usuario.nome}
                                onChange={this.onChangeUser}
                            />
                        </Col>
                        <Col md={2}>
                            <FormControl
                                type="text"
                                placeholder="Digite o nome do usuário"
                                name="nome"
                                value={this.state.usuario.nome}
                                onChange={this.onChangeUser}
                            />
                        </Col>
                    </span>
                : ""}
                <Col md={2}>
                    <Button style={{width:"100%"}} bsStyle="info">Pesquisar</Button>
                </Col>
                <Col md={12}>
                    {this.state.showAdvancedSearch ? 
                        <a className="pull-right" onClick={() => this.setState({showAdvancedSearch: !this.state.showAdvancedSearch})}>Fechar busca avançada</a>
                    :   <a className="pull-right" onClick={() => this.setState({showAdvancedSearch: !this.state.showAdvancedSearch})}>Busca avançada</a>
                    }
                </Col>
            </Form>
        )
    }

    renderGroupPanel = () => {
        return (
            <Panel title="GRUPOS" qtdTotal={[{qtd:this.props.grupos.length, icon:"fa fa-users"}]}>
                <Table
                    fields={
                        ["","Status", "Grupo", "Ações"]
                    }
                >
                    <tbody>
                        {this.props.grupos.map((group,index) => {
                            return (
                                <tr key={index}>
                                    <td></td>
                                    <td>
                                        <i
                                            style={{borderRadius:5}}
                                            className="fa fa-circle-thin"
                                            id={group.statusBloqueado == "NAO" ? "userActivated" : "userDeactivated"}
                                            aria-hidden="true">
                                        </i>   
                                    </td>
                                    <td>{group.descricao}</td>
                                    <td>
                                        <Button onClick={() => this.openModal(<EditarGrupo cancel={this.closeModal} grupoInfo={group} />, "Editar grupo", "large")}>
                                            <i className="fa fa-pencil" />
                                        </Button>
                                        {'   '}
                                        <Button onClick={() => this.openModal(<NovoUsuario cancel={this.closeModal} usuario={{boleto:"NAO", dossie:"NAO"}}/>, "Novo usuário do grupo " + group.descricao)}>
                                            <i className="fa fa-user-plus" />
                                        </Button>
                                        {'   '}
                                        <Button onClick={() => this.openModal(<AtivarConsultas cancel={this.closeModal}/>, "Ativar consultas")}>
                                            <i className="fa fa-gear" />
                                        </Button>
                                    </td>
                                </tr>
                            )
                        })}
                        <tr>
                            
                        </tr>
                    </tbody>
                </Table>
                    
            </Panel>
        )
    }

    renderUsersPanel = () => {
        return (
            <Panel title="USUÁRIOS" qtdTotal={[{qtd:this.props.users.length, icon:"fa fa-user"}]}>
                <Table
                    fields={
                        ["","Status", "Usuário", "Grupo", "Ações"]
                    }
                >
                    <tbody>
                        {this.props.users.map((user,index) => {
                            return (
                                <tr key={index}>
                                    <td></td>
                                    <td>
                                        <i
                                            style={{borderRadius:5}}
                                            className="fa fa-circle-thin"
                                            id={user.statusAtivo == "SIM" ? "userActivated" : "userDeactivated"}
                                            aria-hidden="true">
                                        </i>   
                                    </td>
                                    <td>{user.usuario}</td>
                                    <td>{user.grupoUsuarioVO.descricao}</td>
                                    <td>
                                        <Button onClick={() => this.openModal(<EditarUsuario/>, "Editar usuário")}>
                                            <i className="fa fa-pencil" />
                                        </Button>
                                        {'   '}
                                        <Button onClick={() => this.openModal(<ConfigurarPermissoes cancel={this.closeModal}/>, "Configurar Permissões")}>
                                            <i className="fa fa-list-alt" />
                                        </Button>
                                    </td>
                                </tr>
                            )
                        })}
                        <tr>
                            
                        </tr>
                    </tbody>
                </Table>
                <Col md={12} className="text-center">
                    <Pagination
                        bsSize="medium"
                        items={2}
                        activePage={this.state.activePage}
                        onSelect={this.handleSelect} />
                </Col>          
            </Panel>
        )
    }

    render() {
        return (
            <Col>
                <Col md={12}>
                    <h3 style={{fontSize:16, color:"#bbb"}}>Formulário de busca</h3>
                </Col>
                {this.renderForm()}

                <Col md={5}>
                    {this.renderGroupPanel()}
                </Col>

                <Col md={7}>
                    {this.renderUsersPanel()}
                </Col>

                <Modal
                    IsModalOpen={this.state.showModal}
                    closeModal={this.closeModal}
                    title={this.state.screenTitle}
                    size={this.state.sizeModal}
                >
                    {this.state.screenToShow}
                </Modal>

            </Col>
        )
    }
}

function mapStateToProps(state) {
    console.log("STATE", state.cadastro)
	return {
        grupos: state.cadastro.grupos,
        users: state.cadastro.users,
        loading: state.cadastro.loading
	}
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators({
			getGruposCadastro,
            getUsersCadastro,
            loadingCadastro
		},
		dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Cadastro);