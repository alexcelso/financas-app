import React from 'react';
import Card from '../../components/card';
import FormGroup from '../../components/form-group';

import { withRouter } from 'react-router-dom';
import SelectMenu from '../../components/selectMenu';
import LancamentoService from '../../app/service/lancamentoService';
import * as mensagem from '../../components/toastr';
import LocalStorageService from '../../app/service/localstorageservice';


class CadastroLancamento extends React.Component {

    state = {
        id: null,
        ano: '',
        mes: '',
        tipo: '',
        descricao: '',
        valor: '',
        status: '',
        usuario: null,
        atualizando: false,
    }
    constructor() {
        super();

        this.service = new LancamentoService();
    }

    componentDidMount() {
        const params = this.props.match.params;
        if (params.id) {
            this.service.obterPorId(params.id)
                .then(response => {
                    this.setState({ ...response.data, atualizando: true });
                })
                .catch(error => {
                    mensagem.mensagemErro(error.response.data);
                });
        }
    }

    handleChange = (event) => {
        const value = event.target.value;
        const name = event.target.name;

        this.setState({ [name]: value });
    }

    submit = () => {
        const usuarioLogado = LocalStorageService.obterItem('_usuario_logado');
        const { descricao, valor, ano, mes, tipo } = this.state;
        const lancamento = { descricao, valor, ano, mes, tipo, usuario: usuarioLogado.id };

        try {
            this.service.validar(lancamento);
        } catch (erro) {
            const mensagens = erro.mensagens;
            mensagens.forEach(msg => mensagem.mensagemErro(msg));
            return false;
        }

        this.service
            .salvar(lancamento)
            .then(response => {
                this.props.history.push('/consulta-lancamento');
                mensagem.mensagemSucesso("Lançamento cadastrado com sucesso!")
            })
            .catch(error => {
                mensagem.mensagemErro(error.response.data);
            });

    }

    atualizar = () => {
        const { descricao, valor, ano, mes, tipo, status, id, usuario } = this.state;
        const lancamento = { descricao, valor, ano, mes, tipo, status, id, usuario };
        this.service
            .atualizar(lancamento)
            .then(response => {
                this.props.history.push('/consulta-lancamento');
                mensagem.mensagemSucesso("Lançamento atualizado com sucesso!")
            })
            .catch(error => {
                mensagem.mensagemErro(error.response.data);
            });
    }

    render() {

        const tipos = this.service.obterListaTipo();
        const meses = this.service.obterListaMeses();
        return (
            <Card title={this.state.atualizando ? "Atualização de Lançamento" : "Cadastrar Lançamento"}>
                <div className="row">
                    <div className="col-md-12">
                        <FormGroup htmlFor="inputDescricao" label="Descrição: *">
                            <input type="text"
                                onChange={this.handleChange}
                                value={this.state.descricao}
                                name="descricao"
                                id="inputDescricao"
                                className="form-control" />
                        </FormGroup>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-6">
                        <FormGroup htmlFor="inputAno" label="Ano: *">
                            <input type="text"
                                onChange={this.handleChange}
                                name="ano"
                                value={this.state.ano}
                                id="inputAno"
                                className="form-control" />
                        </FormGroup>
                    </div>
                    <div className="col-md-6">
                        <FormGroup htmlFor="inputMes" label="Mês: *">
                            <SelectMenu id="inputMes"
                                onChange={this.handleChange}
                                name="mes"
                                value={this.state.mes}
                                lista={meses}
                                className="form-control" />
                        </FormGroup>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-4">
                        <FormGroup htmlFor="inputValor" label="Valor: *">
                            <input type="text"
                                onChange={this.handleChange}
                                name="valor"
                                value={this.state.valor}
                                id="inputValor"
                                className="form-control" />
                        </FormGroup>
                    </div>
                    <div className="col-md-4">
                        <FormGroup htmlFor="inputTipo" label="Tipo: *">
                            <SelectMenu id="inputTipo"
                                onChange={this.handleChange}
                                name="tipo"
                                value={this.state.tipo}
                                lista={tipos}
                                className="form-control" />
                        </FormGroup>
                    </div>
                    <div className="col-md-4">
                        <FormGroup htmlFor="inputStatus" label="Status: *">
                            <input type="text"
                                id="inputStatus"
                                name="status"
                                value={this.state.status}
                                className="form-control" disabled />
                        </FormGroup>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-6">
                        {this.state.atualizando ?
                            (
                                <button onClick={this.atualizar} className="btn btn-success"><i className="pi pi-refresh"></i> Atualizar</button>
                            ) : (
                                <button onClick={this.submit} className="btn btn-success"><i className="pi pi-save"></i> Salvar</button>
                            )
                        }
                        <button onClick={e => this.props.history.push('/consulta-lancamento')} className="btn btn-danger"><i className="pi pi-times"></i> Cancelar</button>
                    </div>
                </div>
            </Card >
        )
    }

}

export default withRouter(CadastroLancamento);