export class Objetos{
    armario ={
        nome: "Armário",
        local: "https://simplexr-vritems.s3.sa-east-1.amazonaws.com/teste01/02/AYFKE2/ARMARIO80.glb",
        colocarCima: false,
        colocarDireita: true,
        colocarEsquerda: true,
        tipo: "cima",
        tamanhox: 1,
        tamanhoy: 1,
        botao: null,
        movel: "armario",
        nomeMovel: "Armários",
        img: "https://firebasestorage.googleapis.com/v0/b/bird-9fcef.appspot.com/o/simplexr%2Fsimplexr-construtor%2FARMARIO80.png?alt=media&token=a487e084-b6b5-4aeb-abc5-051204fdf8bf"
    }
    balcao ={
        nome: "Balcão",
        local: "https://simplexr-vritems.s3.sa-east-1.amazonaws.com/teste01/02/DBPIRD/BALCAO80.glb",
        colocarCima: true,
        colocarDireita: true,
        colocarEsquerda: true,
        tipo: "chao",
        tamanhox: 1,
        tamanhoy: 1,
        botao: null,
        movel: "balcao",
        nomeMovel: "Balcões",
        img: "https://firebasestorage.googleapis.com/v0/b/bird-9fcef.appspot.com/o/simplexr%2Fsimplexr-construtor%2FBALCAO80.png?alt=media&token=f6c902af-1dc4-428e-9c30-0e16ca04c0a3"
    }
    balcaoGrande ={
        nome: "Balcão Grande",
        local: "https://simplexr-vritems.s3.sa-east-1.amazonaws.com/teste01/03/YZAI7P/BALCAO120.glb",
        colocarCima: true,
        colocarDireita: true,
        colocarEsquerda: true,
        tipo: "chao",
        tamanhox: 2,
        tamanhoy: 1,
        botao: null,
        movel: "balcao",
        nomeMovel: "Balcões",
        img: "https://firebasestorage.googleapis.com/v0/b/bird-9fcef.appspot.com/o/simplexr%2Fsimplexr-construtor%2FBALCAO120.png?alt=media&token=3e4421fc-c434-4c64-a95c-f279d6e593ba"
    }
    paneleiro = {
        nome: "Paneleiro",
        local: "https://simplexr-vritems.s3.sa-east-1.amazonaws.com/teste01/02/0BU3LE/PANELEIRO.glb",
        colocarCima: false,
        colocarDireita: true,
        colocarEsquerda: true,
        tipo: "chao",
        tamanhox: 1,
        tamanhoy: 2,
        botao: null,
        movel: "paneleiro",
        nomeMovel: "Paneleiros",
        img: "https://firebasestorage.googleapis.com/v0/b/bird-9fcef.appspot.com/o/simplexr%2Fsimplexr-construtor%2FPANELEIRO.png?alt=media&token=ec3b3429-eb03-44b8-b21d-ed17f1eec8ba"
    }

    armarioGrande ={
        nome: "Armário Grande",
        local: "https://simplexr-vritems.s3.sa-east-1.amazonaws.com/teste01/02/L4O3B9/ARMARIO120.glb",
        colocarCima: true,
        colocarDireita: true,
        colocarEsquerda: true,
        tipo: "cima",
        tamanhox: 2,
        tamanhoy: 1,
        botao: null,
        movel: "armario",
        nomeMovel: "Armários",
        img: "https://firebasestorage.googleapis.com/v0/b/bird-9fcef.appspot.com/o/simplexr%2Fsimplexr-construtor%2FARMARIO120.png?alt=media&token=1f650f89-d88f-4304-9a54-daee466efedf"
    }
    todosObjetos = [
        this.armario, this.armarioGrande, this.balcao, this.balcaoGrande, this.paneleiro
    ]
}