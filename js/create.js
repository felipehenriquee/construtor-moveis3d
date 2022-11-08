
import * as THREE from 'three';
// import Stats from './../node_modules/three/examples/jsm/libs/stats.module.js';
import { OrbitControls } from './../node_modules/three/examples/jsm/controls/OrbitControls.js';
import { RoomEnvironment } from './../node_modules/three/examples/jsm/environments/RoomEnvironment.js';
import { GLTFLoader } from './../node_modules/three/examples/jsm/loaders/GLTFLoader.js';
import { DRACOLoader } from './../node_modules/three/examples/jsm/loaders/DRACOLoader.js';
import { CSS2DRenderer } from './../node_modules/three/examples/jsm/renderers/CSS2DRenderer.js';
import { CSS2DObject } from './../node_modules/three/examples/jsm/renderers/CSS2DRenderer.js';
import { CSS3DRenderer } from './../node_modules/three/examples/jsm/renderers/CSS3DRenderer.js';
import { CSS3DObject } from './../node_modules/three/examples/jsm/renderers/CSS3DRenderer.js';
import { Objetos } from './objects.js';

let ids = []
let idsCima = []
let botoes3d = []
let botoes3dCima = []

// import { Projector } from './node_modules/three/examples/jsm/loaders/DRACOLoader.js';

// Configurando a cena
const scene = new THREE.Scene();
scene.background = new THREE.Color(0xE5E5E5)

// Camera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight,0.1,1000);
camera.position.set(0,0,5);

// Renderizador
const renderer = new THREE.WebGLRenderer({antialias: true });
let labelRenderer = new CSS2DRenderer();
let botoesRenderer = new CSS3DRenderer();

// Tamanho da tela
renderer.setSize(window.innerWidth, window.innerHeight);
botoesRenderer.setSize(window.innerWidth, window.innerHeight);
botoesRenderer.domElement.style.position = 'absolute';
botoesRenderer.domElement.style.top = '0px';

// Linkando o renderizador
document.body.appendChild(renderer.domElement);
document.body.appendChild( labelRenderer.domElement );
document.body.appendChild( botoesRenderer.domElement );

// camera rotacao
const controls = new OrbitControls( camera, botoesRenderer.domElement );
controls.update();

// melhorar apresentação do modelo
const pmremGenerator = new THREE.PMREMGenerator( renderer );
scene.environment = pmremGenerator.fromScene( new RoomEnvironment(), 0.04 ).texture;
scene.updateMatrixWorld(true);

// Instanciando o loader
const loader = new GLTFLoader();
const raycaster = new THREE.Raycaster();
const pointer = new THREE.Vector2();
const geometry =  new  THREE.BoxGeometry();
const material = new THREE.MeshBasicMaterial({color: 0x00ff00});

// adicionar primeiro cubo
const cube = new THREE.Mesh(geometry, material)
const cubos = [];

// criação menu
const menuDiv = document.createElement( 'div' );
menuDiv.className = 'label';
// menuDiv.className = 'hide';

// criação do cabecalho do menu
const cabecalhoDiv = document.createElement( 'div' );
cabecalhoDiv.className = 'cabecalho';
const selectCabecalho = document.createElement( 'select' );

const optionCabecalho = document.createElement( 'option' );
optionCabecalho.value = "1"
optionCabecalho.innerText = "Conjunto Camponesa"
selectCabecalho.appendChild(optionCabecalho)

cabecalhoDiv.appendChild(selectCabecalho)

// criação do conteudo do menu
const conteudoDiv = document.createElement( 'div' );

conteudoDiv.className = 'conteudo';
menuDiv.appendChild(cabecalhoDiv)
menuDiv.appendChild(conteudoDiv)
let objetos = new Objetos();
let botoes = []
let divCadaModelo = []
for (let i = 0; i < objetos.todosObjetos.length; i++) {

	const cadaModelo = document.createElement( 'div' );
	const tituloModelo = document.createElement( 'h1' );
	const cadaBotao = document.createElement( 'div' );
	tituloModelo.textContent = objetos.todosObjetos[i].nomeMovel
	cadaModelo.className = 'centralizado';
	cadaBotao.className = 'centralizado';
	cadaModelo.className = 'cadaModelo';
	cadaBotao.className = 'cadaBotao';

	cadaModelo.appendChild(tituloModelo)
	cadaModelo.appendChild(cadaBotao)
	if (divCadaModelo.length==0){
		divCadaModelo.push({
			cadaModelo, movel: objetos.todosObjetos[i].movel, 
			tipo: objetos.todosObjetos[i].tipo, 
			tamanhox: objetos.todosObjetos[i].tamanhox, 
			tamanhoy: objetos.todosObjetos[i].tamanhoy})
		
		conteudoDiv.appendChild(cadaModelo)
	}
	else{
		let encontrou = 0;
		for (let j = 0; j < divCadaModelo.length; j++) {
			if(divCadaModelo[j].movel==objetos.todosObjetos[i].movel) encontrou++;
			
		}
		if (encontrou==0){
			divCadaModelo.push({
				cadaModelo, movel: objetos.todosObjetos[i].movel, 
				tipo: objetos.todosObjetos[i].tipo, 			
				tamanhox: objetos.todosObjetos[i].tamanhox, 
				tamanhoy: objetos.todosObjetos[i].tamanhoy})
			conteudoDiv.appendChild(cadaModelo)
		}
	}
	
}

for (let i = 0; i < objetos.todosObjetos.length; i++) {
	const button = document.createElement( 'button' );

	button.className = 'botaoEscolha backgroundImage';
	button.style.backgroundImage =  `url('${objetos.todosObjetos[i].img}')`
	button.addEventListener('pointerdown', function(event){
		movelEscolhido = {tipo: objetos.todosObjetos[i].tipo=="chao" ? "chao" : "cima", tamanhox: objetos.todosObjetos[i].tamanhox}
		corEscolhida = "#E56399";
		
		removeButton.classList.add('hide')

		if (ids.length==0 || idsCima.length==0) criaObjeto(objetos.todosObjetos[i])
		// menuDiv.classList.add("hide");
		else {
			
			modeloEscolhido = objetos.todosObjetos[i]
			
			verificaPosBotoes()
		}
		adicionaCubo = false;
		
	});
	botoes.push({button, tipo: objetos.todosObjetos[i].tipo=="chao" ? "chao" : "cima", tamanhox: objetos.todosObjetos[i].tamanhox})
	for (let j = 0; j < divCadaModelo.length; j++) {
		if(divCadaModelo[j].movel==objetos.todosObjetos[i].movel){
			divCadaModelo[j].cadaModelo.lastChild.appendChild(button)
		}
		
	}
	
	
}

let corEscolhida = "#ffffff";
let positionEscolhida = "#ffffff";
let xEscolhido = 0;
let yEscolhido = 0;
let uuidEscolhido = "";
let uuidEscolhidoTemporario = "";
let adicionaCubo = false;
let ladoEscolhido;
let ladoEscolhidoTemporario;
let modeloEscolhido
let indexEscolhido;
let indexEscolhidoTemporario;
let indexAntigo;
let valorLargura = 0;
let valorAltura = 0;
let valorProfundidade = 0;
let tamanhoCamera = 8;

let movelEscolhido;
const menuLabel = new CSS2DObject( menuDiv );

const btnCompartilhar = document.createElement( 'button' );
btnCompartilhar.className = 'backgroundImage btnCompartilhar ';
const botaoCompartilhar = new CSS2DObject( btnCompartilhar );

const btnVoltar = document.createElement( 'button' );
btnVoltar.className = 'backgroundImage btnCompartilhar btnVoltar';
const botaoVoltar = new CSS2DObject( btnVoltar );

const btnRa = document.createElement( 'button' );
btnRa.className = 'backgroundImage btnCompartilhar btnRa';
const botaoRa = new CSS2DObject( btnRa);

const removeButton = document.createElement( 'button' );
removeButton.className = 'btnRemove backgroundImage hide';
removeButton.addEventListener('pointerdown', function(event){

	indexEscolhido = indexEscolhido
	remove()
	
	// addButtonEsquerda.classList.add("hide")
	// addButtonCima.classList.add("hide")
	// addButtonBaixo.classList.add("hide")
	removeButton.classList.add('hide')
});
const btnRemove = new CSS3DObject( removeButton );
btnRemove.scale.set(0.01, 0.01, 1)
btnRemove.position.setZ(0.6)

const addButton = document.createElement( 'button' );
addButton.className = 'btnAdd backgroundImage addMain';
addButton.addEventListener('pointerdown', function(event){
	uuidEscolhido = uuidEscolhidoTemporario;
	// if (ladoEscolhidoTemporario=="esquerda"){
	// 	xEscolhido = -1;
	// 	yEscolhido = 0
	// 	adicionaCubo = true;
	// 	ladoEscolhido = "esquerda"
	// 	indexEscolhido = indexEscolhidoTemporario
	// }
	// else if (ladoEscolhidoTemporario=="direita"){
	// 	xEscolhido = 1;
	// 	yEscolhido = 0
	// 	adicionaCubo = true;
	// 	ladoEscolhido = "direita"
	// 	indexEscolhido = indexEscolhidoTemporario
	// }
	// else if (ladoEscolhidoTemporario=="cima"){
		
	// 	xEscolhido = 0;
	// 	yEscolhido = 1;
	// 	adicionaCubo = true;
	// 	ladoEscolhido = "cima";
	// 	indexEscolhido = indexEscolhidoTemporario
	// }
	mostraMenu()

	
});
const btnAdd = new CSS3DObject( addButton );
btnAdd.scale.set(0.01, 0.01, 1)
btnAdd.position.setZ(0.6)
btnAdd.position.setX(-1.5)


const addButtonBaixo = document.createElement( 'button' );
addButtonBaixo.className = 'btnAdd backgroundImage hide';
addButtonBaixo.addEventListener('pointerdown', function(event){
	
	xEscolhido = 0;
	yEscolhido = -1;
	adicionaCubo = true;
	ladoEscolhido = "baixo";
	indexEscolhido = indexEscolhidoTemporario
	mostraMenu()

	
});

const info = document.createElement( 'div' )
info.classList.add('infoTamanho')
const largura  = document.createElement( 'p' )
largura.innerText = "Largura: "+valorLargura
const altura  = document.createElement( 'p' )
altura.innerText = "Altura: " + valorAltura

const profundidade  = document.createElement( 'p' )
profundidade.innerText = "Profundidade: " + valorProfundidade

info.appendChild(largura)
info.appendChild(altura)
info.appendChild(profundidade)


const divInfoTamanho = new CSS2DObject( info );
divInfoTamanho.name = "infoTamanho"
scene.add( menuLabel );
scene.add( botaoCompartilhar );
scene.add( btnRemove );
scene.add( btnAdd );
scene.add( botaoVoltar );
scene.add( botaoRa );
scene.add( divInfoTamanho )

// Instantiate a loader
// Optional: Provide a DRACOLoader instance to decode compressed mesh data
const dracoLoader = new DRACOLoader();
dracoLoader.setDecoderPath( './node_modules/three/examples/js/libs/draco/' );
loader.setDRACOLoader( dracoLoader );
// Load a glTF resource

const closeButton = document.createElement( 'button' );
closeButton.textContent = "X"
closeButton.className = 'botaoFechar';
closeButton.addEventListener('pointerdown', function(event){
	menuDiv.classList.add("hide");
});

// menuDiv.appendChild(removeButton)
// menuDiv.appendChild(addButton)
// menuDiv.appendChild(closeButton)

// criaObjetos

function criaObjeto(modelo, x, y){
	
	loader.load(
		// resource URL
		modelo.local,
		// called when the resource is loaded
		function ( gltf ) {
	
			scene.add( gltf.scene );
			let cube1BB = new THREE.Box3(new THREE.Vector3(), new THREE.Vector3());
			cube1BB.setFromObject(gltf.scene)
			
			gltf.scene.box3 = cube1BB;
			let tamanhox = cube1BB.max.x - cube1BB.min.x;
			valorLargura = (valorLargura + tamanhox)
			
			largura.innerText = "Largura: "+valorLargura.toFixed(2)

			let tamanhoy = cube1BB.max.y - cube1BB.min.y;
			let tamanhoz = cube1BB.max.z - cube1BB.min.z;
			valorAltura = tamanhoy
			valorProfundidade = tamanhoz
			altura.innerText = "Altura: "+valorLargura.toFixed(2) +"m"
			profundidade.innerText = "Profundidade: "+valorProfundidade.toFixed(2) +"m"
			
			gltf.scene.userData = {
				modelo: modelo,
				centro: true,
				centroDireita: false,
				centroEsquerda: false,
				tamanho: {
					iniciox: cube1BB.min.x,
					fimx: cube1BB.max.x,
					inicioy: cube1BB.min.y,
					fimy: cube1BB.max.y,
					totalx: tamanhox,
					totaly: tamanhoy,
					totalz: tamanhoz
				},

				
			}
			// gltf.scene.position.setY(gltf.scene.position.y+(gltf.scene.position.y - cube1BB.min.y))

			
			gltf.scene.name = modelo.nome
			gltf.scene.position.setX(-1.5)
			if (modelo.tamanhoy==1){
				modelo.tipo=="chao" ? ids.push(gltf.scene.id) : idsCima.push(gltf.scene.id)
				modelo.tipo=="chao" ? criaCuboCima(true) : criaCubo(true)
				
			}
			else {
				
				ids.push(gltf.scene.id)
				idsCima.push(gltf.scene.id)
				
			}
			
			let botao = {
				direita: "",
				esquerda: "",
				cima: "",
				baixo: "",
			}
			let botaoCima = {
				direita: "",
				esquerda: "",
				cima: "",
				baixo: "",
			}
		
			botoes3d.push(botao)
			botoes3dCima.push(botaoCima)
			
			createButtonAdd(1,0, scene.getObjectById(ids[0]), 0, "chao")

			createButtonAdd(-1, 0, scene.getObjectById(ids[0]), 0, "chao")
			createButtonAdd(0, 1, scene.getObjectById(ids[0]), 0, "chao")
			
			

			createButtonAdd(1,0, scene.getObjectById(idsCima[0]), 0,"cima")

			createButtonAdd(-1, 0, scene.getObjectById(idsCima[0]), 0,  "cima")
			createButtonAdd(0, 1, scene.getObjectById(idsCima[0]), 0, "cima")
			if (ids.length>0  && idsCima.length>0) addButton.classList.add('hide')

			
		},
		// called while loading is progressing
		function ( xhr ) {
	
		
			if (( xhr.loaded / xhr.total * 100 ) == 100){
				
			}
	
		},
		// called when loading has errors
		function ( error ) {
	
			console.log( 'An error happened' );
	
		}
	);
	
}
function criaObjetoChao(modelo, px, py){
	
	loader.load(
		// resource URL
		modelo.local,
		// called when the resource is loaded
		function ( gltf ) {
	
			scene.add( gltf.scene );
			let cube2BB = new THREE.Box3(new THREE.Vector3(), new THREE.Vector3());
			cube2BB.setFromObject(gltf.scene)
			gltf.scene.box3 = cube2BB;
			let cubeEscolhido = scene.getObjectById(uuidEscolhido);

			let tamanhox = cube2BB.max.x - cube2BB.min.x;
			valorLargura = valorLargura + tamanhox
			
			largura.innerText = "Largura: "+valorLargura.toFixed(2) +"m"
			let tamanhoy = cube2BB.max.y - cube2BB.min.y;
			valorAltura = tamanhoy
			

			const tamanhoz = cube2BB.max.z - cube2BB.min.z;
			valorProfundidade = tamanhoz
			profundidade.innerText = "Profundidade: "+valorProfundidade.toFixed(2) +"m"
			altura.innerText = "Altura: "+valorAltura.toFixed(2) +"m"
			gltf.scene.position.setY(gltf.scene.position.y+(gltf.scene.position.y - cube2BB.min.y))

			gltf.scene.userData = {
				modelo,
				centro: false,
				centroDireita: false,
				centroEsquerda: false,
				tamanho: {
					iniciox: cube2BB.min.x,
					fimx: cube2BB.max.x,
					totalx: tamanhox,
					totaly: tamanhoy
				},

				
			}
			// gltf.scene.scale.x *= espelhoEscolhido;

			// direita
			if (px>0){
				
				let cubeDireita = ids[indexEscolhido+1] ? scene.getObjectById(ids[indexEscolhido+1]) : null
				if(cubeDireita && cubeDireita.name=="cubo"){
					scene.remove(cubeDireita)
				}
				ids[indexEscolhido+1] ? ids[indexEscolhido+1] = gltf.scene.id : ids.push(gltf.scene.id)

				gltf.scene.position.setX(cubeEscolhido.position.x+(cubeEscolhido.box3.max.x)+gltf.scene.box3.max.x);
				
			
				gltf.scene.userData.tamanho = {
					iniciox: cubeEscolhido.userData.tamanho.fimx,
					fimx: cubeEscolhido.userData.tamanho.fimx + tamanhox,
					inicioy: gltf.scene.box3.min.y,
					fimy: gltf.scene.box3.max.y,
					totalx: tamanhox,
					totaly: tamanhoy
				}
				gltf.scene.userData.esquerda = {
					preenchido: true,
					id: cubeEscolhido.id
				}

				cubeEscolhido.userData.direita = {
					preenchido: true,
					id: gltf.scene.id
				}
				if (!idsCima[indexEscolhido+1]) 
				modelo.tamanhoy==1 ? criaCuboCima(true) : idsCima.push(gltf.scene.id);
				let botao = {
					direita: "",
					esquerda: "",
					cima: "",
					baixo: "",
				}
				let botaoCima = {
					direita: "",
					esquerda: "",
					cima: "",
					baixo: "",
				}

				botoes3dCima[indexEscolhido+1] ? botoes3dCima[indexEscolhido+1] = botoes3dCima[indexEscolhido+1] : botoes3dCima.push(botaoCima)
				botoes3d[indexEscolhido+1] ? botoes3d[indexEscolhido+1] = botoes3d[indexEscolhido+1] : botoes3d.push(botao)
				createButtonAdd(1,0, gltf.scene, indexEscolhido+1, "chao")
				createButtonAdd(-1,0, gltf.scene, indexEscolhido+1, "chao")
				createButtonAdd(0,1, gltf.scene, indexEscolhido+1, "chao")

				createButtonAdd(1,0, scene.getObjectById(idsCima[indexEscolhido+1]), indexEscolhido+1, "cima")
				createButtonAdd(-1,0, scene.getObjectById(idsCima[indexEscolhido+1]), indexEscolhido+1, "cima")
				createButtonAdd(0,1, scene.getObjectById(idsCima[indexEscolhido+1]), indexEscolhido+1, "cima")
				
				moveCamera(1)
			}
			// esquerda
			else if (px<0){
				let cubeEsquerda = ids[indexEscolhido-1] ? scene.getObjectById(ids[indexEscolhido-1]) : null
				if(cubeEsquerda && cubeEsquerda.name=="cubo"){
					scene.remove(cubeEsquerda)
				}
				ids[indexEscolhido-1] ? ids[indexEscolhido-1] = gltf.scene.id : ids.unshift(gltf.scene.id)
				gltf.scene.userData.centroEsquerda = true;
				gltf.scene.position.setX(cubeEscolhido.position.x+(cubeEscolhido.box3.min.x)+gltf.scene.box3.min.x);

				cubeEscolhido.esquerda = {preenchido: true, id: gltf.scene.id};
				gltf.scene.userData.tamanho = {
					iniciox: cubeEscolhido.box3.min.x,
					fimx: cubeEscolhido.box3.min.x - tamanhox ,
					inicioy: gltf.scene.box3.min.y,
					fimy: gltf.scene.box3.max.y,
					totalx: tamanhox,
					totaly: tamanhoy
				}

				gltf.scene.userData.direita = {
					preenchido: true,
					id: cubeEscolhido.id
				}

				cubeEscolhido.userData.esquerda = {
					preenchido: true,
					id: gltf.scene.id
				}
				if(!idsCima[indexEscolhido-1]) modelo.tamanhoy==1 ? criaCuboCima(true) : idsCima.unshift(gltf.scene.id)

				let botao = {
					direita: "",
					esquerda: "",
					cima: "",
					baixo: "",
				}		
				
				let botaoCima = {
					direita: "",
					esquerda: "",
					cima: "",
					baixo: "",
				}	
			
				botoes3d[indexEscolhido-1] ? botoes[indexEscolhido-1] = botoes[indexEscolhido-1] : botoes3d.unshift(botao)
				botoes3dCima[indexEscolhido-1] ? botoes3dCima[indexEscolhido-1] = botoes3dCima[indexEscolhido-1] : botoes3dCima.unshift(botaoCima)
				createButtonAdd(1,0, gltf.scene, indexEscolhido-1<=0 ? 0 : indexEscolhido-1, "chao")
				createButtonAdd(-1,0, gltf.scene, indexEscolhido-1<=0 ? 0 : indexEscolhido-1, "chao")
				createButtonAdd(0,1, gltf.scene, indexEscolhido-1<=0 ? 0 : indexEscolhido-1, "chao")
			
				createButtonAdd(1,0, scene.getObjectById(idsCima[indexEscolhido-1>=0 ? indexEscolhido-1 : 0]), indexEscolhido-1>=0 ? indexEscolhido-1 : 0, "cima")
				createButtonAdd(-1,0, scene.getObjectById(idsCima[indexEscolhido-1>=0 ? indexEscolhido-1 : 0]), indexEscolhido-1>=0 ? indexEscolhido-1 : 0, "cima")
				createButtonAdd(0,1, scene.getObjectById(idsCima[indexEscolhido-1>=0 ? indexEscolhido-1 : 0]), indexEscolhido-1>=0 ? indexEscolhido-1 : 0, "cima")

				
				moveCamera(-1)
			}
			else if (py<0) {
				gltf.scene.userData.centroDireita = cubeEscolhido.userData.centroDireita
				gltf.scene.userData.centroEsquerda = cubeEscolhido.userData.centroEsquerda
				gltf.scene.userData.centro = cubeEscolhido.userData.centro

				let cubeRemover= scene.getObjectById(ids[indexEscolhido]);
				console.log(cubeRemover)
				scene.remove(cubeRemover)
				ids[indexEscolhido] = gltf.scene.id

				let cubeEsquerda = ids[indexEscolhido-1] ? scene.getObjectById(ids[indexEscolhido-1]) : null
				if(cubeEsquerda && cubeEsquerda.name=="cubo"){
					scene.remove(cubeEsquerda)
				}
		
				gltf.scene.position.setX(cubeEscolhido.position.x);

				gltf.scene.userData.tamanho = {
					iniciox: cubeEscolhido.box3.min.x,
					fimx: cubeEscolhido.box3.min.x - tamanhox ,
					inicioy: gltf.scene.box3.min.y,
					fimy: gltf.scene.box3.max.y,
					totalx: tamanhox,
					totaly: tamanhoy
				}

			
			}
			
			
		},
		// called while loading is progressing
		function ( xhr ) {
	
			
			if (( xhr.loaded / xhr.total * 100 ) == 100){
				console.log(scene)
			}
	
		},
		// called when loading has errors
		function ( error ) {
	
			console.log( 'An error happened' );
	
		}
	);
	
}

function criaObjetoCima(modelo, px, py, index){
	
	loader.load(
		// resource URL
		modelo.local,
		// called when the resource is loaded
		function ( gltf ) {
	
			scene.add( gltf.scene );			
			let cube1BB = new THREE.Box3(new THREE.Vector3(), new THREE.Vector3());
			cube1BB.setFromObject(gltf.scene)
			gltf.scene.box3 = cube1BB;
			let cubeEscolhido = scene.getObjectById(uuidEscolhido);

			
			const tamanhox = cube1BB.max.x - cube1BB.min.x;
			const tamanhoy = cube1BB.max.y - cube1BB.min.y;
			gltf.scene.userData = {
				modelo,
				centro: false,
				centroDireita: false,
				centroEsquerda: false,
				tamanho: {
					iniciox: cube1BB.min.x,
					fimx: cube1BB.max.x,
				},
				cima: {
					preenchido: false,
					id: ""
				},
				direita: {
					preenchido: false,
					id: ""
				},
				baixo: {
					preenchido: false,
					id: ""
				},
				esquerda: {
					preenchido: false,
					id: ""
				}
				
			}
			
			// direita
			if (px>0){
				
				let cubeDireita = idsCima[indexEscolhido+1] ? scene.getObjectById(idsCima[indexEscolhido+1]) : null;
				gltf.scene.userData.centroDireita = true
				cubeDireita ? idsCima[indexEscolhido+1] = gltf.scene.id : idsCima.push(gltf.scene.id)
				if (cubeDireita && cubeDireita.name=="cubo"){
					scene.remove(cubeDireita)

				}




				// gltf.scene.position.setX(cubeEscolhido.position.x+cubeEscolhido.userData.tamanho.fimx/2+tamanhox/2);
				gltf.scene.position.setX(cubeEscolhido.position.x+(cubeEscolhido.box3.max.x)+gltf.scene.box3.max.x);
				
				
				gltf.scene.userData.tamanho = {
					iniciox: cubeEscolhido.box3.max.x,
					fimx: cubeEscolhido.box3.min.x,
					inicioy: gltf.scene.box3.min.y,
					fimy: gltf.scene.box3.max.y
				}
				cubeEscolhido.direita = {preenchido: true, id: gltf.scene.id};
				if (!ids[indexEscolhido+1]){
					// ids[indexEscolhido+1] = 0;
					criaCubo(true)

				}
				let botao = {
					direita: "",
					esquerda: "",
					cima: "",
					baixo: "",
				}
				let botaoCima = {
					direita: "",
					esquerda: "",
					cima: "",
					baixo: "",
				}
				
				botoes3d[indexEscolhido+1] ? botoes3d[indexEscolhido+1] = botoes3d[indexEscolhido+1] : botoes3d.push(botao)
				createButtonAdd(1,0, scene.getObjectById(ids[indexEscolhido+1]), indexEscolhido+1, "chao")
				createButtonAdd(-1,0, scene.getObjectById(ids[indexEscolhido+1]), indexEscolhido+1, "chao")
				createButtonAdd(0,1, scene.getObjectById(ids[indexEscolhido+1]), indexEscolhido+1, "chao")

				botoes3dCima[indexEscolhido+1] ? botoes3dCima[indexEscolhido+1] = botoes3dCima[indexEscolhido+1] : botoes3dCima.push(botaoCima)
				createButtonAdd(1,0, scene.getObjectById(idsCima[indexEscolhido+1]), indexEscolhido+1, "cima")
				createButtonAdd(-1,0, scene.getObjectById(idsCima[indexEscolhido+1]), indexEscolhido+1, "cima")
				createButtonAdd(0,1, scene.getObjectById(idsCima[indexEscolhido+1]), indexEscolhido+1, "cima")
				
			}
			// esquerda
			else if (px<0){
				gltf.scene.userData.centroEsquerda = true
				
				let cubeEsquerda = idsCima[indexEscolhido-1] ? scene.getObjectById(idsCima[indexEscolhido-1]) : null;
				cubeEsquerda ? idsCima[indexEscolhido-1] = gltf.scene.id : idsCima.unshift(gltf.scene.id)
				if (cubeEsquerda && cubeEsquerda.name=="cubo"){
					scene.remove(cubeEsquerda)

				}

				gltf.scene.position.setX(cubeEscolhido.position.x-tamanhox);

				gltf.scene.position.setX(cubeEscolhido.position.x+(cubeEscolhido.box3.min.x)+gltf.scene.box3.min.x);


				gltf.scene.userData.tamanho = {
					iniciox: cubeEscolhido.box3.min.x,
					fimx: cubeEscolhido.box3.min.x - tamanhox ,
					inicioy: gltf.scene.box3.min.y,
					fimy: gltf.scene.box3.max.y
				}
				if (!ids[indexEscolhido-1]){
					// ids[indexEscolhido+1] = 0;
					criaCubo(true)

				}
				let botao = {
					direita: "",
					esquerda: "",
					cima: "",
					baixo: "",
					index: 0
				}
				let botaoCima = {
					direita: "",
					esquerda: "",
					cima: "",
					baixo: "",
					index: 0
				}
				
				botoes3d[indexEscolhido-1] ? botoes3d[indexEscolhido-1] = botoes3d[indexEscolhido-1] : botoes3d.unshift(botao)
				createButtonAdd(1,0, scene.getObjectById(ids[indexEscolhido-1>=0 ? indexEscolhido-1 : 0]), indexEscolhido-1>=0 ? indexEscolhido-1 : 0, "chao")
				createButtonAdd(-1,0, scene.getObjectById(ids[indexEscolhido-1>=0 ? indexEscolhido-1 : 0]), indexEscolhido-1>=0 ? indexEscolhido-1 : 0, "chao")
				createButtonAdd(0,1, scene.getObjectById(ids[indexEscolhido-1>=0 ? indexEscolhido-1 : 0]), indexEscolhido-1>=0 ? indexEscolhido-1 : 0, "chao")

				botoes3dCima[indexEscolhido-1] ? botoes3dCima[indexEscolhido-1] = botoes3dCima[indexEscolhido-1] : botoes3dCima.unshift(botaoCima)
				createButtonAdd(1,0, scene.getObjectById(idsCima[indexEscolhido-1>=0 ? indexEscolhido-1 : 0]), indexEscolhido-1>=0 ? indexEscolhido-1 : 0, "cima")
				createButtonAdd(-1,0, scene.getObjectById(idsCima[indexEscolhido-1>=0 ? indexEscolhido-1 : 0]), indexEscolhido-1>=0 ? indexEscolhido-1 : 0, "cima")
				createButtonAdd(0,1, scene.getObjectById(idsCima[indexEscolhido-1>=0 ? indexEscolhido-1 : 0]), indexEscolhido-1>=0 ? indexEscolhido-1 : 0, "cima")


				
			}
			// cima
			else if (py>0){
				gltf.scene.userData.centroDireita = cubeEscolhido.userData.centroDireita
				gltf.scene.userData.centroEsquerda = cubeEscolhido.userData.centroEsquerda
				gltf.scene.userData.centro = cubeEscolhido.userData.centro

				let cubeRemover= scene.getObjectById(idsCima[indexEscolhido]);

				scene.remove(cubeRemover)
				idsCima[indexEscolhido] = gltf.scene.id
				gltf.scene.position.setX(cubeEscolhido.position.x);

				gltf.scene.userData.tamanho = {
					iniciox: cubeEscolhido.box3.min.x,
					fimx: cubeEscolhido.box3.max.x ,
					inicioy: gltf.scene.box3.min.y,
					fimy: gltf.scene.box3.max.y
				}
				gltf.scene.userData.baixo = {
					preenchido: true,
					id: cubeEscolhido.id
				}

				cubeEscolhido.userData.cima = {
					preenchido: true,
					modelo: gltf.scene.id
				}
			}
			

			
		},
		// called while loading is progressing
		function ( xhr ) {
	
			
			if (( xhr.loaded / xhr.total * 100 ) == 100){
				console.log(scene)
			}
	
		},
		// called when loading has errors
		function ( error ) {
	
			console.log( 'An error happened' );
	
		}
	);
	
}

function remove(){
	const obj = scene.getObjectById(uuidEscolhido);
	
	let outroObj = obj.userData.modelo.tipo == "chao" ? scene.getObjectById(idsCima[indexEscolhido]) : scene.getObjectById(ids[indexEscolhido]);
	
	for (let i = 0; i < botoes3d.length; i++) {
		scene.getObjectById(botoes3d[i].direita).visible = false
		scene.getObjectById(botoes3d[i].esquerda).visible = false
		scene.getObjectById(botoes3d[i].cima).visible = false
		scene.getObjectById(botoes3dCima[i].direita).visible = false
		scene.getObjectById(botoes3dCima[i].esquerda).visible = false
		scene.getObjectById(botoes3dCima[i].cima).visible = false
		
	}

	let botoesApagar = {
		direita: botoes3d[indexEscolhido].direita,
		esquerda: botoes3d[indexEscolhido].esquerda,
		cima: botoes3d[indexEscolhido].cima,

	}
	let botoesApagarCima = {
		direita: botoes3dCima[indexEscolhido].direita,
		esquerda: botoes3dCima[indexEscolhido].esquerda,
		cima: botoes3dCima[indexEscolhido].cima,

	}

	
	if (obj.name == "cubo" ){
		console.log(obj.userData.tamanho.fimx-obj.userData.tamanho.iniciox )
		let valorSubtrair = (obj.userData.tamanho.fimx-obj.userData.tamanho.iniciox)< 0 ? (obj.userData.tamanho.fimx-obj.userData.tamanho.iniciox)*-1 : (obj.userData.tamanho.fimx-obj.userData.tamanho.iniciox)
		valorLargura = valorLargura - valorSubtrair
		largura.innerText = "Largura: "+valorLargura.toFixed(2) +"m"
		realocaModelo();
		
		
		scene.remove(outroObj);
		scene.remove(obj);
		scene.remove(botoesApagar.direita)
		scene.remove(botoesApagar.esquerda)
		scene.remove(botoesApagar.cima)
		scene.remove(botoesApagarCima.direita)
		scene.remove(botoesApagarCima.esquerda)
		scene.remove(botoesApagarCima.cima)
		
		
	}
	else{
		console.log(ids, idsCima)
		if (ids[indexEscolhido] == idsCima[indexEscolhido]) criaCuboCima()
		obj.userData.modelo.tipo == "chao" ? criaCubo() : criaCuboCima()
		console.log(ids, idsCima)
		
		scene.remove(obj);
		
	}
	indexAntigo = null
	if (ids.length==0  && idsCima.length==0) addButton.classList.remove('hide')

}

function realocaModelo(){
	
	let cubeApagar = scene.getObjectById(ids[indexEscolhido]);
	let tamanhoApagar = cubeApagar.userData.tamanho.fimx - cubeApagar.userData.tamanho.iniciox
	
	if (cubeApagar.userData.centroEsquerda){
		
		for (let i = indexEscolhido; i >= 0; i--) {
			let cubeAtual = scene.getObjectById(ids[i]);
			let cubeAtualCima = scene.getObjectById(idsCima[i]);
			if (i-1>=0){
				let cubeDireita =  scene.getObjectById(ids[i+1]);
				let cubeEsquerda = scene.getObjectById(ids[i-1]);
				let cubeDireitaCima =  scene.getObjectById(idsCima[i+1]);
				let cubeEsquerdaCima = scene.getObjectById(idsCima[i-1]);
				let cubeDireitaBotao =  scene.getObjectById(botoes3d[i-1].direita);
				let cubeEsquerdaBotao =  scene.getObjectById(botoes3d[i-1].esquerda);
				let cubeCimaBotao =  scene.getObjectById(botoes3d[i-1].cima);
				let cubeDireitaCimaBotao =  scene.getObjectById(botoes3dCima[i-1].direita);
				let cubeEsquerdaCimaBotao =  scene.getObjectById(botoes3dCima[i-1].esquerda);
				let cubeCimaCimaBotao =  scene.getObjectById(botoes3dCima[i-1].cima);
				let tamanho = cubeAtual.userData.tamanho.fimx - cubeAtual.userData.tamanho.iniciox;
				let tamanhoCima = cubeAtualCima.userData.tamanho.fimx - cubeAtualCima.userData.tamanho.iniciox;
				cubeEsquerda.userData.tamanho.fimx = cubeEsquerda.userData.tamanho.fimx - tamanho;
				cubeEsquerda.userData.tamanho.iniciox = cubeEsquerda.userData.tamanho.iniciox - tamanho;
				cubeEsquerda.position.setX(cubeEsquerda.position.x-tamanhoApagar);
				cubeDireita.userData.esquerda = cubeEsquerda.userData.esquerda;

				cubeEsquerdaCima.userData.tamanho.fimx = cubeEsquerdaCima.userData.tamanho.fimx - tamanhoCima;
				cubeEsquerdaCima.userData.tamanho.iniciox = cubeEsquerdaCima.userData.tamanho.iniciox - tamanhoCima;
				cubeEsquerdaCima.position.setX(cubeEsquerdaCima.position.x-tamanhoApagar);
				cubeDireitaCima.userData.esquerda = cubeEsquerdaCima.userData.esquerda;


				cubeDireitaBotao.position.x = cubeDireitaBotao.position.x - tamanhoApagar
				cubeEsquerdaBotao.position.x =cubeEsquerdaBotao.position.x - tamanhoApagar
				cubeCimaBotao.position.x =cubeCimaBotao.position.x - tamanhoApagar

				
				cubeDireitaCimaBotao.position.x = cubeDireitaCimaBotao.position.x - tamanhoApagar
				cubeEsquerdaCimaBotao.position.x =cubeEsquerdaCimaBotao.position.x - tamanhoApagar
				cubeCimaCimaBotao.position.x =cubeCimaCimaBotao.position.x - tamanhoApagar
			}
	
			else {
				let cubeEsquerda = scene.getObjectById(ids[i]);
				let cubeEsquerdaCima = scene.getObjectById(idsCima[i]);
				cubeEsquerda.userData.esquerda = cubeAtual.userData.esquerda;
				cubeEsquerdaCima.userData.esquerda = cubeAtualCima.userData.esquerda;


			}
	
			
		}
	}
	else{
		
		for (let i = indexEscolhido; i < ids.length; i++) {
			let cubeAtual = scene.getObjectById(ids[i]);
			let cubeAtualCima = scene.getObjectById(idsCima[i]);
			if (i+1<ids.length && i-1>0){
				let cubeDireita =  scene.getObjectById(ids[i+1]);
				let cubeDireitaCima =  scene.getObjectById(idsCima[i+1]);
				let cubeDireitaBotao =  scene.getObjectById(botoes3d[i+1].direita);
				let cubeEsquerdaBotao =  scene.getObjectById(botoes3d[i+1].esquerda);
				let cubeCimaBotao =  scene.getObjectById(botoes3d[i+1].cima);
				let cubeDireitaCimaBotao =  scene.getObjectById(botoes3dCima[i+1].direita);
				let cubeEsquerdaCimaBotao =  scene.getObjectById(botoes3dCima[i+1].esquerda);
				let cubeCimaCimaBotao =  scene.getObjectById(botoes3dCima[i+1].cima);
				let tamanho = cubeAtual.userData.tamanho.fimx - cubeAtual.userData.tamanho.iniciox;
				let tamanhoCima = cubeAtualCima.userData.tamanho.fimx - cubeAtualCima.userData.tamanho.iniciox;
				cubeDireita.userData.tamanho.iniciox = cubeDireita.userData.tamanho.iniciox - tamanho;
				cubeDireita.userData.tamanho.fimx = cubeDireita.userData.tamanho.fimx - tamanho;
				cubeDireita.position.x = cubeDireita.position.x-tamanhoApagar
				// cubeEsquerda.userData.direita = cubeDireita.userData.direita;

				cubeDireitaCima.userData.tamanho.iniciox = cubeDireitaCima.userData.tamanho.iniciox - tamanhoCima;
				cubeDireitaCima.userData.tamanho.fimx = cubeDireitaCima.userData.tamanho.fimx - tamanhoCima;
				cubeDireitaCima.position.x = cubeDireitaCima.position.x-tamanhoApagar
				cubeDireitaBotao.position.x = cubeDireitaBotao.position.x-tamanhoApagar
				cubeEsquerdaBotao.position.x = cubeEsquerdaBotao.position.x-tamanhoApagar
				cubeCimaBotao.position.x = cubeCimaBotao.position.x-tamanhoApagar

				
				cubeDireitaCimaBotao.position.x = cubeDireitaCimaBotao.position.x-tamanhoApagar
				cubeEsquerdaCimaBotao.position.x = cubeEsquerdaCimaBotao.position.x-tamanhoApagar
				cubeCimaCimaBotao.position.x = cubeCimaCimaBotao.position.x-tamanhoApagar

			}
			
			else if (i-1>0){
				
				let cubeEsquerda = scene.getObjectById(ids[i-1]);
				let cubeEsquerdaCima = scene.getObjectById(idsCima[i-1]);
				cubeEsquerda.userData.direita = cubeAtual.userData.direita;
				cubeEsquerdaCima.userData.direita = cubeAtualCima.userData.direita;

			}
			else if (i+1<ids.length){
				
				let cubeDireita = scene.getObjectById(ids[i+1]);
				let cubeDireitaCima = scene.getObjectById(idsCima[i+1]);
				let tamanho = cubeAtual.userData.tamanho.fimx - cubeAtual.userData.tamanho.iniciox;
				cubeDireita.userData.tamanho.iniciox = cubeDireita.userData.tamanho.iniciox - tamanho;
				cubeDireita.userData.tamanho.fimx = cubeDireita.userData.tamanho.fimx - tamanho;
				cubeDireita.position.x = cubeDireita.position.x-tamanhoApagar

				let tamanhoCima = cubeAtual.userData.tamanho.fimx - cubeAtualCima.userData.tamanho.iniciox;
				cubeDireitaCima.userData.tamanho.iniciox = cubeDireitaCima.userData.tamanho.iniciox - tamanhoCima;
				cubeDireitaCima.userData.tamanho.fimx = cubeDireitaCima.userData.tamanho.fimx - tamanhoCima;
				cubeDireitaCima.position.x = cubeDireitaCima.position.x-tamanhoApagar



			}
	
			
		}
	}
	

	ids.splice(indexEscolhido, 1);
	idsCima.splice(indexEscolhido, 1);
	botoes3d.splice(indexEscolhido, 1);
	botoes3dCima.splice(indexEscolhido, 1);
	



}

function criaCubo(embaixo = false, nome="cubo"){
	

	corEscolhida = "#000000";
	

	const material = new THREE.MeshBasicMaterial({color: corEscolhida, transparent: true, opacity: 0});
	
	console.log(ladoEscolhido)
	let cubeEscolhido = idsCima.length==1 ? scene.getObjectById(idsCima[0]) : scene.getObjectById(idsCima[indexEscolhido]);
	let cubeCima;
	if (ladoEscolhido=="esquerda") cubeCima =  idsCima.length==1 ? scene.getObjectById(idsCima[0]) : scene.getObjectById(idsCima[indexEscolhido]);
	else cubeCima =  idsCima.length==1 ? scene.getObjectById(idsCima[0]) : scene.getObjectById(idsCima[indexEscolhido+1]);

	
	const  geometry =  new  THREE.BoxGeometry(embaixo ?  cubeCima.box3.min.x-cubeCima.box3.max.x : cubeEscolhido.box3.min.x-cubeEscolhido.box3.max.x,0.86,1);
	const cube = new THREE.Mesh(geometry, material)
	
	scene.add(cube)
	
	
	let cube2BB = new THREE.Box3(new THREE.Vector3(), new THREE.Vector3());
	cube2BB.setFromObject(cube)

	cube.box3 = cube2BB;
	cube.position.setY(cube.position.y+(cube.position.y - cube2BB.min.y))
	cube.position.setX(cubeEscolhido.position.x)
	const tamanhox = cube2BB.max.x - cube2BB.min.x;
	const tamanhoy = cube2BB.max.y - cube2BB.min.y;
	cube.userData = {
		modelo: {tipo: "chao", tamanhox: cubeCima.userData.modelo.tamanhox, tamanhoy: cubeCima.userData.modelo.tamanhoy},
		centro: cubeEscolhido.userData.centro,
		centroDireita: cubeEscolhido.userData.centroDireita,
		centroEsquerda: cubeEscolhido.userData.centroEsquerda,
		tamanho: {
			iniciox: cubeEscolhido.userData.tamanho.iniciox,
			fimx: cubeEscolhido.userData.tamanho.fimx,
			inicioy: cubeEscolhido.userData.tamanho.inicioy,
			fimy: cubeEscolhido.userData.tamanho.fimy
		},
		cima: cubeEscolhido.userData.cima,
		direita: cubeEscolhido.userData.direita,
		baixo: cubeEscolhido.userData.baixo,
		esquerda: cubeEscolhido.userData.esquerda
		
	}
	
	// cube.position.setX(cubeEscolhido.position.x);
	// let index = embaixo ? idsCima.indexOf(cubeEscolhido.id) : ids.indexOf(cubeEscolhido.id)
	// console.log(cubeEscolhido.id)
	embaixo ? (ladoEscolhido=="esquerda" && indexEscolhido==0 ? ids.unshift(cube.id): ids.push(cube.id)) : ids[indexEscolhido] = cube.id ;

	// embaixo ? (ladoEscolhido=="esquerda" ? ids.unshift(cube.id) : ids.push(cube.id)) : ids[indexEscolhido] = cube.id;
	console.log(idsCima, ids)
	if (ladoEscolhido == "direita"){
		
		embaixo ? cube.position.setX(cubeCima.position.x) : cube.position.setX(cubeEscolhido.position.x);
		
		

	}
	else{
		console.log(cubeCima)

		embaixo ? cube.position.setX(cubeCima.position.x) : cube.position.setX(cubeEscolhido.position.x);

		
	}
	

	cube.position.getComponent(0);
	cube.name = "cubo"

	
}
function criaCuboCima(emcima= false, nome="cubo"){
	
	corEscolhida = "#000000";
	

	const material = new THREE.MeshBasicMaterial({color: corEscolhida, transparent: true, opacity: 0});
	
	console.log(ids.length)
	let cubeEscolhido = ids.length==1 ? scene.getObjectById(ids[0]) : scene.getObjectById(ids[indexEscolhido])
	
	let cubeBaixo = ids.length==1 ? scene.getObjectById(ids[0]) : scene.getObjectById(ids[indexEscolhido+1]);

	const  geometry =  new  THREE.BoxGeometry(emcima ? cubeBaixo.box3.min.x-cubeBaixo.box3.max.x : cubeEscolhido.box3.min.x-cubeEscolhido.box3.max.x,0.86,1);
	const cube = new THREE.Mesh(geometry, material)
	
	scene.add(cube)

	let cube2BB = new THREE.Box3(new THREE.Vector3(), new THREE.Vector3());
	cube2BB.setFromObject(cube)

	cube.box3 = cube2BB;
	cube.position.setY(cube.position.y+(cube.position.y - cube2BB.min.y)+1.44)
	
	cube.position.setZ(0.2)
	const tamanhox = cube2BB.max.x - cube2BB.min.x;
	const tamanhoy = cube2BB.max.y - cube2BB.min.y;
	cube.userData = {
		modelo: {tipo: "cima", tamanhox: cubeBaixo.userData.modelo.tamanhox, tamanhoy: cubeBaixo.userData.modelo.tamanhoy},
		centro: cubeEscolhido.userData.centro,
		centroDireita: cubeEscolhido.userData.centroDireita,
		centroEsquerda: cubeEscolhido.userData.centroEsquerda,
		tamanho: {
			iniciox: cubeEscolhido.userData.tamanho.iniciox,
			fimx: cubeEscolhido.userData.tamanho.fimx,
			inicioy: cubeEscolhido.userData.tamanho.inicioy,
			fimy: cubeEscolhido.userData.tamanho.fimy
		},
		cima: cubeEscolhido.userData.cima,
		direita: cubeEscolhido.userData.direita,
		baixo: cubeEscolhido.userData.baixo,
		esquerda: cubeEscolhido.userData.esquerda
		
	}
	
	// cube.position.setX(cubeEscolhido.position.x);
	
	emcima ? (ladoEscolhido=="esquerda" && indexEscolhido==0 ? idsCima.unshift(cube.id): idsCima.push(cube.id)) : idsCima[indexEscolhido] = cube.id ;

	
	if (ladoEscolhido == "direita"){
		
		emcima ? cube.position.setX(cubeBaixo.position.x) : cube.position.setX(cubeEscolhido.position.x);
		
		

	}
	else{
		
		emcima ? cube.position.setX(cubeBaixo.position.x) : cube.position.setX(cubeEscolhido.position.x);
		cube.position.setX(cubeEscolhido.position.x);

		
	}
	

	cube.position.getComponent(0);
	cube.name = nome

	
}

window.addEventListener('resize', function(){
	var width = window.innerWidth;
	var height = window.innerHeight;
	renderer.setSize(width, height)
	camera.aspect = width/height;
	camera.updateProjectionMatrix;
})

window.addEventListener('click', function(){


	// calculate pointer position in normalized device coordinates
	// (-1 to +1) for both components

	pointer.x = ( event.clientX / window.innerWidth ) * 2 - 1;
	pointer.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
	raycaster.setFromCamera( pointer, camera );
	var intersects = raycaster.intersectObjects( scene.children );

	if (intersects.length>0){
		menuDiv.classList.add("label");
		const position = intersects[0].object.position;
		uuidEscolhido = intersects[0].object.name == "cubo" ? intersects[0].object.id : intersects[0].object.parent.id;

		let cubeEscolhido = scene.getObjectById(uuidEscolhido);

		
		if(!cubeEscolhido.userData.tamanho){

			uuidEscolhido = intersects[0].object.parent.parent.id;
			cubeEscolhido = scene.getObjectById(uuidEscolhido);
		}

		removeButton.classList.add('hide')
		indexEscolhido = cubeEscolhido.userData.modelo.tipo=="chao" ? ids.indexOf(uuidEscolhido) : idsCima.indexOf(uuidEscolhido)
		
		let listaContraria = cubeEscolhido.userData.modelo.tipo == "chao" ? idsCima : ids
		// // cubeEscolhido.userData.modelo.tipo=="chao" && idsCima[indexEscolhidoTemporario] ? cButton.textContent = "X" : idsCima.length
		if (cubeEscolhido.name=="cubo"){
			removeButton.classList.add('hide')
			if (scene.getObjectById(listaContraria[indexEscolhido]).name == "cubo"){
				removeButton.classList.remove('hide')
				btnRemove.position.setY(cubeEscolhido.userData.modelo.tipo=="chao" ? cubeEscolhido.position.y-0.5: cubeEscolhido.position.y+0.5)
				btnRemove.position.setX(cubeEscolhido.position.x)
			}

		}
		else {
			removeButton.classList.remove('hide')
			btnRemove.position.setY(cubeEscolhido.userData.modelo.tipo=="chao" ? cubeEscolhido.position.y : cubeEscolhido.position.y+2.1)
			btnRemove.position.setX(cubeEscolhido.position.x)
		}

	}
	
	

})

// move mouse
function onPointerMove( event ) {
	
	pointer.x = ( event.clientX / window.innerWidth ) * 2 - 1;
	pointer.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
	raycaster.setFromCamera( pointer, camera );
	var intersects = raycaster.intersectObjects( scene.children );

	if (intersects.length>0){
		document.body.style.cursor = 'pointer'
		const position = intersects[0].object.position;
		uuidEscolhidoTemporario = intersects[0].object.parent.id;
		let cubeEscolhido = scene.getObjectById(uuidEscolhidoTemporario);

		if (intersects[0].object.name !="cubo" && intersects[0].object.name!="botao"){
			if (!indexAntigo || indexAntigo != uuidEscolhidoTemporario){
				if (indexAntigo){
					
				
					let cubeEscolhido = scene.getObjectById(indexAntigo);
					cubeEscolhido.children[cubeEscolhido.children.length>1 ? 1 : 0].material.opacity = 1
					cubeEscolhido.children[cubeEscolhido.children.length>1 ? 1 : 0].material.transparent = true
				}
				indexAntigo = uuidEscolhidoTemporario
			}
	
	
			
			
		
		
			cubeEscolhido.children[cubeEscolhido.children.length>1 ? 1 : 0].material.opacity = 0.5
			cubeEscolhido.children[cubeEscolhido.children.length>1 ? 1 : 0].material.transparent = true
		}
	}
	else {

		document.body.style.cursor = 'auto'
		if (indexAntigo){
			
		
			let cubeEscolhido = scene.getObjectById(indexAntigo);

			if (cubeEscolhido.name!="cubo" && cubeEscolhido!="botao"){

				cubeEscolhido.children[cubeEscolhido.children.length>1 ? 1 : 0].material.opacity = 1
				cubeEscolhido.children[cubeEscolhido.children.length>1 ? 1 : 0].material.transparent = true
			}

		}
	}


	


}
window.addEventListener( 'pointermove', onPointerMove );

function mostraMenu(modelo, posicao){
	// let posEscolhida = ladoEscolhido=="direita" ? 1 : -1
	// let lista = modeloEscolhido.tipo=="chao" ? ids : idsCima
	// let listaContraria = modeloEscolhido.tipo=="chao" ? idsCima : ids
	// menuDiv.classList.remove("hide");
	// for (let k = 0; k < botoes.length; k++) {
	// 	botoes[k].button.classList.add("hide")
		
	// }
	// for (let i = 0; i < divCadaModelo.length; i++) {
	// 	divCadaModelo[i].cadaModelo.classList.add("hide");
	// 	if(modeloEscolhido.tipo == "chao"){	
	// 	
	// 		if (ladoEscolhido == 'cima' && divCadaModelo[i].tipo == "cima"){

	// 			divCadaModelo[i].cadaModelo.classList.remove("hide");
	// 			for (let j = 0; j < botoes.length; j++) {
					
	// 				if (botoes[j].tamanhox==modeloEscolhido.tamanhox){
	// 					botoes[j].button.classList.remove("hide")

	// 				}

	// 			}
				
	// 		}
	// 		else if (ladoEscolhido == 'direita' ){
	// 			divCadaModelo[i].cadaModelo.classList.remove("hide");
	// 			if (modeloEscolhido.tamanhoy == 1  && divCadaModelo[i].tipo == "cima"){
	// 				divCadaModelo[i].cadaModelo.classList.add("hide");

	// 			}
	// 			let nome = lista[indexEscolhido+1] ? scene.getObjectById(lista[indexEscolhido+1]).name : "cubo"
	// 			if ( nome!="cubo" && divCadaModelo[i].tipo == "chao"){
	// 				divCadaModelo[i].cadaModelo.classList.add("hide");

	// 			}
	// 			if (listaContraria[indexEscolhido+1] && divCadaModelo[i].tipo == "cima"){
	// 				divCadaModelo[i].cadaModelo.classList.add("hide");

	// 			}
	// 			
	// 			if(listaContraria[indexEscolhido+1]){
					
	// 				if ( divCadaModelo[i].tamanhoy == 2) 
	// 				divCadaModelo[i].cadaModelo.classList.add("hide");
	// 			}
	// 			for (let j = 0; j < botoes.length; j++) {
					
	// 				if (botoes[j].tipo=="chao" || modeloEscolhido.tamanhoy>1){

	// 					botoes[j].button.classList.remove("hide")
	// 					if(listaContraria[indexEscolhido+1]){
	// 						if ( scene.getObjectById(listaContraria[indexEscolhido+1]).userData.modelo.tamanhox != botoes[j].tamanhox) 
	// 						botoes[j].button.classList.add("hide")

							
	// 					}
						
	// 				}

	// 			}
	// 		}
	// 		else if (ladoEscolhido == 'esquerda' ){
	// 			divCadaModelo[i].cadaModelo.classList.remove("hide");
	// 			if (modeloEscolhido.tamanhoy == 1  && divCadaModelo[i].tipo == "cima"){
	// 				divCadaModelo[i].cadaModelo.classList.add("hide");

	// 			}
	// 			let nome = lista[indexEscolhido-1] ? scene.getObjectById(lista[indexEscolhido-1]).name : "cubo"
	// 			if (nome!="cubo"  && divCadaModelo[i].tipo == "chao"){
	// 				divCadaModelo[i].cadaModelo.classList.add("hide");

	// 			}
	// 			if (listaContraria[indexEscolhido-1] && divCadaModelo[i].tipo == "cima"){
	// 				divCadaModelo[i].cadaModelo.classList.add("hide");

	// 			}
	// 			
	// 			if(listaContraria[indexEscolhido-1]){
					
	// 				if ( divCadaModelo[i].tamanhoy == 2) 
	// 				divCadaModelo[i].cadaModelo.classList.add("hide");
	// 			}
	// 			for (let j = 0; j < botoes.length; j++) {

	// 				if (botoes[j].tipo=="chao" || modeloEscolhido.tamanhoy>1){
					
	// 					botoes[j].button.classList.remove("hide")
	// 					if(listaContraria[indexEscolhido-1]){
	// 						if ( scene.getObjectById(listaContraria[indexEscolhido-1]).userData.modelo.tamanhox != botoes[j].tamanhox) 
	// 						botoes[j].button.classList.add("hide")

	// 					}
						
	// 				}

	// 			}
	// 		}
	// 	}
	// 	else {
			
	// 		if(ladoEscolhido == 'direita'){
	// 			divCadaModelo[i].cadaModelo.classList.remove("hide");
	// 			
	// 			if (divCadaModelo[i].tamanhoy == 1  && divCadaModelo[i].tipo == "chao"){
	// 				divCadaModelo[i].cadaModelo.classList.add("hide");

	// 			}
	// 			for (let j = 0; j < botoes.length; j++) {
					
	// 				if (botoes[j].tipo=="cima" || divCadaModelo[i].tamanhoy>1){
						
	// 					botoes[j].button.classList.remove("hide")
	// 					if(listaContraria[indexEscolhido+1] ){
	// 						if ( scene.getObjectById(listaContraria[indexEscolhido+1]).userData.modelo.tamanhox != botoes[j].tamanhox) 
	// 						botoes[j].button.classList.add("hide")

	// 						if (botoes[j].tamanhoy>1) botoes[j].button.classList.remove("hide")
	// 					}
	// 				}

	// 			}
	// 		}
	// 		else if(ladoEscolhido == 'esquerda' && divCadaModelo[i].tipo == "cima"){
	// 			divCadaModelo[i].cadaModelo.classList.remove("hide");
	// 			if (divCadaModelo[i].tamanhoy == 1  && divCadaModelo[i].tipo == "chao"){
	// 				divCadaModelo[i].cadaModelo.classList.add("hide");

	// 			}
	// 			for (let j = 0; j < botoes.length; j++) {
				
	// 				if (botoes[j].tipo=="cima" || divCadaModelo[i].tamanhoy>1){
					
	// 					botoes[j].button.classList.remove("hide")
	// 					if(listaContraria[indexEscolhido-1]){
	// 						if ( scene.getObjectById(listaContraria[indexEscolhido-1]).userData.modelo.tamanhox != botoes[j].tamanhox) 
	// 						botoes[j].button.classList.add("hide")
	// 					}
	// 				}

	// 			}
	// 		}
	// 		if(ladoEscolhido == 'baixo' && divCadaModelo[i].tipo == "chao") {
	// 			divCadaModelo[i].tamanhoy==1 ? divCadaModelo[i].cadaModelo.classList.remove("hide") : divCadaModelo[i].cadaModelo.classList.add("hide");
				
	// 			for (let j = 0; j < botoes.length; j++) {
					
	// 				if (botoes[j].tamanhox==modeloEscolhido.tamanhox){
	// 					botoes[j].button.classList.remove("hide")

	// 				}

	// 			}
	// 		}
	// 	}
		
	// }
}

function createButtonAdd(x=0, y=0, cubinho, i, tipo){
	
	if (x==1){
		const addButtonDireita = document.createElement( 'button' );
		addButtonDireita.className = 'btnAdd backgroundImage';
		

		addButtonDireita.addEventListener('pointerdown', function(event){
			xEscolhido = 1;
			yEscolhido = 0
			adicionaCubo = true;
			ladoEscolhido = "direita"
			
			pointer.x = ( event.clientX / window.innerWidth ) * 2 - 1;
			pointer.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
			raycaster.setFromCamera( pointer, camera );
			var intersects = raycaster.intersectObjects( scene.children );

			if (intersects.length>0){
				menuDiv.classList.add("label");
				const position = intersects[0].object.position;
				uuidEscolhido = intersects[0].object.name == "cubo" ? intersects[0].object.id : intersects[0].object.parent.id;

				let cubeEscolhido = scene.getObjectById(uuidEscolhido);

				
				if(!cubeEscolhido.userData.tamanho){

					uuidEscolhido = intersects[0].object.parent.parent.id;
					cubeEscolhido = scene.getObjectById(uuidEscolhido);
				}
				
				indexEscolhido = tipo=="chao" ? ids.indexOf(uuidEscolhido) : idsCima.indexOf(uuidEscolhido);
			}
			else {
				
				for (let k = 0; k < botoes3d.length; k++) {
					
					if(botoes3dCima[k].direita == window['btnDireita'].id){
						indexEscolhido = k
					
						uuidEscolhido = tipo == "chao" ? ids[indexEscolhido] : idsCima[indexEscolhido]
					}
					if(botoes3d[k].direita == window['btnDireita'].id){
						indexEscolhido = k
					
						uuidEscolhido = tipo == "chao" ? ids[indexEscolhido] : idsCima[indexEscolhido]
					}
					
				}

			}
			tipo=="chao" ? criaObjetoChao(modeloEscolhido, xEscolhido, yEscolhido) : criaObjetoCima(modeloEscolhido, xEscolhido, yEscolhido)
			for (let j = 0; j < tipo=="chao" ? botoes3d.length : botoes3dCima.length; j++) {
				const botaoDireita = scene.getObjectById(tipo=="chao" ? botoes3d[j].direita : botoes3dCima[j].direita);
				const botaoEsquerda = scene.getObjectById(tipo=="chao" ? botoes3d[j].esquerda : botoes3dCima[j].esquerda);
				const botaoCima = scene.getObjectById(botoes3d[j].cima);
				
				botaoDireita.visible=false 
				botaoEsquerda.visible=false 
				botaoCima.visible=false 
				
			}

		});
		window['btnDireita'] = new CSS3DObject( addButtonDireita );
		window['btnDireita'].scale.set(0.01, 0.01, 1)
		window['btnDireita'].position.setZ(0.6)
		window['btnDireita'].name = "botao"
		window['btnDireita'].visible = false;
		
		if (cubinho.name == "cubo"){
			
			window['btnDireita'].position.setX(cubinho.position.x+0.25)
			window['btnDireita'].position.setY(tipo == "chao" ? cubinho.position.y+0.05 : cubinho.position.y-0.27)

		}
		else{
		
			window['btnDireita'].position.setX(tipo == "chao" ? cubinho.position.x+0.25 : cubinho.position.x+0.3)
			window['btnDireita'].position.setY(tipo == "chao" ? cubinho.position.y+0.5 : cubinho.position.y+1.6)
			// btnAddDireita.position.setY(Math.floor(Math.random() * 2))

		}

		
		tipo=="chao" ? botoes3d[i].direita = window['btnDireita'].id : botoes3dCima[i].direita = window['btnDireita'].id;
		scene.add( window['btnDireita'] );
		
	}
	else if (x==-1){
		const addButtonEsquerda = document.createElement( 'button' );
		addButtonEsquerda.className = 'btnAdd backgroundImage';

 		const btnAddEsquerda = new CSS3DObject( addButtonEsquerda );
		 addButtonEsquerda.addEventListener('pointerdown', function(event){
			xEscolhido = -1;
			yEscolhido = 0
			adicionaCubo = true;
			ladoEscolhido = "esquerda"
			
			pointer.x = ( event.clientX / window.innerWidth ) * 2 - 1;
			pointer.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
			raycaster.setFromCamera( pointer, camera );
			var intersects = raycaster.intersectObjects( scene.children );

			if (intersects.length>0){
				menuDiv.classList.add("label");
				const position = intersects[0].object.position;
				uuidEscolhido = intersects[0].object.name == "cubo" ? intersects[0].object.id : intersects[0].object.parent.id;

				let cubeEscolhido = scene.getObjectById(uuidEscolhido);

				
				if(!cubeEscolhido.userData.tamanho){

					uuidEscolhido = intersects[0].object.parent.parent.id;
					cubeEscolhido = scene.getObjectById(uuidEscolhido);
				}
				
				indexEscolhido = tipo=="chao" ? ids.indexOf(uuidEscolhido) : idsCima.indexOf(uuidEscolhido);

			}
			else {
				
				for (let k = 0; k < botoes3d.length; k++) {
					
					if(botoes3dCima[k].esquerda == btnAddEsquerda.id){
						indexEscolhido = k
						
						uuidEscolhido = tipo == "chao" ? ids[indexEscolhido] : idsCima[indexEscolhido]
					}
					if(botoes3d[k].esquerda == btnAddEsquerda.id){
						indexEscolhido = k
						
						uuidEscolhido = tipo == "chao" ? ids[indexEscolhido] : idsCima[indexEscolhido]
					}
					
				}

			}
			tipo=="chao" ? criaObjetoChao(modeloEscolhido, xEscolhido, yEscolhido) : criaObjetoCima(modeloEscolhido, xEscolhido, yEscolhido)
			for (let j = 0; j < tipo=="chao" ? botoes3d.length : botoes3dCima.length; j++) {
				const botaoDireita = scene.getObjectById(tipo=="chao" ? botoes3d[j].direita : botoes3dCima[j].direita);
				const botaoEsquerda = scene.getObjectById(tipo=="chao" ? botoes3d[j].esquerda : botoes3dCima[j].esquerda);
				const botaoCima = scene.getObjectById(botoes3d[j].cima);
				
				botaoDireita.visible=false 
				botaoEsquerda.visible=false 
				botaoCima.visible=false 
				
			}
			
		});
		btnAddEsquerda.scale.set(0.01, 0.01, 1)
		btnAddEsquerda.position.setZ(0.6)
		btnAddEsquerda.name = "botao";
		btnAddEsquerda.visible = false;

		if (cubinho.name == "cubo"){
			btnAddEsquerda.position.setX(cubinho.position.x-0.25)
			btnAddEsquerda.position.setY(tipo == "chao" ? cubinho.position.y+0.05 : cubinho.position.y-0.27)

		}
		else{
			btnAddEsquerda.position.setX(tipo == "chao" ? cubinho.position.x-0.25 : cubinho.position.x-0.1)
			btnAddEsquerda.position.setY(cubinho.userData.modelo.tipo == "chao" ? cubinho.position.y+0.5 : cubinho.position.y+1.6)
			// btnAddDireita.position.setY(Math.floor(Math.random() * 2))

		}
		tipo=="chao" ? botoes3d[i].esquerda = btnAddEsquerda.id : botoes3dCima[i].esquerda = btnAddEsquerda.id;
		
		scene.add( btnAddEsquerda );
	}
	else if (y==1){
		const addButtonCima = document.createElement( 'button' );
		addButtonCima.className = 'btnAdd backgroundImage';

		const btnAddCima = new CSS3DObject( addButtonCima );

		addButtonCima.addEventListener('pointerdown', function(event){
			
			xEscolhido = 0;
			yEscolhido = 1;
			adicionaCubo = true;
			ladoEscolhido = "cima";
			
			pointer.x = ( event.clientX / window.innerWidth ) * 2 - 1;
			pointer.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
			raycaster.setFromCamera( pointer, camera );
			var intersects = raycaster.intersectObjects( scene.children );

			if (intersects.length>0){
				menuDiv.classList.add("label");
				const position = intersects[0].object.position;
				uuidEscolhido = intersects[0].object.name == "cubo" ? intersects[0].object.id : intersects[0].object.parent.id;

				let cubeEscolhido = scene.getObjectById(uuidEscolhido);

				
				if(!cubeEscolhido.userData.tamanho){

					uuidEscolhido = intersects[0].object.parent.parent.id;
					cubeEscolhido = scene.getObjectById(uuidEscolhido);
				}
				
				indexEscolhido = cubeEscolhido.userData.modelo.tipo=="chao" ? ids.indexOf(uuidEscolhido) : idsCima.indexOf(uuidEscolhido);

			}

			criaObjetoCima(modeloEscolhido, xEscolhido, yEscolhido)
			for (let j = 0; j < tipo=="chao" ? botoes3d.length : botoes3dCima.length; j++) {
				const botaoDireita = scene.getObjectById(tipo=="chao" ? botoes3d[j].direita : botoes3dCima[j].direita);
				const botaoEsquerda = scene.getObjectById(tipo=="chao" ? botoes3d[j].esquerda : botoes3dCima[j].esquerda);
				const botaoCima = scene.getObjectById(botoes3d[j].cima);
				
				botaoDireita.visible=false 
				botaoEsquerda.visible=false 
				botaoCima.visible=false 
				
			}
		
		});
		btnAddCima.scale.set(0.01, 0.01, 1)
		btnAddCima.position.setZ(0.6)
		
		btnAddCima.name = "botao"
		btnAddCima.visible = false;

		if (cubinho.name == "cubo"){
			btnAddCima.position.setX(cubinho.position.x+ 0.05)
			btnAddCima.position.setY(cubinho.position.y+0.75)

		}
		else{
			btnAddCima.position.setX(cubinho.position.x+ 0.05)
			btnAddCima.position.setY(cubinho.position.y+0.75)
			// btnAddDireita.position.setY(Math.floor(Math.random() * 2))

		}
		tipo=="chao" ? botoes3d[i].cima = btnAddCima.id : botoes3dCima[i].cima = btnAddCima.id;
		scene.add( btnAddCima );


	}
	else if ( y== -1){
		const btnAddBaixo = new CSS3DObject( addButtonBaixo );
		btnAddBaixo.scale.set(0.01, 0.01, 1)
		btnAddBaixo.position.setZ(0.6)
		btnAddBaixo.position.setX(-1.5)
		btnAddBaixo.name = "botao"
		scene.add( btnAddBaixo );

	}

}

function moveCamera(){
	
	console.log(camera.getFilmWidth())
	let objetoCenter = (ids.length-1)%2 == 0 ? scene.getObjectById(ids[(ids.length-1)/2]).position.x : scene.getObjectById(ids[Math.floor((ids.length-1)/2)]).position.x
	console.log((ids.length-1)/2, Math.floor((ids.length-1)/2))
	camera.position.x = camera.position.x + 0.4
	// camera.position.y = 0
	controls.target.x = controls.target.x + 0.4
	// controls.target.y = 0
	if (tamanhoCamera<valorLargura){
		camera.position.z = camera.position.z + 0.8
		controls.target.z = controls.target.z + 0.8
		camera.position.x = camera.position.x + 0.4
		controls.target.x = controls.target.x + 0.4
		tamanhoCamera = tamanhoCamera + 2
	}

	console.log(camera.position.x, valorLargura)
	// console.log(controls.object.rotation._x )
	// controls.object.rotateX(-6.1)
	// camera.position.setX(-0.2);
	

}


function verificaPosBotoes(){
	for (let i = 0; i < ids.length; i++) {

		const cubeEscolhido = scene.getObjectById(ids[i]);
		let botaoDireita = scene.getObjectById(botoes3d[i].direita);
		i==0 || i==ids.length-1 ? botaoDireita.visible=true : botaoDireita.visible = false		
		let botaoEsquerda = scene.getObjectById(botoes3d[i].esquerda);
		i==0 || i==ids.length-1 ? botaoEsquerda.visible=true : botaoEsquerda.visible = false
		let botaoCima = scene.getObjectById(botoes3d[i].cima);
		botaoCima.visible = false;

		let botaoDireitaCima = scene.getObjectById(botoes3dCima[i].direita);
		i==0 || i==ids.length-1 ? botaoDireitaCima.visible=true : botaoDireitaCima.visible = false		
		let botaoEsquerdaCima = scene.getObjectById(botoes3dCima[i].esquerda);
		i==0 || i==ids.length-1 ? botaoEsquerdaCima.visible=true : botaoEsquerdaCima.visible = false 
		let botaoCimaCima = scene.getObjectById(botoes3dCima[i].cima);
		botaoCimaCima.visible = false
		
		if (movelEscolhido.tipo=="chao"){
			
			botaoDireitaCima.visible = false
			botaoEsquerdaCima.visible = false 

		}
		if (movelEscolhido.tipo=="cima"){
			botaoDireita.visible = false
			botaoEsquerda.visible = false
			
			let cubeCima = scene.getObjectById(idsCima[i]);
			if (cubeCima.name=="cubo") botaoCima.visible = true
		}

		if (i+1<ids.length ){
			const cubeDireita = scene.getObjectById(ids[i+1]);
			const cubeDireitaCima = scene.getObjectById(idsCima[i+1]);

		
			if (movelEscolhido.tipo=="chao" && cubeDireita.name == "cubo" && cubeDireita.userData.modelo.tamanhox == movelEscolhido.tamanhox ) {
				botaoDireita.visible=true
			}
			else if (movelEscolhido.tipo=="cima" && cubeDireitaCima.name == "cubo" && cubeDireitaCima.userData.modelo.tamanhox == movelEscolhido.tamanhox ) {
				botaoDireitaCima.visible=true
			}
			else{
				botaoDireita.visible=false
				botaoDireitaCima.visible=false

			}
			
 

		}
		if (i-1>=0){
			
			
			const cubeEsquerda = scene.getObjectById(ids[i-1]);
			const cubeEsquerdaCima = scene.getObjectById(idsCima[i-1]);

			
			if (movelEscolhido.tipo=="chao" && cubeEsquerda.name == "cubo" && cubeEsquerda.userData.modelo.tamanhox == movelEscolhido.tamanhox ) {
				botaoEsquerda.visible=true
			}
			else if (movelEscolhido.tipo=="cima" && cubeEsquerdaCima.name == "cubo" && cubeEsquerdaCima.userData.modelo.tamanhox == movelEscolhido.tamanhox ) {
				botaoEsquerdaCima.visible=true
			}
			else{
				botaoEsquerda.visible=false
				botaoEsquerdaCima.visible=false

			}

		}


		
	}

}


function animate(){
	requestAnimationFrame(animate);

	labelRenderer.render( scene, camera );
	renderer.render(scene, camera);
	botoesRenderer.render(scene, camera);
	controls.update();


}
animate()





