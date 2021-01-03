import React from 'react';

import { Route, Switch, HashRouter, Redirect } from 'react-router-dom';
import CadastroUsuario from '../views/cadastroUsuario';
import Login from '../views/login';
import Home from '../views/home';
import ConsultaLancamento from '../views/lancamentos/consulta-lancamento';
import CadastroLancamento from '../views/lancamentos/cadastro-lancamento';
import { AuthConsumer } from './provedorAutenticacao';

function RotaAutenticada({ component: Component, isUsuarioAutenticado, ...props }) {
    return (
        <Route {...props} render={(componentProps) => {
            if (isUsuarioAutenticado) {
                return (
                    <Component {...componentProps} />
                )
            } else {
                <Redirect to={{ pathname: '/', state: { from: componentProps.location } }} />
            }
        }} />
    )
}

function Rotas(props) {
    return (
        <HashRouter>
            <Switch>
                <Route exact={true} path="/" component={Login} />
                <Route path="/cadastrar-usuario" component={CadastroUsuario} />
                <RotaAutenticada isUsuarioAutenticado={props.isUsuarioAutenticado} path="/home" component={Home} />
                <RotaAutenticada isUsuarioAutenticado={props.isUsuarioAutenticado} path="/consulta-lancamento" component={ConsultaLancamento} />
                <RotaAutenticada isUsuarioAutenticado={props.isUsuarioAutenticado} path="/cadastro-lancamento/:id?" component={CadastroLancamento} />
            </Switch>
        </HashRouter >
    )
}

export default () => (
    <AuthConsumer>
        {(context) => (<Rotas isUsuarioAutenticado={context.isAutenticado} />)}
    </AuthConsumer>
);