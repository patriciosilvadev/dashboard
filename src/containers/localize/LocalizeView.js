import React, { Component } from "react";

import Dados from "./Dados";
import PessoasRelacionadas from "./PessoasRelacionadas";
import Telefones from "./Telefones";
import Enderecos from "./Enderecos";
import Ocupacoes from "./Ocupacoes";
import Sociedades from "./Sociedades";
import Veiculos from "./Veiculos";
import DadosPj from "./DadosPj";
import Socios from "./Socios";
import TelefonesRelacionados from "./TelefonesRelacionados";
import EnderecosRelacionados from "./EnderecosRelacionados";

import PanelGroup from "../../components/PanelGroup";

export default class LocalizeView extends Component {
    constructor(props) {
        super(props);

        console.log(this.props);
    }

    render() {
        return (
            this.props.tipo == "CPF" ?
                <PanelGroup>
                    <Dados dados={this.props.data} searchLocalize={this.props.searchLocalize} showPessoasRelacionadas={this.props.showPessoasRelacionadas}/>

                    {this.props.pessoasRelacionadas ? 
                        <PessoasRelacionadas /> : ""}

                    {this.props.data.TELEFONES_MOVEIS ? 
                        <Telefones telefones = {this.props.data.TELEFONES_MOVEIS.TELEFONE} showTelefonesRelacionados = {() => this.props.showTelefonesRelacionados(this.props.data.CPF)} /> : ""}

                    {this.props.telefonesRelacionados ? 
                        this.props.telefonesRelacionados.map((telefone,i) => {
                            return <TelefonesRelacionados telefone={telefone} key={i} />
                        })
                    :""}

                    {this.props.data.ENDERECOS ?
                        <Enderecos enderecos = {this.props.data.ENDERECOS.ENDERECO} showEnderecosRelacionados={() => this.props.showEnderecosRelacionados(this.props.data.CPF)}/> : ""}

                    {this.props.enderecosRelacionados ? 
                        this.props.enderecosRelacionados.map((enderecos,i) => {
                            return <EnderecosRelacionados enderecos={enderecos} key={i} />
                        })
                    :""}

                    {this.props.data.OCUPACOES ?
                        <Ocupacoes ocupacao = {this.props.data.OCUPACOES.OCUPACAO} buscaCNPJ = {this.props.searchLocalize} /> : ""}

                    {this.props.data.SOCIEDADES ?
                        <Sociedades sociedades = {this.props.data.SOCIEDADES} buscaCNPJ = {this.props.searchLocalize}/> : "" }

                    {this.props.data.VEICULOS ?
                        <Veiculos veiculos =  {this.props.data.VEICULOS}/> : ""}
                </PanelGroup>

            : this.props.tipo == "CNPJ" ?
                    <PanelGroup>
                        <DadosPj dados={this.props.data} searchLocalize={this.props.searchLocalize} />
                        <Telefones telefones = {this.props.data.TELEFONES_MOVEIS.TELEFONE} />

                        {this.props.data.ENDERECOS ?
                            <Enderecos enderecos = {this.props.data.ENDERECOS.ENDERECO}/> : ""}

                        {this.props.data.SOCIOS ?
                            <Socios socios = {this.props.data.SOCIOS.SOCIEDADES} buscaCPF={this.props.searchLocalize}/> : "" }
                    
                    </PanelGroup>
            : <div></div>
        )
    }
}