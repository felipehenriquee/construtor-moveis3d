export class Objetos{
    armario ={
        nome: "Armário",
        local: "model/glb/armario80.glb",
        colocarCima: false,
        colocarDireita: true,
        colocarEsquerda: true,
        tipo: "cima",
        tamanhox: 1,
        tamanhoy: 1,
        botao: null
    }
    balcao ={
        nome: "Balcão",
        local: "model/glb/balcao80.glb",
        colocarCima: true,
        colocarDireita: true,
        colocarEsquerda: true,
        tipo: "chao",
        tamanhox: 1,
        tamanhoy: 1,
        botao: null
    }
    balcaoGrande ={
        nome: "Balcão Grande",
        local: "model/glb/balcao120.glb",
        colocarCima: true,
        colocarDireita: true,
        colocarEsquerda: true,
        tipo: "chao",
        tamanhox: 2,
        tamanhoy: 1,
        botao: null
    }
    paneleiro = {
        nome: "Paneleiro",
        local: "model/glb/paneleiro.glb",
        colocarCima: false,
        colocarDireita: true,
        colocarEsquerda: true,
        tipo: "chao",
        tamanhox: 1,
        tamanhoy: 2,
        botao: null
    }
    armarioGrande ={
        nome: "Armário Grande",
        local: "model/glb/armario120.glb",
        colocarCima: true,
        colocarDireita: true,
        colocarEsquerda: true,
        tipo: "cima",
        tamanhox: 2,
        tamanhoy: 1,
        botao: null
    }
    todosObjetos = [
        this.armario, this.armarioGrande, this.balcao, this.balcaoGrande, this.paneleiro
    ]
}