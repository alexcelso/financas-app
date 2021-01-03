import ApiService from '../apiservice';
import ErroValidacao from '../exception/erroValidacao';

class UsuarioService extends ApiService {
    constructor() {
        super('/api/usuarios')
    }

    autenticar(credenciais) {
        return this.post('/autenticar/', credenciais)
    }

    obterSaldoPorUsuario(id) {
        return this.get(`/${id}/saldo`);
    }

    salvar(usuario) {
        return this.post('/', usuario);
    }

    validar(usuario) {
        let erros = [];
        if (!usuario.nome) {
            erros.push('O campo Nome é obrigatório.');
        }

        if (!usuario.email) {
            erros.push('O campo Email é obrigatório.');
        } else if (!usuario.email.match(/^[a-z0-9.]+@[a-z0-9.]+\.[a-z]/)) {
            erros.push('Informe um e-mail válido.');
        }

        if (!usuario.senha || !usuario.senhaRepeticao) {
            erros.push('Repida a senha 2x.')
        } else if (usuario.senha !== usuario.senhaRepeticao) {
            erros.push('As senhas devem ser iguais.');
        }
        if (erros && erros.length > 0) {
            throw new ErroValidacao(erros);
        }
    }
}
export default UsuarioService;