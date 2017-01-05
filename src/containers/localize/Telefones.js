import React, { Component } from "react";
import CopyToClipboard from 'react-copy-to-clipboard';
import Tooltip from "react-tooltip";

import SMSRapido from "../sms/SMSRapido";

import Panel from "../../components/Panel";
import Table from "../../components/Table";
import Modal from "../../components/Modal";

export default class Telefones extends Component{
  constructor(props) {
	   super(props);

     this.state = {
          smShow: false,
          IsModalOpen: false,
          copiar: false,
          showMoreTel: false
      };

      this.telefonesRelacionados = this.telefonesRelacionados.bind(this);
  }

  copiarNumero() {
    this.setState({
      copiar: !this.state.copiar
    })
  }

	closeModal() {
		this.setState({
			IsModalOpen: false
		})
	}

  telefonesRelacionados() {
    this.props.showTelefonesRelacionados()
  }

  render() {
    let celulares = [];
    return (
              <Panel title="TELEFONES" qtdTotal={[{qtd:this.props.telefones.length,icon:"glyphicon-phone-alt"}]}>
                <div className="col-md-6">
                  <table className="table table-striped table-hover">
                    <thead>
                      <tr>
                        <th>Fixos</th>
                      </tr>
                    </thead>
                    <tbody>
                      {this.props.telefones.map((tel,i) => {
                        tel = tel.toString().replace("(","").replace(")","").replace(" ","").replace("-","");
                        if(tel != "") {
                          if(tel.length < 11) {
                              return <tr key={i} className={i > 3 ? (this.state.showMoreTel ? "" : "display-none") : ""} >
                                <td>
                                  <div className="col-md-3">
                                    {tel[0]}{tel[1]} {tel.substring(2)}
                                  </div>

                                  <a data-tip data-for="tooltipCopy">
                                    <div className="col-md-1">
                                      <CopyToClipboard text={tel} onCopy={this.copiarNumero.bind(this)}>
                                        <i className="glyphicon glyphicon-copy icon-tel" />
                                      </CopyToClipboard>
                                    </div>
                                  </a>

                                  <a data-tip data-for="tooltipSMS">
                                    <div className="col-md-1">
                                      <i className="glyphicon glyphicon-comment icon-tel icon-tel-msg" onClick={()=>this.setState({ IsModalOpen: true })}/>
                                    </div>
                                  </a>

                                  <a data-tip data-for="tooltipCall">
                                    <div className="col-md-1">
                                      <i className="glyphicon glyphicon-phone-alt icon-tel icon-tel-phone" />
                                    </div>
                                  </a>

                                  <a data-tip data-for="tooltipHot">
                                    <div className="col-md-1">
                                      <i className="glyphicon glyphicon-fire icon-tel icon-tel-hot" />
                                    </div>
                                  </a>

                                  <a data-tip data-for="tooltipOperadora">
                                    <div className="col-md-3">
                                        <img src="http://logok.org/wp-content/uploads/2015/06/Claro-logo-logotype-1024x768.png" width="25"/>
                                    </div>
                                  </a>
                                </td>
                              </tr>
                            } else {
                              celulares.push(tel);
                            }
                          }
                      })}
                    </tbody>
                  </table>
                </div>

                {celulares.length > 0 ?
                  <div className="col-md-6" xs={6}>
                    <table className="table table-striped table-hover">
                      <thead>
                        <tr>
                          <th>Celulares</th>
                        </tr>
                      </thead>
                      <tbody>
                        {celulares.map((tel,i) => {
                            tel = tel.toString();
                            return <tr key={i} className={i > 3 ? (this.state.showMoreTel ? "" : "display-none") : ""}>
                                <td>
                                  <div className="col-md-3" style={{paddingRight: 0}}>
                                    {tel[0]}{tel[1]} {tel.substring(2)}
                                  </div>

                                  <a data-tip data-for="tooltipCopy">
                                    <div className="col-md-1">
                                      <CopyToClipboard text={tel} onCopy={this.copiarNumero.bind(this)}>
                                        <i className="glyphicon glyphicon-copy icon-tel" />
                                      </CopyToClipboard>
                                    </div>
                                  </a>

                                  <a data-tip data-for="tooltipSMS">
                                    <div className="col-md-1">
                                      <i className="glyphicon glyphicon-comment icon-tel icon-tel-msg" onClick={()=>this.setState({ IsModalOpen: true })}/>
                                    </div>
                                  </a>

                                  <a data-tip data-for="tooltipCall">
                                    <div className="col-md-1">
                                      <i className="glyphicon glyphicon-phone-alt icon-tel icon-tel-phone" />
                                    </div>
                                  </a>

                                  <a data-tip data-for="tooltipHot">
                                    <div className="col-md-1">
                                      <i className="glyphicon glyphicon-fire icon-tel icon-tel-hot" />
                                    </div>
                                  </a>

                                  <a data-tip data-for="tooltipWhats">
                                    <div className="col-md-1">
                                        <img src="https://whatsapp.com/favicon.png" width="15"/>
                                    </div>
                                  </a>

                                  <a data-tip data-for="tooltipOperadora">
                                    <div className="col-md-3">
                                        <img src="http://2.bp.blogspot.com/-2iz4nnxuSu8/TyHGVjiLdDI/AAAAAAAABbw/wJWY-ugjozI/s1600/logotipo+oi.jpg" width="20" className="like-button"/>
                                    </div>
                                  </a>
                                </td>
                            </tr>
                        })}
                      </tbody>
                    </table>
                  </div>: "" }

                  <Tooltip id="tooltipCopy">
                    <span>Copiar número</span>
                  </Tooltip>

                  <Tooltip id="tooltipOperadora">
                    <span>Operadora</span>
                  </Tooltip>

                  <Tooltip id="tooltipSMS">
                    <span>Enviar SMS</span>
                  </Tooltip>

                  <Tooltip id="tooltipCall">
                    <span>Ligar</span>
                  </Tooltip>

                  <Tooltip id="tooltipHot">
                    <span>Número importante</span>
                  </Tooltip>

                  <Tooltip id="tooltipWhats">
                    <span>Enviar mensagem por Whatsapp</span>
                  </Tooltip>

                  <Modal
                    IsModalOpen={this.state.IsModalOpen}
                    closeModal={this.closeModal.bind(this)}>

                    <SMSRapido />

                    <button onClick={this.closeModal.bind(this)}>close</button>
                  </Modal>

                  
                  <div className="col-md-12">
                    {celulares.length > 4 || this.props.telefones.length - celulares.length > 4 ?
                    <a data-tip data-for="moreInfo">
                      <i className="glyphicon glyphicon-plus pull-right moreInfo" onClick={() => this.setState({showMoreTel:!this.state.showMoreTel})}/>
                    </a>: ""}
                    <a data-tip data-for="usersRelated">
                      <i className="glyphicon glyphicon-user pull-right relacionados" onClick={this.telefonesRelacionados} />
                    </a>
                  </div>
                  
              </Panel>)
  }
}