import React from 'react';
import NavBarItem from './navbaritem';
import { AuthConsumer } from '../main/provedorAutenticacao';

function NavBar(props) {
    return (
        <div className="navbar navbar-expand-lg fixed-top navbar-dark bg-primary">
            <div className="container">
                <a href="#/" className="navbar-brand">Minhas Finanças</a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarResponsive">
                    <ul className="navbar-nav">
                        <NavBarItem render={props.isUsuarioAutenticado} href="#/home" label="Home" />
                        <NavBarItem render={props.isUsuarioAutenticado} href="#/cadastrar-usuario" label="Usuários" />
                        <NavBarItem render={props.isUsuarioAutenticado} href="#/consulta-lancamento" label="Lançamentos" />
                        <NavBarItem render={props.isUsuarioAutenticado} onClick={props.deslogar} href="#/" label="Sair" />
                    </ul>
                </div>
            </div>
        </div>
    )
}
export default () => (
    <AuthConsumer>
        {(context) => (<NavBar isUsuarioAutenticado={context.isAutenticado} deslogar={context.encerrarSessao} />)}
    </AuthConsumer>
);