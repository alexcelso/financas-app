import React from 'react';
import Card from '../components/card';
import FormGroup from "../components/form-group";
import { withRouter } from "react-router-dom"
import UsuarioService from '../app/service/usuarioService';
import { mensagemErro } from '../components/toastr'
import { AuthContext } from '../main/provedorAutenticacao';
class Login extends React.Component {

    state = {
        email: '',
        senha: '',
    }

    constructor() {
        super();
        this.UsuarioService = new UsuarioService();
    }

    entrar = () => {
        this.UsuarioService.autenticar({
            email: this.state.email,
            senha: this.state.senha
        }).then(response => {
            this.context.iniciarSessao(response.data);
            this.props.history.push('/home');
        }).catch(erro => {
            mensagemErro(erro.response.data);
        })
    }

    preparCadastrar = () => {
        this.props.history.push('cadastrar-usuario');
    }

    render() {
        return (
            <div className="row">
                <div className="col-md-6" style={{ position: 'relative', left: '300px' }}>
                    <div className="bs-docs-section">
                        <Card title="Login">
                            <div className="row">
                                <div className="col-lg-12">
                                    <div className="bs-component">
                                        <fieldset>
                                            <FormGroup htmlFor="inputEmail" label="Email: *">
                                                <input value={this.state.email} onChange={e => this.setState({ email: e.target.value })} type="email" className="form-control" id="inputEmail" aria-describedby="emailHelp" placeholder="Digite o Email"></input>
                                            </FormGroup>
                                            <FormGroup htmlFor="inputSenha" label="Senha: *">
                                                <input value={this.state.senha} onChange={e => this.setState({ senha: e.target.value })} type="password" className="form-control" id="inputSenha" placeholder="Password"></input>
                                            </FormGroup>
                                            <button onClick={this.entrar} type="button" className="btn btn-success"><i className="pi pi-sign-in"></i>  Entrar</button>
                                            <button onClick={this.preparCadastrar} type="button" className="btn btn-danger"><i className="pi pi-plus"></i>  Cadastrar</button>
                                        </fieldset>
                                    </div>
                                </div>
                            </div>
                        </Card>
                    </div>
                </div>
            </div>
        )
    }
}

Login.contextType = AuthContext
export default withRouter(Login);

