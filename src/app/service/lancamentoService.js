import ApiService from '../apiservice';

import ErroValidacao from '../exception/erroValidacao';

class LancamentoService extends ApiService {

    constructor() {
        super('/api/lancamentos')
    }

    obterListaMeses() {
        return [
            { label: 'Selecione...', value: '' },
            { label: 'Janeiro', value: 1 },
            { label: 'Fevereiro', value: 2 },
            { label: 'Março', value: 3 },
            { label: 'Abril', value: 4 },
            { label: 'Maio', value: 5 },
            { label: 'Junho', value: 6 },
            { label: 'Julho', value: 7 },
            { label: 'Agosto', value: 8 },
            { label: 'Setembro', value: 9 },
            { label: 'Outubro', value: 10 },
            { label: 'Novembro', value: 11 },
            { label: 'Dezembro', value: 12 },
        ]
    }

    obterListaTipo() {
        return [
            { label: 'Selecione...', value: '' },
            { label: 'Despesa', value: 'DESPESA' },
            { label: 'Receita', value: 'RECEITA' },
        ]
    }

    validar(lancamento) {
        const erros = [];

        if (!lancamento.ano) {
            erros.push("Informe o ano.");
        }

        if (!lancamento.mes) {
            erros.push("informe o mês.");
        }

        if (!lancamento.descricao) {
            erros.push("Informe a descrição.")
        }

        if (!lancamento.valor) {
            erros.push("Informe o valor.")
        }

        if (!lancamento.tipo) {
            erros.push("Informe o tipo.")
        }

        if (erros && erros.length > 0) {
            throw new ErroValidacao(erros);
        }
    }


    salvar(lancamento) {
        return this.post('/', lancamento);
    }

    atualizar(lancamento) {
        return this.put(`/${lancamento.id}`, lancamento);
    }

    obterPorId(id) {
        return this.get(`/${id}`);
    }

    alterarStatus(id, status) {
        return this.put(`/${id}/atualiza-status`, { status });
    }

    consultar(lancamentosFiltros) {
        let params = `?ano=${lancamentosFiltros.ano}`;

        if (lancamentosFiltros.mes) {
            params = `${params}&mes=${lancamentosFiltros.mes}`;
        }

        if (lancamentosFiltros.tipo) {
            params = `${params}&tipo=${lancamentosFiltros.tipo}`;
        }

        if (lancamentosFiltros.status) {
            params = `${params}&status=${lancamentosFiltros.status}`;
        }

        if (lancamentosFiltros.usuario) {
            params = `${params}&usuario=${lancamentosFiltros.usuario}`;
        }

        if (lancamentosFiltros.descricao) {
            params = `${params}&descricao=${lancamentosFiltros.descricao}`;
        }

        return this.get(params);
    }

    deletar(id) {
        return this.delete(`/${id}`);
    }

}
export default LancamentoService;