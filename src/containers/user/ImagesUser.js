import React, { Component} from "react";

export default class ImagesUser extends Component {
    constructor(props) {
        super(props);

        this.state = {
            nome: this.props.user.nome,
            telefone: this.props.user.telefone,
            usuarioImagem: this.props.user.usuarioImagem,
            background_url: this.props.user.background_url,
            firm_url: this.props.user.firm_url
        }

        this.onSubmitUser = this.onSubmitUser.bind(this);
        this.onChangeName = this.onChangeName.bind(this);
        this.onChangeTelefone = this.onChangeTelefone.bind(this);
        this.sendInfoUser = this.sendInfoUser.bind(this);
    }

    onSubmitUser(e) {
        e.preventDefault();
        e.stopPropagation();

        var form = this.refs.user.files[0];

    }

   onSubmitFirm(e) {
        e.preventDefault();
        e.stopPropagation();

    }

    onChangeName(evt) {
        this.setState({
            nome: evt.target.value
        })
    }

    onChangeTelefone(evt) {
        this.setState({
            telefone: evt.target.value
        })
    }

    sendInfoUser(e) {
        this.props.userEditInfo(this.state.nome, this.state.telefone, this.state.usuarioImagem, this.state.firm_url);
    }

    render() {
        return (
            <div className="col-md-5">
                <div className="panel panel-default">
                    <div className="panel-heading text-center">
                        IMAGENS
                    </div>
                    <div className="panel-body">
                        <div>
                            <img src={this.props.user.background_url} id="user-edit-background" width="100%"/>
                        </div>
                        <div className="col-md-12 col-xs-12">
                            <form method="post" encType="multipart/form-data" onSubmit={this.onSubmitUser} ref="imageUpload" name="avatar">
                                <label className="input-file pull-right" >
                                    Alterar imagem
                                    <input type="file" name="avatar" ref="user" accept="file_extension|image/.gif,.jpg,.png" style={{display: "none"}}/>
                                </label>
                                
                            </form>
                        </div>

                        <div className="col-md-12 col-xs-12">
                            <div className="col-md-4 col-xs-6 text-center">
                                <div className="col-md-12 col-xs-12">
                                    <img src={this.props.user.usuarioImagem} className="img-uploaded" />
                                </div>
                                <div className="col-md-12 col-xs-12">
                                    <form method="post" encType="multipart/form-data" onSubmit={this.onSubmitUser} ref="imageUpload" name="avatar">
                                        <label className="input-file" >
                                            Alterar imagem
                                            <input type="file" name="avatar" ref="user" accept="file_extension|image/.gif,.jpg,.png" style={{display: "none"}}/>
                                        </label>
                                        
                                    </form>
                                </div>
                            </div>

                            <div className="col-md-4 col-xs-6 text-center">
                                <div className="col-md-12 col-xs-12">
                                    <img src={this.props.user.firm_url} className="img-uploaded" />
                                </div>
                                <div className="col-md-12 col-xs-12">
                                    <form method="post" encType="multipart/form-data" onSubmit={this.onSubmitFirm.bind(this)} ref="imageUpload" name="avatar">
                                        <label className="input-file" >
                                            Alterar imagem
                                            <input type="file" name="avatar" ref="user" accept="file_extension|image/.gif,.jpg,.png" style={{display: "none"}}/>
                                        </label>
                                    </form>
                                </div>
                            </div>

                            <div className="col-md-4 col-xs-12" id="user-edit-images-btn">
                                <button className="btn btn-primary pull-right" type="submit" onClick={this.sendInfoUser}>Atualizar</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>)
    }
}