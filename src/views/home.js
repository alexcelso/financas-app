import React from 'react';

import UsuarioService from '../app/service/usuarioService';
import { mensagemErro } from '../components/toastr';
import currencyFormatter from 'currency-formatter';
import { withRouter } from "react-router-dom"
import { AuthContext } from '../main/provedorAutenticacao';

class Home extends React.Component {
    state = {
        saldo: 0,
    }

    constructor() {
        super();
        this.service = new UsuarioService();
    }

    componentDidMount() {

        const usuarioLogado = this.context.usuarioAutenticado;
        this.service.obterSaldoPorUsuario(usuarioLogado.id)
            .then(response => {
                this.setState({
                    saldo: response.data,
                })
            }).catch(error => {
                mensagemErro(error.response)
            })
    }

    render() {
        return (
            <div className="jumbotron">
                <h1 className="display-3">Bem vindo!</h1>
                <p className="lead">Esse é seu sistema de finanças.</p>
                <p className="lead">Seu saldo para o mês atual é de {currencyFormatter.format(this.state.saldo, { locale: 'pt-BR' })}</p>
                <hr className="my-4" />
                <p>E essa é sua área administrativa, utilize um dos menus ou botões abaixo para navegar pelo sistema.</p>
                <p className="lead">
                    <a className="btn btn-primary btn-lg" href="#/cadastrar-usuario" role="button"><i className="pi pi-users"></i>  Cadastrar Usuário</a>
                    <a className="btn btn-danger btn-lg" href="#/cadastro-lancamento" role="button"><i className="pi pi-money-bill"></i>  Cadastrar Lançamento</a>
                </p>
            </div>
        )
    }
}

Home.contextType = AuthContext

export default withRouter(Home);