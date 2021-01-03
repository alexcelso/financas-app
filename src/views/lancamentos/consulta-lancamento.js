import React from 'react';
import { withRouter } from 'react-router-dom';
import Card from '../../components/card';
import FormGroup from '../../components/form-group';
import SelectMenu from '../../components/selectMenu';
import LancamentosTable from '../lancamentos/lancamentosTable'
import LancamentoService from '../../app/service/lancamentoService';
import LocalStorageService from '../../app/service/localstorageservice';
import * as mensagem from '../../components/toastr';
import { Dialog, } from 'primereact/dialog';
import { Button } from 'primereact/button';

class ConsultaLancamento extends React.Component {
    constructor() {
        super();

        this.service = new LancamentoService();
    }

    state = {
        ano: '',
        mes: '',
        tipo: '',
        descricao: '',
        showConfirmDialog: false,
        lancamentoDeletar: '',
        lancamentos: []
    }

    buscar = () => {
        if (!this.state.ano) {
            mensagem.mensagemErro('O preenchimento do campo ano é obrigatório!');
            return false;
        }
        const usuarioLogado = LocalStorageService.obterItem('_usuario_logado');
        const lancamentoFiltro = {
            ano: this.state.ano,
            mes: this.state.mes,
            tipo: this.state.tipo,
            descricao: this.state.descricao,
            usuario: usuarioLogado.id
        }

        this.service
            .consultar(lancamentoFiltro)
            .then(response => {
                if (response.data.length < 1) {
                    mensagem.mensagemAlerta("Nenhum resultado encontrado.")
                }
                this.setState({ lancamentos: response.data });
            }).catch(error => {
                console.log(error);
            });
    }

    editar = (id) => {
        this.props.history.push(`/cadastro-lancamento/${id}`);
    }

    abrirConfirmacao = (lancamento) => {
        this.setState({ showConfirmDialog: true, lancamentoDeletar: lancamento })
    }

    deletar = () => {
        this.service
            .deletar(this.state.lancamentoDeletar.id)
            .then(response => {
                const lancamentos = this.state.lancamentos;
                const index = lancamentos.indexOf(this.state.lancamentoDeletar);
                lancamentos.splice(index, 1);
                this.setState({ lancamentos, showConfirmDialog: false });
                mensagem.mensagemSucesso("Lançamento deletado com sucesso!")
            })
            .catch(error => {
                mensagem.mensagemErro("Ocorreu um erro ao tentar deletar o Lançamento.");
            })
    }
    cancelarDelecao = () => {
        this.setState({ showConfirmDialog: false, lancamentoDeletar: {} })
    }

    preparaFormCadastro = () => {
        this.props.history.push('cadastro-lancamento');
    }

    alterarStatus = (lancamento, status) => {
        this.service.alterarStatus(lancamento.id, status)
            .then(response => {
                const lancamentos = this.state.lancamentos;
                const index = lancamentos.indexOf(lancamento);
                if (index !== -1) {
                    lancamento['status'] = status;
                    lancamentos['index'] = lancamento;
                    this.setState({ lancamento });
                }
                mensagem.mensagemSucesso("Status atualizado com sucesso.")
            })
    }

    render() {
        const meses = this.service.obterListaMeses();
        const tipos = this.service.obterListaTipo();
        const confirmDialogFooter = (
            <div>
                <Button label="Confirmar" icon="pi pi-check" onClick={this.deletar} />
                <Button label="Cancelar" icon="pi pi-times" onClick={this.cancelarDelecao} />
            </div>
        );
        return (
            <Card title="Consulta Lançamento">
                <div className="row">
                    <div className="col-lg-6">
                        <div className="bs-component">
                            <fieldset>
                                <FormGroup htmlFor="inputAno" label="Ano: *">
                                    <input type="text" onChange={e => this.setState({ ano: e.target.value })} value={this.state.ano} className="form-control" id="inputAno" placeholder="Digite o Ano" />
                                </FormGroup>
                                <FormGroup htmlFor="inputMes" label="Mês: *">
                                    <SelectMenu onChange={e => this.setState({ mes: e.target.value })} value={this.state.mes} className="form-control" lista={meses}></SelectMenu>
                                </FormGroup>
                                <FormGroup htmlFor="inputDescricao" label="Descrição: *">
                                    <input type="text" onChange={e => this.setState({ descricao: e.target.value })} value={this.state.descricao} className="form-control" id="inputDescrica" placeholder="Digite a descrição" />
                                </FormGroup>
                                <FormGroup htmlFor="inpuLancamento" label="Tipo de Lançamento: ">
                                    <SelectMenu onChange={e => this.setState({ tipo: e.target.value })} value={this.state.tipo} className="form-control" lista={tipos}></SelectMenu>
                                </FormGroup>
                                <button type="button" onClick={this.buscar} className="btn btn-success"><i className="pi pi-search"> Buscar</i></button>
                                <button type="button" onClick={this.preparaFormCadastro} className="btn btn-danger"><i className="pi pi-plus"></i> Cadastrar</button>
                            </fieldset>
                        </div>
                    </div>
                </div>
                <br />
                <div className="row">
                    <div className="col-md-12">
                        <div className="bs-component">
                            <LancamentosTable lancamentos={this.state.lancamentos}
                                editAction={this.editar}
                                deleteAction={this.abrirConfirmacao}
                                alterarStatus={this.alterarStatus} />
                        </div>
                    </div>
                </div>
                <div>
                    <Dialog header="Confirmar"
                        visible={this.state.showConfirmDialog}
                        style={{ width: '50vw' }}
                        modal={true}
                        footer={confirmDialogFooter}
                        onHide={() => this.setState({ showConfirmDialog: false })}>
                        <p>Confirma a exclusão desse Lancamento?</p>
                    </Dialog>
                </div>
            </Card>
        )
    }
}

export default withRouter(ConsultaLancamento);