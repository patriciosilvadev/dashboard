import React, {Component} from "react";
import Notification from "react-notification-system";
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
import { Button, Col, Form } from "react-bootstrap";

// Actions
import { filterCampanhasSMS, getCampanhasSMS, loadingSMS } from "../../actions/actionsSMS";

// Components
import MonitorEnviosView from "./MonitorEnviosView"
import PanelGroup from "../../components/panel/PanelGroup"
import Panel from "../../components/panel/Panel"
import Table from "../../components/table/Table"
import { LoadingScreen } from "../../components/utils/ElementsAtScreen";
import { MyFieldGroup } from "../../components/forms/CommonForms"

// Constants
import { COMPANY_NAME_SHORT, COMPANY_PRODUCT_SMS } from "../../constants/constantsCompany";
import { MESSAGE_SUCCESS_SMS, NENHUM_REGISTRO, SUCCESS } from "../../constants/utils";

class MonitorEnvios extends Component {
    constructor(props) {
      super(props);

      this.state = {
        showBuscaAvancada: false
      }
    }

    componentDidMount() {
      document.title = COMPANY_PRODUCT_SMS + " > " + COMPANY_NAME_SHORT;
      this.props.loadingSMS()
      this.props.getCampanhasSMS()
    }

    onClickBuscaAvancada = () => {
      this.setState({
        showBuscaAvancada: !this.state.showBuscaAvancada
      })
    }

    onChange = (evt) => {
      this.setState({
        [evt.target.name]: evt.target.value
      })
    }

    onFormSubmit = (evt) => {
      evt.preventDefault()

      let { id=null, campanha=null, dataInicio=null, dataFim=null, cliente=null, usuario=null } = this.state

      this.props.filterCampanhasSMS({ id, campanha, dataInicio, dataFim, cliente, usuario })
    }

    renderForm = () => {
        return (
          <Panel>
            <Form onSubmit={this.onFormSubmit}>
                <Col md={this.state.showBuscaAvancada ? 6 : 4}>
                    <MyFieldGroup
                      id="idCampanha"
                      label="Id"
                      type="text"
                      name="id"
                      onChange={this.onChange} />
                </Col>

                <Col md={3}>
                    <MyFieldGroup
                      id="smsCampanha"
                      label="Campanha"
                      type="text"
                      name="campanha"
                      onChange={this.onChange} />
                </Col>

                <Col md={3}>
                    <MyFieldGroup
                      id="smsUsuario"
                      label="Usuário"
                      type="text"
                      name="usuario"
                      onChange={this.onChange} />
                </Col>

                {this.state.showBuscaAvancada ?
                  <span>
                    <Col md={3}>
                        <MyFieldGroup
                          id="smsDataInicio"
                          label="Data Início"
                          type="date"
                          name="dataInicio"
                          onChange={this.onChange} />
                    </Col>

                    <Col md={3}>
                        <MyFieldGroup
                          id="smsDataFim"
                          label="Data Fim"
                          type="date"
                          name="dataFim"
                          onChange={this.onChange} />
                    </Col>

                    <Col md={4}>
                        <MyFieldGroup
                          id="smsCliente"
                          label="Cliente"
                          type="text"
                          name="cliente"
                          onChange={this.onChange} />
                    </Col>
                  </span>
                : ""}

                <Col md={2}>
                    <label htmlFor="">
                      <a href="#" onClick={this.onClickBuscaAvancada} >
                        {!this.state.showBuscaAvancada ? 'Busca avançada' : 'Fechar busca'}
                      </a>
                    </label>
                    <Button style={{width:"100%"}} type="submit" bsStyle="info">Buscar</Button>
                </Col>

            </Form>
          </Panel>
        )
    }

    render() {
      return (
        <section>
          {this.renderForm()}

          {this.props.loading ? <LoadingScreen /> : ""}

          <div style={{marginBottom:15}} />

          <PanelGroup>
            {this.props.campanhas.length > 0 ? 
              this.props.campanhas.map((campanha,index) => {
                return (
                  <MonitorEnviosView
                    campanha={campanha}
                    key={index} />
                )
              })
            : ""}
          </PanelGroup>
        </section>
      )
    }
}

function mapStateToProps(state) {
  return {
    campanhas: state.sms.campanhas,
    loading: state.sms.loading
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
      filterCampanhasSMS,
      getCampanhasSMS,
      loadingSMS
  }, dispatch)
}


export default connect(mapStateToProps, mapDispatchToProps)(MonitorEnvios);