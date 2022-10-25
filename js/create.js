
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

// import { Projector } from './node_modules/three/examples/jsm/loaders/DRACOLoader.js';

// Configurando a cena
const scene = new THREE.Scene();
scene.background = new THREE.Color(0xE5E5E5)

// Camera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight,0.1,1000);
camera.position.set(0,0,5);

// Renderizador
const renderer = new THREE.WebGLRenderer();
let labelRenderer = new CSS2DRenderer();
let botoesRenderer = new CSS3DRenderer();

// Tamanho da tela
renderer.setSize(window.innerWidth, window.innerHeight);
botoesRenderer.setSize(window.innerWidth, window.innerHeight);
botoesRenderer.domElement.style.position = 'absolute';
botoesRenderer.domElement.style.top = '0px';
console.log(renderer.domElement)
// Linkando o renderizador
document.body.appendChild(renderer.domElement);
document.body.appendChild( labelRenderer.domElement );
document.body.appendChild( botoesRenderer.domElement );

// camera rotacao
const controls = new OrbitControls( camera, botoesRenderer.domElement );
controls.minDistance = 5;
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
menuDiv.className = 'hide';

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
		divCadaModelo.push({cadaModelo, movel: objetos.todosObjetos[i].movel, tipo: objetos.todosObjetos[i].tipo})
		
		conteudoDiv.appendChild(cadaModelo)
	}
	else{
		let encontrou = 0;
		for (let j = 0; j < divCadaModelo.length; j++) {
			if(divCadaModelo[j].movel==objetos.todosObjetos[i].movel) encontrou++;
			
		}
		if (encontrou==0){
			divCadaModelo.push({cadaModelo, movel: objetos.todosObjetos[i].movel, tipo: objetos.todosObjetos[i].tipo})
			conteudoDiv.appendChild(cadaModelo)
		}
	}
	
}
console.log(divCadaModelo)
for (let i = 0; i < objetos.todosObjetos.length; i++) {
	const button = document.createElement( 'button' );

	button.className = 'botaoEscolha backgroundImage';
	button.style.backgroundImage =  `url('${objetos.todosObjetos[i].img}')`
	button.addEventListener('pointerdown', function(event){
		corEscolhida = "#E56399";
		
		addButton.classList.add('hide')
		removeButton.classList.add('hide')
		if (adicionaCubo && objetos.todosObjetos[i].tipo=="chao"){
			
			criaObjetoChao(objetos.todosObjetos[i], xEscolhido, yEscolhido)
		} 
		else if (adicionaCubo && objetos.todosObjetos[i].tipo=="cima"){
			
			criaObjetoCima(objetos.todosObjetos[i], xEscolhido, yEscolhido)
		}
		menuDiv.classList.add("hide");
		adicionaCubo = false;
	});
	botoes.push({button, tipo: objetos.todosObjetos[i].tipo, tamanhox: objetos.todosObjetos[i].tamanhox})
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
let adicionaCubo = true;
let ladoEscolhido;
let ladoEscolhidoTemporario;
let modeloEscolhido
let indexEscolhido;
let indexEscolhidoTemporario;
const menuLabel = new CSS2DObject( menuDiv );


const btnCompartilhar = document.createElement( 'button' );
btnCompartilhar.className = 'backgroundImage btnCompartilhar ';
const botaoCompartilhar = new CSS2DObject( btnCompartilhar );

const removeButton = document.createElement( 'button' );
removeButton.className = 'btnRemove backgroundImage hide';
removeButton.addEventListener('pointerdown', function(event){
	uuidEscolhido = uuidEscolhidoTemporario
	remove()
	removeButton.classList.add('hide')
});
const btnRemove = new CSS3DObject( removeButton );
btnRemove.scale.set(0.01, 0.01, 1)
btnRemove.position.setZ(0.6)





const addButton = document.createElement( 'button' );
addButton.className = 'btnAdd backgroundImage hide';
addButton.addEventListener('pointerdown', function(event){
	uuidEscolhido = uuidEscolhidoTemporario;
	if (ladoEscolhidoTemporario=="esquerda"){
		xEscolhido = -1;
		yEscolhido = 0
		adicionaCubo = true;
		ladoEscolhido = "esquerda"
	}
	else if (ladoEscolhidoTemporario=="direita"){
		xEscolhido = 1;
		yEscolhido = 0
		adicionaCubo = true;
		ladoEscolhido = "direita"
	}
	else if (ladoEscolhidoTemporario=="cima"){
		console.log(indexEscolhido, indexEscolhidoTemporario)
		xEscolhido = 0;
		yEscolhido = 1;
		adicionaCubo = true;
		ladoEscolhido = "cima";
		indexEscolhido = indexEscolhidoTemporario
	}
	mostraMenu()

	
});
const btnAdd = new CSS3DObject( addButton );
btnAdd.scale.set(0.01, 0.01, 1)
btnAdd.position.setZ(0.6)

scene.add( menuLabel );
scene.add( botaoCompartilhar );
scene.add( btnRemove );
scene.add( btnAdd );

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
menuDiv.appendChild(closeButton)

// criaObjetos

function criaObjeto(x, y){
	
	loader.load(
		// resource URL
		objetos.balcao.local,
		// called when the resource is loaded
		function ( gltf ) {
	
			scene.add( gltf.scene );
			


			let cube1BB = new THREE.Box3(new THREE.Vector3(), new THREE.Vector3());
			cube1BB.setFromObject(gltf.scene)
			
			gltf.scene.box3 = cube1BB;
			gltf.scene.userData = {
				modelo: objetos.balcao,
				centro: true,
				centroDireita: false,
				centroEsquerda: false,
				tamanho: {
					iniciox: cube1BB.min.x,
					fimx: cube1BB.max.x,
					inicioy: cube1BB.min.y,
					fimy: cube1BB.max.y,
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
			gltf.scene.position.setY(gltf.scene.position.y+(gltf.scene.position.y - cube1BB.min.y))
			
			gltf.scene.name = "first"
			ids.push(gltf.scene.id)
			idsCima.push(0)

			// console.log(cube1BB.getCenter())
		},
		// called while loading is progressing
		function ( xhr ) {
	
			// console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );
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
function criaObjetoChao(modelo, px, py){
	
	loader.load(
		// resource URL
		modelo.local,
		// called when the resource is loaded
		function ( gltf ) {
	
			scene.add( gltf.scene );
			let cube2BB = new THREE.Box3(new THREE.Vector3(), new THREE.Vector3());
			console.log(cube2BB)
			cube2BB.setFromObject(gltf.scene)
			gltf.scene.box3 = cube2BB;
			let cubeEscolhido = scene.getObjectById(uuidEscolhido);
			console.log(cubeEscolhido)
			const tamanhox = cube2BB.max.x - cube2BB.min.x;
			const tamanhoy = cube2BB.max.y - cube2BB.min.y;
			gltf.scene.position.setY(gltf.scene.position.y+(gltf.scene.position.y - cube2BB.min.y))
			gltf.scene.userData = {
				modelo,
				centro: false,
				centroDireita: false,
				centroEsquerda: false,
				tamanho: {
					iniciox: cube2BB.min.x,
					fimx: cube2BB.max.x,
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
				ids.push(gltf.scene.id)
				const teste = !idsCima[ids.length-1] ? idsCima.push(modelo.tamanhoy==1 ? 0 : gltf.scene.id) : idsCima[ids.length-1]
				gltf.scene.userData.centroDireita = true;
				// console.log(cubeEscolhido.userData.tamanho.fimx + tamanhox)
				gltf.scene.position.setX(cubeEscolhido.position.x+(cubeEscolhido.box3.max.x)+gltf.scene.box3.max.x);
				
			
				gltf.scene.userData.tamanho = {
					iniciox: cubeEscolhido.userData.tamanho.fimx,
					fimx: cubeEscolhido.userData.tamanho.fimx + tamanhox,
					inicioy: gltf.scene.box3.min.y,
					fimy: gltf.scene.box3.max.y
				}
				gltf.scene.userData.esquerda = {
					preenchido: true,
					id: cubeEscolhido.id
				}

				cubeEscolhido.userData.direita = {
					preenchido: true,
					id: gltf.scene.id
				}
				
			}
			// esquerda
			else if (px<0){
				ids.unshift(gltf.scene.id)
				const teste = !idsCima[ids.length-1] ? idsCima.unshift(1) : idsCima[ids.length-1]
				gltf.scene.userData.centroEsquerda = true;
				gltf.scene.position.setX(cubeEscolhido.position.x+(cubeEscolhido.box3.min.x)+gltf.scene.box3.min.x);

				cubeEscolhido.esquerda = {preenchido: true, id: gltf.scene.id};
				gltf.scene.userData.tamanho = {
					iniciox: cubeEscolhido.box3.min.x,
					fimx: cubeEscolhido.box3.min.x - tamanhox ,
					inicioy: gltf.scene.box3.min.y,
					fimy: gltf.scene.box3.max.y
				}

				gltf.scene.userData.direita = {
					preenchido: true,
					id: cubeEscolhido.id
				}

				cubeEscolhido.userData.esquerda = {
					preenchido: true,
					id: gltf.scene.id
				}
			}
			console.log(ids, idsCima)
			
			// console.log(gltf.scene)
			
			console.log(scene)
			// console.log(cube1BB.getCenter())
		},
		// called while loading is progressing
		function ( xhr ) {
	
			// console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );
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
	console.log('cria')
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
			// gltf.scene.position.set(xEscolhido, yEscolhido, 0);
			
			// if (cubeEscolhido.userData.modelo.tipo == "cima"){
			// 	gltf.scene.position.setY(cubeEscolhido.position.y);
			// }
			// else{
			// 	gltf.scene.position.setY(cubeEscolhido.position.y + 1.33);
			// }
			
			const tamanhox = cube1BB.max.x - cube1BB.min.x;
			const tamanhoy = cube1BB.max.y - cube1BB.min.y;
			gltf.scene.userData = {
				modelo,
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
			console.log(indexEscolhido)
			// direita
			if (px>0){
				
				idsCima[indexEscolhido] = gltf.scene.id
				console.log(cubeEscolhido.position.x+(cubeEscolhido.userData.tamanho.fimx/2)+tamanhox/2 )
				// gltf.scene.position.setX(cubeEscolhido.position.x+cubeEscolhido.userData.tamanho.fimx/2+tamanhox/2);
				gltf.scene.position.setX(cubeEscolhido.position.x+(cubeEscolhido.box3.max.x)+gltf.scene.box3.max.x);
				
				
				gltf.scene.userData.tamanho = {
					iniciox: cubeEscolhido.box3.max.x,
					fimx: cubeEscolhido.box3.min.x,
					inicioy: gltf.scene.box3.min.y,
					fimy: gltf.scene.box3.max.y
				}
				cubeEscolhido.direita = {preenchido: true, id: gltf.scene.id};
			}
			// esquerda
			else if (px<0){
				idsCima[indexEscolhido] = gltf.scene.id
				gltf.scene.position.setX(cubeEscolhido.position.x-tamanhox);

				gltf.scene.position.setX(cubeEscolhido.position.x+(cubeEscolhido.box3.min.x)+gltf.scene.box3.min.x);


				gltf.scene.userData.tamanho = {
					iniciox: cubeEscolhido.box3.min.x,
					fimx: cubeEscolhido.box3.min.x - tamanhox ,
					inicioy: gltf.scene.box3.min.y,
					fimy: gltf.scene.box3.max.y
				}
			}
			// cima
			else if (py>0){
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
			
			console.log(gltf.scene)
			console.log(cube1BB)
			console.log(scene)
			console.log(idsCima)
			// console.log(cube1BB.getCenter())
		},
		// called while loading is progressing
		function ( xhr ) {
	
			console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );
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
	if (obj.name == "cubo"){
		realocaModelo();
	}
	else{
		criaCubo()
		
	}
	scene.remove(obj);

}

function realocaModelo(){
	let index = ids.indexOf(uuidEscolhidoTemporario)
	let cubeApagar = scene.getObjectById(uuidEscolhidoTemporario);
	let tamanhoApagar = cubeApagar.userData.tamanho.fimx - cubeApagar.userData.tamanho.iniciox
	console.log(cubeApagar.userData)
	if (cubeApagar.userData.centroEsquerda){
		console.log('esquerdinha')
		for (let i = index; i >= 0; i--) {
			let cubeAtual = scene.getObjectById(ids[i]);
			if (i-1>=0){
				let cubeDireita =  scene.getObjectById(ids[i+1]);
				let cubeEsquerda = scene.getObjectById(ids[i-1]);
				let tamanho = cubeAtual.userData.tamanho.fimx - cubeAtual.userData.tamanho.iniciox;
				cubeEsquerda.userData.tamanho.fimx = cubeEsquerda.userData.tamanho.fimx - tamanho;
				cubeEsquerda.userData.tamanho.iniciox = cubeEsquerda.userData.tamanho.iniciox - tamanho;
				cubeEsquerda.position.setX(cubeEsquerda.position.x-tamanhoApagar);
				cubeDireita.userData.esquerda = cubeEsquerda.userData.esquerda;

			}
	
			else {
				let cubeEsquerda = scene.getObjectById(ids[i]);
				cubeEsquerda.userData.esquerda = cubeAtual.userData.esquerda;
			
			}
	
			
		}
	}
	else{
		console.log('direitinha')
		for (let i = index; i < ids.length; i++) {
			let cubeAtual = scene.getObjectById(ids[i]);
			if (i+1<ids.length && i-1>0){
				let cubeDireita =  scene.getObjectById(ids[i+1]);
				let cubeEsquerda = scene.getObjectById(ids[i-1]);
				console.log(cubeEsquerda.userData)
				let tamanho = cubeAtual.userData.tamanho.fimx - cubeAtual.userData.tamanho.iniciox;
				cubeDireita.userData.tamanho.iniciox = cubeDireita.userData.tamanho.iniciox - tamanho;
				cubeDireita.userData.tamanho.fimx = cubeDireita.userData.tamanho.fimx - tamanho;
				console.log(cubeAtual.userData.tamanho.fimx, cubeAtual.userData.tamanho.iniciox, tamanho)
				cubeDireita.position.x = cubeDireita.position.x-tamanhoApagar
				// cubeEsquerda.userData.direita = cubeDireita.userData.direita;
				console.log(cubeEsquerda.userData)
			}
			
			else if (i-1>0){
				console.log('entrou no else')
				let cubeEsquerda = scene.getObjectById(ids[i-1]);
				cubeEsquerda.userData.direita = cubeAtual.userData.direita;

			}
			else if (i+1<ids.length){
				console.log(i)
				let cubeDireita = scene.getObjectById(ids[i+1]);
				let tamanho = cubeAtual.userData.tamanho.fimx - cubeAtual.userData.tamanho.iniciox;
				cubeDireita.userData.tamanho.iniciox = cubeDireita.userData.tamanho.iniciox - tamanho;
				cubeDireita.userData.tamanho.fimx = cubeDireita.userData.tamanho.fimx - tamanho;
				cubeDireita.position.x = cubeDireita.position.x-tamanhoApagar



			}
	
			
		}
	}
	

	ids.splice(index, 1);
	console.log(ids)

	// while (temDireita == true ){
	// 	let cubeVerificar = scene.getObjectById(idVerificar);
	// 	console.log(cubeVerificar.userData)
	// 	if (cubeVerificar.userData.direita.preenchido){
	// 		let cubeDireita = scene.getObjectById(cubeVerificar.userData.direita.id);
	// 		console.log("direita", cubeVerificar.userData.esquerda)
	// 		let cubeEsquerda = scene.getObjectById(cubeVerificar.userData.esquerda.id);
	// 		console.log(cubeEsquerda)
	// 		// console.log(cubeEsquerda)
	// 		if (valorAntigo.status==true){ 
	// 			let temp = {x: cubeDireita.position.x}

	// 			cubeDireita.position.setX(valorAntigo.posx)
	// 			valorAntigo.posx = temp.x


	// 		}
	// 		else {
	// 			valorAntigo.posx = cubeDireita.position.x
	// 			cubeDireita.position.setX(cubeVerificar.position.x)
	// 		}
	// 		cubeDireita.userData.tamanho = cubeVerificar.userData.tamanho;
	// 		console.log(cubeEsquerda, cubeDireita.userData.direita)
	// 		cubeDireita.userData.esquerda.id = cubeEsquerda.id;
			
	// 		cubeEsquerda.userData.direita = {
	// 			preenchido: cubeDireita.userData.direita.preenchido,
	// 			id: cubeEsquerda.id,
	// 		} ;
	// 		idVerificar = cubeDireita.id;
	// 		console.log(idVerificar)
	// 		valorAntigo.status = true
			
	// 	}
	// 	else {
	// 		let cubeEsquerda = scene.getObjectById(cubeVerificar.userData.esquerda.id);
	// 		cubeEsquerda.userData.direita = cubeVerificar.userData.direita
	// 		temDireita = false;
	// 	}
		
	// }
	// while (temEsquerda == true ){
	// 	let cubeVerificar = scene.getObjectById(idVerificar);
	// 	console.log("esquerda", cubeVerificar.userData)

	// 	if (cubeVerificar.userData.esquerda.preenchido){
	// 		let cubeDireita = scene.getObjectById(cubeVerificar.userData.direita.id);
	// 		console.log(cubeVerificar.userData.esquerda)
	// 		let cubeEsquerda = scene.getObjectById(cubeVerificar.userData.esquerda.id);
	// 		console.log(cubeEsquerda)
	// 		// console.log(cubeEsquerda)
	// 		if (valorAntigo.status==true){ 
	// 			let temp = {x: cubeEsquerda.position.x}

	// 			cubeEsquerda.position.setX(valorAntigo.posx)
	// 			valorAntigo.posx = temp.x


	// 		}
	// 		else {
	// 			valorAntigo.posx = cubeEsquerda.position.x
	// 			cubeEsquerda.position.setX(cubeVerificar.position.x)
	// 		}
	// 		cubeEsquerda.userData.tamanho = cubeVerificar.userData.tamanho;
	// 		console.log(cubeEsquerda, cubeDireita.userData.direita)
	// 		cubeEsquerda.userData.direita.id = cubeDireita.id;
			
	// 		cubeDireita.userData.esquerda = {
	// 			preenchido: cubeEsquerda.userData.esquerda.preenchido,
	// 			id: cubeEsquerda.id,
	// 		} ;
	// 		idVerificar = cubeEsquerda.id;
	// 		console.log(idVerificar)
	// 		valorAntigo.status = true
			
	// 	}
	// 	else {
	// 		let cubeDireita = scene.getObjectById(cubeVerificar.userData.direita.id);
	// 		cubeDireita.userData.esquerda = cubeVerificar.userData.esquerda
	// 		temEsquerda = false;
	// 	}
		
	// }

}

function criaCubo(){
	let modeloCubo = {
		colocarCima: true,
        colocarDireita: true,
        colocarEsquerda: true,
		tipo: "chao",
        tamanhox: 1,
        tamanhoy: 1,
        botao: null
	}
	corEscolhida = "#000000";
	

	const material = new THREE.MeshBasicMaterial({color: corEscolhida, transparent: true, opacity: 0 });
	
	
	let cubeEscolhido = scene.getObjectById(uuidEscolhidoTemporario);
	const  geometry =  new  THREE.BoxGeometry(cubeEscolhido.box3.min.x-cubeEscolhido.box3.max.x,0.86,1);
	const cube = new THREE.Mesh(geometry, material)
	scene.add(cube)
	modeloCubo.tamanhox = cubeEscolhido.userData.modelo.tamanhox;
	
	
	let cube2BB = new THREE.Box3(new THREE.Vector3(), new THREE.Vector3());
	cube2BB.setFromObject(cube)
	console.log(cube2BB)
	cube.box3 = cube2BB;
	cube.position.setY(cube.position.y+(cube.position.y - cube2BB.min.y))
	const tamanhox = cube2BB.max.x - cube2BB.min.x;
	console.log(tamanhox)
	const tamanhoy = cube2BB.max.y - cube2BB.min.y;
	cube.userData = {
		modelo: modeloCubo,
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
	let index = ids.indexOf(cubeEscolhido.id)
	console.log(index);
	ids[index] = cube.id;
	console.log(ids)
	console.log(cubeEscolhido.userData.centroDireita, cubeEscolhido.userData.centro)
	if (cubeEscolhido.userData.centroDireita){
		cube.position.setX(cubeEscolhido.position.x);
		
		console.log("cubo direito")

	}
	else{
		console.log("cubo esquerdo")

		cube.position.setX(cubeEscolhido.position.x);

		
	}
	

	cube.position.getComponent(0);
	cube.name = "cubo"
	console.log(cubeEscolhido)
	
	console.log(cube)
	
}


window.addEventListener('resize', function(){
	var width = window.innerWidth;
	var height = window.innerHeight;
	renderer.setSize(width, height)
	camera.aspect = width/height;
	camera.updateProjectionMatrix;
})

window.addEventListener('click', function(){


	raycaster.setFromCamera( pointer, camera );;
	var intersects = raycaster.intersectObjects( scene.children );
	console.log(intersects)
	if (intersects.length==0){

		removeButton.classList.add('hide')
		addButton.classList.add("hide")
	}

	
	

})

// move mouse
function onPointerMove( event ) {

	// calculate pointer position in normalized device coordinates
	// (-1 to +1) for both components

	pointer.x = ( event.clientX / window.innerWidth ) * 2 - 1;
	pointer.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
	raycaster.setFromCamera( pointer, camera );
	var intersects = raycaster.intersectObjects( scene.children );

	if (intersects.length>0){
		menuDiv.classList.add("label");
		const position = intersects[0].object.position;
		uuidEscolhidoTemporario = intersects[0].object.name == "cubo" ? intersects[0].object.id : intersects[0].object.parent.id;

		let cubeEscolhido = scene.getObjectById(uuidEscolhidoTemporario);

		addButton.classList.add("hide")
		if(!cubeEscolhido.userData.tamanho){

			uuidEscolhidoTemporario = intersects[0].object.parent.parent.id;
			cubeEscolhido = scene.getObjectById(uuidEscolhidoTemporario);
		}
		// console.log(intersects[0].object.parent.userData.tamanho);
		const raioPositivo = cubeEscolhido.userData.tamanho.fimx - cubeEscolhido.userData.tamanho.fimx/4;
		const raioNegativo = cubeEscolhido.userData.tamanho.iniciox + cubeEscolhido.userData.tamanho.fimx/2;

		const raioYPositivo = cubeEscolhido.userData.tamanho.inicioy + cubeEscolhido.userData.tamanho.fimy/1.5;
		const raioYNegativo = cubeEscolhido.userData.tamanho.inicioy + cubeEscolhido.userData.tamanho.fimy/4;
		
		modeloEscolhido = cubeEscolhido.userData.modelo;
		// direita
		btnRemove.position.setY(cubeEscolhido.userData.modelo.tipo=="chao" ? cubeEscolhido.position.y : cubeEscolhido.position.y+2.1)
		btnRemove.position.setX(cubeEscolhido.position.x)
		removeButton.classList.remove('hide')
		addButton.classList.remove("hide")
		indexEscolhidoTemporario = cubeEscolhido.userData.modelo.tipo=="chao" ? ids.indexOf(uuidEscolhidoTemporario) : idsCima.indexOf(uuidEscolhidoTemporario);
		let tamanho = cubeEscolhido.userData.modelo.tipo=="chao" ? ids.length : idsCima.length;
		console.log(indexEscolhidoTemporario, ids.length-1)
		if (cubeEscolhido.userData.modelo.colocarDireita 
			&& indexEscolhidoTemporario==tamanho-1
			&& intersects[0].point.x>=raioPositivo 
			&&  intersects[0].point.y<=raioYPositivo){

			ladoEscolhidoTemporario = "direita"


			btnAdd.position.setX(cubeEscolhido.position.x+0.4)
			btnAdd.position.setY(cubeEscolhido.userData.modelo.tipo=="chao" ? cubeEscolhido.position.y+0.5 : cubeEscolhido.position.y+1.6)
		}
			// // cima
			
		else if (cubeEscolhido.userData.modelo.colocarCima && cubeEscolhido.userData.cima.preenchido == false && intersects[0].point.y>=raioYPositivo){

			

			ladoEscolhidoTemporario = "cima"

			btnAdd.position.setX(cubeEscolhido.position.x)
			btnAdd.position.setY(cubeEscolhido.position.y+0.85)
		}
		// esquerda
		else if (cubeEscolhido.userData.modelo.colocarEsquerda && indexEscolhidoTemporario==0 && intersects[0].point.x<=raioNegativo){
			
			ladoEscolhidoTemporario = "esquerda"
			btnAdd.position.setX(cubeEscolhido.position.x-0.5)
			btnAdd.position.setY(cubeEscolhido.position.y+0.5)
			
		}
	}

	


}
window.addEventListener( 'pointermove', onPointerMove );



function mostraMenu(modelo, posicao){
	
	menuDiv.classList.remove("hide");
	for (let k = 0; k < botoes.length; k++) {
		botoes[k].button.classList.add("hide")
		
	}
	for (let i = 0; i < divCadaModelo.length; i++) {
		divCadaModelo[i].cadaModelo.classList.add("hide");
		if(modeloEscolhido.tipo == "chao"){
			
			
			
			
			console.log(ladoEscolhido, divCadaModelo[i].tipo,botoes[i].tamanhox, modeloEscolhido.tamanhox)
			if (ladoEscolhido == 'cima' && divCadaModelo[i].tipo == "cima"){
				console.log(botoes, divCadaModelo[i])
				divCadaModelo[i].cadaModelo.classList.remove("hide");
				for (let j = 0; j < botoes.length; j++) {
					console.log(botoes[j].tamanhox, modeloEscolhido.tamanhox)
					if (botoes[j].tamanhox==modeloEscolhido.tamanhox){
						console.log(botoes[j].button)
						botoes[j].button.classList.remove("hide")
					}

				}
				
			}
			else if (ladoEscolhido == 'direita' && divCadaModelo[i].tipo != "cima" ){
				divCadaModelo[i].cadaModelo.classList.remove("hide");
				for (let j = 0; j < botoes.length; j++) {
					console.log(botoes[j].tamanhox, modeloEscolhido.tamanhox)
					if (botoes[j].tipo=="chao"){
						console.log(botoes[j].button)
						botoes[j].button.classList.remove("hide")
					}

				}
			}
			else if (ladoEscolhido == 'esquerda' && divCadaModelo[i].tipo != "cima" ){
				divCadaModelo[i].cadaModelo.classList.remove("hide");
				for (let j = 0; j < botoes.length; j++) {
					console.log(botoes[j].tamanhox, modeloEscolhido.tamanhox)
					if (botoes[j].tipo=="chao"){
						console.log(botoes[j].button)
						botoes[j].button.classList.remove("hide")
					}

				}
			}
		}
		else {
			if(ladoEscolhido == 'direita' && divCadaModelo[i].tipo == "cima"){
				divCadaModelo[i].cadaModelo.classList.remove("hide");
				for (let j = 0; j < botoes.length; j++) {
					console.log(botoes[j].tamanhox, modeloEscolhido.tamanhox)
					if (botoes[j].tipo=="cima"){
						console.log(botoes[j].button)
						botoes[j].button.classList.remove("hide")
					}

				}
			}
			else if(ladoEscolhido == 'esquerda' && divCadaModelo[i].tipo == "cima"){
				divCadaModelo[i].cadaModelo.classList.remove("hide");
				if (botoes[j].tipo=="cima"){
					console.log(botoes[j].button)
					botoes[j].button.classList.remove("hide")
				}
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
console.log(scene)
criaObjeto(0,0);


