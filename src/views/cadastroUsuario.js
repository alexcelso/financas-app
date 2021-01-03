import React from 'react';

import Card from '../components/card';
import FormGroup from '../components/form-group'
import { withRouter } from 'react-router-dom';

import UsuarioService from '../app/service/usuarioService';
import { mensagemSucesso, mensagemErro } from '../components/toastr';


class CadastroUsuario extends React.Component {

    state = {
        nome: '',
        email: '',
        senha: '',
        senhaRepeticao: ''
    }

    constructor() {
        super();
        this.service = new UsuarioService();
    }

    cadastrar = () => {
        const { nome, email, senha, senhaRepeticao } = this.state;
        const usuario = { nome, email, senha, senhaRepeticao };
        try {
            this.service.validar(usuario)
        } catch (error) {
            const mensagens = error.mensagens;
            mensagens.forEach(mensagens => mensagemErro(mensagens));
            return false;
        }
        this.service.salvar(usuario)
            .then(response => {
                mensagemSucesso('Usuário cadastrado com sucesso! Faça login para acessar o sistema.');
            }).catch(error => {
                mensagemErro(error.response.data);
            })
    }

    cancelar = () => {
        this.props.history.push('/login');
    }

    render() {
        return (
            <Card title="Cadastro de Usuário">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="bs-component">
                            <fieldset>
                                <FormGroup htmlFor="inputNome" label="Nome: *">
                                    <input type="name" onChange={e => this.setState({ nome: e.target.value })} className="form-control" id="inputNome" aria-describedby="emailHelp" placeholder="Digite o Nome" />
                                </FormGroup>
                                <FormGroup htmlFor="inputEmail" label="Email: *">
                                    <input type="email" onChange={e => this.setState({ email: e.target.value })} className="form-control" id="inputEmail" aria-describedby="emailHelp" placeholder="Digite o Email" />
                                    <small id="emailHelp" className="form-text text-muted">Não divulgamos o seu email.</small>
                                </FormGroup>
                                <FormGroup htmlFor="inputSenha" label="Senha: *">
                                    <input type="password" onChange={e => this.setState({ senha: e.target.value })} className="form-control" id="inputSenha" placeholder="Password"></input>
                                </FormGroup>
                                <FormGroup htmlFor="inputRepitaSenha" label="Repita a Senha: *">
                                    <input type="password" onChange={e => this.setState({ senhaRepeticao: e.target.value })} className="form-control" id="inputRepitaSenha" placeholder="Password"></input>
                                </FormGroup>
                                <button type="button" onClick={this.cadastrar} className="btn btn-success"><i className="pi pi-save"></i> Cadastrar</button>
                                <button onClick={this.cancelar} type="button" className="btn btn-danger"><i className="pi pi-times "></i> Cancelar</button>
                            </fieldset>
                        </div>
                    </div>
                </div>
            </Card>
        )
    }
}

export default withRouter(CadastroUsuario);