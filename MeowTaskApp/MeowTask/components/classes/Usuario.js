export default class Usuario {
    constructor() {
        this.id = "";
        this.nome = "";
        this.email = "";
        this.senha = "";
        this.amigos = {};
        this.imagem = "";
    }

    getId() { return this.id; }
    setId(val) { this.id = val; }

    getNome() { return this.nome; }
    setNome(val) {
        if (typeof val === undefined) {
            throw "Nome de Usuário não pode estar vazio!";
        }
        if (val.length >= 8 && val.length <= 20) {
            this.nome = val;
        }
        else if (val.length < 8) {
            throw "Nome de Usuário deve ter ao menos 8 caracteres!";
        }
        else if (val.length > 20) {
            throw "Nome de Usuário não pode ter mais de 20 caracteres!";
        }
    }

    getEmail() { return this.email; }
    setEmail(val) {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (re.test(val.toLowerCase())) {
            this.email = val;
        }
        else
        {
            throw "Email inválido!";
        }
    }

    getSenha() { return this.senha; }
    setSenha(val) {
        if (val.length >= 8 && val.length <= 32) {
            this.senha = val;
        }
        else if (val.length < 8) {
            throw "Senha deve ter ao menos 8 caracteres!";
        }
        else if (val.length > 32) {
            throw "Senha deve ter no máximo 32 caracteres!"
        }
    }

    getAmigos() { return this.amigos; }
    setAmigos(val) { this.amigos = val; }
    addAmigos(val) { this.amigos.push(val); }
    remAmigos(val) { this.amigos = this.amigos.filter(item => item !== val); }

    getImagem() { return this.imagem; }
    setImagem(val) { this.imagem = val; }

    confirmarSenha(val) {
        if (this.senha != val) { throw "Confirmar Senha e Senha não conferem!" }
        return true;
    }
}