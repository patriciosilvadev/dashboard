import React, { Component } from "react";
import { Col } from "react-bootstrap";

import Panel from "../panel/Panel";
import Table from "../table/Table";

import { NENHUM_REGISTRO } from "../../constants/utils";

const title = "REGISTROS DE DÉBITOS";

export default class RegistroDebito extends Component {
  render() {
    return (
          <div>
            <a name={"Registro de Débitos"+this.props.index}></a>
            <a name={"Pendências e Restrições Financeiras"+this.props.index}></a>
            {this.props.registros && this.props.registros.registrosDebitos ?
              <Panel title={title} qtdTotal={[{icon:"fa fa-credit-card-alt", qtd:this.props.registros.quantidadeRegistros}]}>
                
                <Col md={12}>
                  <Col md={4}><strong>Ocorrência mais Antiga:</strong> {this.props.registros.ocorrenciaMaisAntiga}</Col>
                  <Col md={4}><strong>Ocorrência mais Recente:</strong> {this.props.registros.ocorrenciaMaisRecente}</Col>
                  <Col md={4}><strong>Valor Total:</strong> R$ {this.props.registros.valorTotal}</Col>
                </Col>

                <Col md={12}>
                  <Table fields={["Associado/Credor", "Data Inclusão", "Data vencimento", "Origem", "Contrato", "Comprador/Avalista", "Valor", "Cidade", "Telefone"]}>
                    <tbody>
                      {this.props.registros.registrosDebitos.map((registro, index) => {
                        return (
                          <tr key={index}>
                            <td>{registro.credor}</td>
                            <td>{registro.dataInclusao}</td>
                            <td>{registro.dataVencimento}</td>
                            <td>{registro.praca}</td>
                            <td>{registro.contrato}</td>
                            <td>{registro.avalistaComprador}</td>
                            <td>{registro.valor}</td>                        
                            <td>{registro.cidade}</td>
                            <td>{registro.ddd + " " + registro.telefone}</td>
                          </tr>
                        )
                      })}
                    </tbody>
                  </Table>
                </Col>
              </Panel>
              :
              <Panel title={title}>
                  <div className="text-center"><strong>{NENHUM_REGISTRO}</strong></div>
              </Panel>}
          </div>
      )
  }
}