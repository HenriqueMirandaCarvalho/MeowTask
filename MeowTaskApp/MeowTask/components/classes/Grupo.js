export default class Grupo {
    constructor() {
        this.id = "";
        this.nome = "";
        this.membros = {};
        this.imagem = "";
    }

    getId() { return this.id; }
    setId(val) { this.id = val; }

    getNome() { return this.nome; }
    setNome(val) {
        if (val.length >= 5 && val.length <= 20) {
            this.nome = val;
        }
        else if (val.length < 5) {
            throw "Nome do Grupo deve ter ao menos 5 caracteres!";
        }
        else if (val.length > 20) {
            throw "Nome do Grupo não pode ter mais de 20 caracteres!";
        }
    }

    getMembros() { return this.membros; }
    setMembros(val) { this.membros = val; }
    addMembros(val) { this.membros.push(val); }
    remMembros(val) { this.membros = this.membros.filter(item => item !== val); }

    getImagem() { return this.imagem; }
    setImagem(val) { this.imagem = val; }
}