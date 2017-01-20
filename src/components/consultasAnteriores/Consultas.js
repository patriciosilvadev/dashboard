import React, { Component } from "react";
import Tooltip from 'react-tooltip'

import Panel from "../../components/panel/Panel";
import Table from "../table/Table";

export default class Consultas extends Component {
    render() {
        return (
            <Panel title="CONSULTAS" qtdTotal={[{icon:"fa fa-search", qtd:this.props.consultas.quantidadeTotal}]}>
                <a name="Consultas"></a>
                <div className="col-md-12">
                    <Table
                        fields={
                            ["Nome do Associado", "Data da Consulta", "Cidade Origem", "Segmento", "Quantidade", ""]
                        }
                    >
                        <tbody>
                            {this.props.consultas.consultasAnteriores.map((consulta,index) => {
                                return (
                                    <tr key={index}>
                                        <td>{consulta.consultante}</td>
                                        <td>{consulta.data}</td>
                                        <td>{consulta.cidade}</td>
                                        <td>{consulta.segmento}</td>  
                                        <td>{consulta.quantidade}</td>
                                        <td>
                                            <a data-tip data-for='tooltipConsultar'>
                                                <div className="mapa-button">
                                                    <i className='fa fa-search'/>
                                                </div>
                                            </a>
                                        </td>
                                    </tr>
                                )
                            })}

                        </tbody>
                    </Table>

                </div>
                <Tooltip id="tooltipConsultar">
                    <span>Consultar</span>
                </Tooltip>
            </Panel>
        )
    }
}