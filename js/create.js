
import * as THREE from 'three';
// import Stats from './../node_modules/three/examples/jsm/libs/stats.module.js';
import { OrbitControls } from './../node_modules/three/examples/jsm/controls/OrbitControls.js';
import { RoomEnvironment } from './../node_modules/three/examples/jsm/environments/RoomEnvironment.js';
import { GLTFLoader } from './../node_modules/three/examples/jsm/loaders/GLTFLoader.js';
import { DRACOLoader } from './../node_modules/three/examples/jsm/loaders/DRACOLoader.js';
import { CSS2DRenderer } from './../node_modules/three/examples/jsm/renderers/CSS2DRenderer.js';
import { CSS2DObject } from './../node_modules/three/examples/jsm/renderers/CSS2DRenderer.js';
import { Objetos } from './objects.js';
// import { Projector } from './node_modules/three/examples/jsm/loaders/DRACOLoader.js';

// Configurando a cena
const scene = new THREE.Scene();
scene.background = new THREE.Color(0xffffff)

// Camera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight,0.1,1000);
camera.position.set(0,0,5);

// Renderizador
const renderer = new THREE.WebGLRenderer();
let labelRenderer = new CSS2DRenderer();
labelRenderer.setSize( window.innerWidth, window.innerHeight );
labelRenderer.domElement.style.position = 'absolute';
labelRenderer.domElement.style.top = '0px';


// Tamanho da tela
renderer.setSize(window.innerWidth, window.innerHeight);

// Linkando o renderizador
document.body.appendChild( labelRenderer.domElement );
document.body.appendChild(renderer.domElement);

// camera rotacao
const controls = new OrbitControls( camera, labelRenderer.domElement );
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
// cube.scale.setX(2);00
// console.log(cube1BB.getCenter())
// adicionar primeiro cubo
const cube = new THREE.Mesh(geometry, material)
const cubos = [];
// cubos.push(cube)
// scene.add(cube)
// let cube1BB = new THREE.Box3(new THREE.Vector3(), new THREE.Vector3());
// cube1BB.setFromObject(cube)
// cube.userData.tamanho = {
// 	iniciox: cube1BB.min.x,
// 	fimx: cube1BB.max.x,
// }
// cube.box3 = cube1BB;
// console.log(cube1BB)


const menuDiv = document.createElement( 'div' );

menuDiv.className = 'label';
menuDiv.className = 'hide';
let objetos = new Objetos();
let botoes = []
for (let i = 0; i < objetos.todosObjetos.length; i++) {
	const button = document.createElement( 'button' );
	button.textContent = objetos.todosObjetos[i].nome
	button.className = 'botaoEscolha';
	button.addEventListener('pointerdown', function(event){
		corEscolhida = "#E56399";
		console.log("ros")
	
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
	menuDiv.appendChild(button)
	
}

const armarioButton = document.createElement( 'button' );
armarioButton.textContent = "adicionar armario"
armarioButton.className = 'botaoEscolha';

const armarioGrandeButton = document.createElement( 'button' );
armarioGrandeButton.textContent = "adicionar armario grande"
armarioGrandeButton.className = 'botaoEscolha';

const paneleiroButton = document.createElement( 'button' );
paneleiroButton.textContent = "adicionar paneleiro"
paneleiroButton.className = 'botaoEscolha';

const balcaoButton = document.createElement( 'button' );
balcaoButton.textContent = "adicionar balcão"
balcaoButton.className = 'botaoEscolha'

const balcaoGrandeButton = document.createElement( 'button' );
balcaoGrandeButton.textContent = "adicionar Balcao Grande"
balcaoGrandeButton.className = 'botaoEscolha'

// menuDiv.appendChild(armarioButton)
// menuDiv.appendChild(armarioGrandeButton)
// menuDiv.appendChild(balcaoGrandeButton)
// menuDiv.appendChild(paneleiroButton)
// menuDiv.appendChild(balcaoButton)

let corEscolhida = "#ffffff";
let positionEscolhida = "#ffffff";
let xEscolhido = 0;
let yEscolhido = 0;
let uuidEscolhido = "";
let adicionaCubo = true;

const menuLabel = new CSS2DObject( menuDiv );
menuLabel.position.y = 2

scene.add( menuLabel );
console.log(scene)
// Instantiate a loader
// Optional: Provide a DRACOLoader instance to decode compressed mesh data
const dracoLoader = new DRACOLoader();
dracoLoader.setDecoderPath( './node_modules/three/examples/js/libs/draco/' );
loader.setDRACOLoader( dracoLoader );
var hemiLight = new THREE.HemisphereLight( 0xffffff, 0x444444, 2 );
hemiLight.position.set( 100, 300, 0 );
// scene.add( hemiLight );
// Load a glTF resource


// criaObjetos

function criaObjeto(x, y){
	console.log('cria')
	loader.load(
		// resource URL
		objetos.balcao.local,
		// called when the resource is loaded
		function ( gltf ) {
	
			scene.add( gltf.scene );
			


			let cube1BB = new THREE.Box3(new THREE.Vector3(), new THREE.Vector3());
			cube1BB.setFromObject(gltf.scene)
			console.log(cube1BB)
			gltf.scene.box3 = cube1BB;
			gltf.scene.userData = {
				modelo: objetos.balcao,
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
			
			console.log(gltf.scene)
			console.log(cube1BB)
			console.log(scene)
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
function criaObjetoChao(modelo, px, py){
	console.log('cria')
	loader.load(
		// resource URL
		modelo.local,
		// called when the resource is loaded
		function ( gltf ) {
	
			scene.add( gltf.scene );
			let cube2BB = new THREE.Box3(new THREE.Vector3(), new THREE.Vector3());
			cube2BB.setFromObject(gltf.scene)
			// gltf.scene.position.set(xEscolhido, yEscolhido, 0);
			console.log(gltf.scenes)
			console.log(cube2BB)
			gltf.scene.box3 = cube2BB;
			let cubeEscolhido = scene.getObjectById(uuidEscolhido);
			const tamanhox = cube2BB.max.x - cube2BB.min.x;
			const tamanhoy = cube2BB.max.y - cube2BB.min.y;
			gltf.scene.position.setY(gltf.scene.position.y+(gltf.scene.position.y - cube2BB.min.y))
			gltf.scene.userData = {
				modelo,
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
				console.log(cubeEscolhido.userData.tamanho.fimx + tamanhox)
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
					modelo: gltf.scene.id
				}
				
			}
			// esquerda
			else if (px<0){
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
					modelo: gltf.scene.id
				}
			}
			
			console.log(gltf.scene)
			
			console.log(scene)
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
function criaBalcaoGrande(px, py){
	console.log('cria')
	loader.load(
		// resource URL
		'model/glb/pivo/balcao120.glb',
		// called when the resource is loaded
		function ( gltf ) {
	
			scene.add( gltf.scene );
	
			gltf.animations; // Array<THREE.AnimationClip>
			gltf.scene; // THREE.Group
			gltf.scenes; // Array<THREE.Group>
			gltf.cameras; // Array<THREE.Camera>
			gltf.asset; // Object
			
			let cube1BB = new THREE.Box3(new THREE.Vector3(), new THREE.Vector3());
			cube1BB.setFromObject(gltf.scene)
			gltf.scene.box3 = cube1BB;
			let cubeEscolhido = scene.getObjectById(uuidEscolhido);
			gltf.scene.position.set(xEscolhido, yEscolhido, 0);
			
			const tamanhox = cube1BB.max.x - cube1BB.min.x;
			const tamanhoy = cube1BB.max.y - cube1BB.min.y;

			// direita
			if (px>0){
				console.log(cubeEscolhido.position.x+(cubeEscolhido.userData.tamanho.fimx/2)+tamanhox/2 )
				// gltf.scene.position.setX(cubeEscolhido.position.x+cubeEscolhido.userData.tamanho.fimx/2+tamanhox/2);
				gltf.scene.position.setX(cubeEscolhido.position.x+(cubeEscolhido.box3.max.x)+gltf.scene.box3.max.x);
				
				
				gltf.scene.userData.tamanho = {
					iniciox: cubeEscolhido.box3.max.x,
					fimx: cubeEscolhido.box3.max.x + tamanhox ,
				}
				cubeEscolhido.direita = {preenchido: true, id: gltf.scene.id};
			}
			// esquerda
			else if (px<0){
				gltf.scene.position.setX(cubeEscolhido.position.x-tamanhox);

				gltf.scene.position.setX(cubeEscolhido.position.x+(cubeEscolhido.box3.min.x)+gltf.scene.box3.min.x);


				gltf.scene.userData.tamanho = {
					iniciox: cubeEscolhido.box3.min.x,
					fimx: cubeEscolhido.box3.min.x - tamanhox ,
				}
			}
			
			console.log(gltf.scene)
			console.log(cube1BB)
			console.log(scene)
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
function criaPaneleiro(px, py){
	console.log('cria')
	loader.load(
		// resource URL
		'model/glb/pivo/paneleiro.glb',
		// called when the resource is loaded
		function ( gltf ) {
	
			scene.add( gltf.scene );
	
			gltf.animations; // Array<THREE.AnimationClip>
			gltf.scene; // THREE.Group
			gltf.scenes; // Array<THREE.Group>
			gltf.cameras; // Array<THREE.Camera>
			gltf.asset; // Object
			
			let cube1BB = new THREE.Box3(new THREE.Vector3(), new THREE.Vector3());
			cube1BB.setFromObject(gltf.scene)
			gltf.scene.box3 = cube1BB;
			let cubeEscolhido = scene.getObjectById(uuidEscolhido);
			gltf.scene.position.set(xEscolhido, yEscolhido, 0);
			gltf.scene.position.setY(0.75);
			const tamanhox = cube1BB.max.x - cube1BB.min.x;
			const tamanhoy = cube1BB.max.y - cube1BB.min.y;

			// direita
			if (px>0){
				console.log(cubeEscolhido.position.x+(cubeEscolhido.userData.tamanho.fimx/2)+tamanhox/2 )
				// gltf.scene.position.setX(cubeEscolhido.position.x+cubeEscolhido.userData.tamanho.fimx/2+tamanhox/2);
				gltf.scene.position.setX(cubeEscolhido.position.x+(cubeEscolhido.box3.max.x)+gltf.scene.box3.max.x);
				
				
				gltf.scene.userData.tamanho = {
					iniciox: cubeEscolhido.box3.max.x,
					fimx: cubeEscolhido.box3.max.x + tamanhox ,
				}
				cubeEscolhido.direita = {preenchido: true, id: gltf.scene.id};
			}
			// esquerda
			else if (px<0){
				gltf.scene.position.setX(cubeEscolhido.position.x-tamanhox);

				gltf.scene.position.setX(cubeEscolhido.position.x+(cubeEscolhido.box3.min.x)+gltf.scene.box3.min.x);


				gltf.scene.userData.tamanho = {
					iniciox: cubeEscolhido.box3.min.x,
					fimx: cubeEscolhido.box3.min.x - tamanhox ,
				}
			}
			
			console.log(gltf.scene)
			console.log(cube1BB)
			console.log(scene)
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
function criaObjetoCima(modelo, px, py){
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
			// direita
			if (px>0){
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
function criaArmarioGrande(px, py){
	console.log('cria')
	loader.load(
		// resource URL
		'model/glb/pivo/armario120.glb',
		// called when the resource is loaded
		function ( gltf ) {
	
			scene.add( gltf.scene );
	
			gltf.animations; // Array<THREE.AnimationClip>
			gltf.scene; // THREE.Group
			gltf.scenes; // Array<THREE.Group>
			gltf.cameras; // Array<THREE.Camera>
			gltf.asset; // Object
			
			let cube1BB = new THREE.Box3(new THREE.Vector3(), new THREE.Vector3());
			cube1BB.setFromObject(gltf.scene)
			gltf.scene.box3 = cube1BB;
			let cubeEscolhido = scene.getObjectById(uuidEscolhido);
			gltf.scene.position.set(xEscolhido, yEscolhido, 0);
			gltf.scene.position.setY(1.35);
			gltf.scene.position.setZ(-0.15);
			const tamanhox = cube1BB.max.x - cube1BB.min.x;
			const tamanhoy = cube1BB.max.y - cube1BB.min.y;

			// direita
			if (px>0){
				console.log(cubeEscolhido.position.x+(cubeEscolhido.userData.tamanho.fimx/2)+tamanhox/2 )
				// gltf.scene.position.setX(cubeEscolhido.position.x+cubeEscolhido.userData.tamanho.fimx/2+tamanhox/2);
				gltf.scene.position.setX(cubeEscolhido.position.x+(cubeEscolhido.box3.max.x)+gltf.scene.box3.max.x);
				
				
				gltf.scene.userData.tamanho = {
					iniciox: cubeEscolhido.box3.max.x,
					fimx: cubeEscolhido.box3.max.x + tamanhox ,
				}
				cubeEscolhido.direita = {preenchido: true, id: gltf.scene.id};
			}
			// esquerda
			else if (px<0){
				gltf.scene.position.setX(cubeEscolhido.position.x-tamanhox);

				gltf.scene.position.setX(cubeEscolhido.position.x+(cubeEscolhido.box3.min.x)+gltf.scene.box3.min.x);


				gltf.scene.userData.tamanho = {
					iniciox: cubeEscolhido.box3.min.x,
					fimx: cubeEscolhido.box3.min.x - tamanhox ,
				}
			}
			
			console.log(gltf.scene)
			console.log(cube1BB)
			console.log(scene)
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

window.addEventListener('resize', function(){
	var width = window.innerWidth;
	var height = window.innerHeight;
	renderer.setSize(width, height)
	camera.aspect = width/height;
	camera.updateProjectionMatrix;
})

// clique mouse
window.addEventListener('click', function(){


	raycaster.setFromCamera( pointer, camera );;
	var intersects = raycaster.intersectObjects( scene.children );
	console.log(intersects)
	if (intersects.length>0){
		
		// menuDiv.classList.remove("hide");
		menuDiv.classList.add("label");
		const position = intersects[0].object.position;
		uuidEscolhido = intersects[0].object.id
		console.log(uuidEscolhido)
		console.log(intersects[0])
		// direita
		if ((intersects[0].point.x>=0.3) && (intersects[0].point.y>=0.3 &&  intersects[0].point.y<=0.7) ){
			console.log('direita aqyu')

			positionEscolhida = intersects[0].object.position;
			xEscolhido = 1;
			yEscolhido = 0
			adicionaCubo = true;
			
		}
		// cima
		
		else if (intersects[0].point.y>=0.7 && !intersects[0].object.cima?.preenchido){
			console.log('cima')
			positionEscolhida = intersects[0].object.position;
			xEscolhido = 0;
			yEscolhido = 1;
			adicionaCubo = true;
		}
		// esquerda
		else if ((intersects[0].point.x<=-0.3) && (intersects[0].point.y>=0.3 &&  intersects[0].point.y<=0.7) ){
			console.log('esquerda')
			positionEscolhida = intersects[0].object.position;
			xEscolhido = -1;
			yEscolhido = 0
			adicionaCubo = true;
		}
		// baixo
		else if(intersects[0].point.y<=0.3 ){
			console.log('baixo')
			positionEscolhida = intersects[0].object.position;
			xEscolhido = 0;
			yEscolhido = -1
			adicionaCubo = true;
		}

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
		ocultaMenu()
		const position = intersects[0].object.position;
		uuidEscolhido = intersects[0].object.parent.id;


		// console.log(uuidEscolhido)
		let cubeEscolhido = scene.getObjectById(uuidEscolhido);
		if(!cubeEscolhido.userData.tamanho){
			console.log('n tem')
			uuidEscolhido = intersects[0].object.parent.parent.id;
			cubeEscolhido = scene.getObjectById(uuidEscolhido);
		}
		// console.log(intersects[0].object.parent.userData.tamanho);
		const raioPositivo = cubeEscolhido.userData.tamanho.fimx - cubeEscolhido.userData.tamanho.fimx/4;
		const raioNegativo = cubeEscolhido.userData.tamanho.iniciox + cubeEscolhido.userData.tamanho.fimx/2;

		const raioYPositivo = cubeEscolhido.userData.tamanho.inicioy + cubeEscolhido.userData.tamanho.fimy/2;
		const raioYNegativo = cubeEscolhido.userData.tamanho.inicioy + cubeEscolhido.userData.tamanho.fimy/4;

			// direita
		
			console.log(intersects[0].point.x, cubeEscolhido.userData.tamanho.fimx, )
			if (cubeEscolhido.userData.modelo.colocarDireita 
				&& cubeEscolhido.userData.direita.preenchido == false 
				&& intersects[0].point.x>=raioPositivo 
				&&  intersects[0].point.y<=raioYPositivo){
				console.log('primeira direita')
				mostraMenu(cubeEscolhido.userData.modelo, "direita")
				positionEscolhida = intersects[0].object.position;
				xEscolhido = 1;
				yEscolhido = 0
				adicionaCubo = true;
				menuLabel.position.setX(cubeEscolhido.position.x+1.5)
				menuLabel.position.setY(cubeEscolhido.position.y+0.5)
			}
			// // cima
			
			else if (cubeEscolhido.userData.modelo.colocarCima && cubeEscolhido.userData.cima.preenchido == false && intersects[0].point.y>=raioYPositivo){

				console.log('cima')
				mostraMenu(cubeEscolhido.userData.modelo, "cima")
				positionEscolhida = intersects[0].object.position;
				xEscolhido = 0;
				yEscolhido = 1;
				adicionaCubo = true;
				menuLabel.position.setX(cubeEscolhido.position.x)
				menuLabel.position.setY(cubeEscolhido.position.y+1.5)
			}
			// esquerda
			else if (cubeEscolhido.userData.modelo.colocarEsquerda && cubeEscolhido.userData.esquerda.preenchido == false && intersects[0].point.x<=raioNegativo){
				console.log('esquerda esta')
				positionEscolhida = intersects[0].object.position;
				mostraMenu(cubeEscolhido.userData.modelo, "esquerda")

				xEscolhido = -1;
				yEscolhido = 0
				adicionaCubo = true;
				menuLabel.position.setX(cubeEscolhido.position.x-1)
				menuLabel.position.setY(cubeEscolhido.position.y+cubeEscolhido.userData.tamanho.fimy)
				
			}
			// // baixo
			// else if(intersects[0].uv.y<=0.3){
			// 	console.log('baixo')
			// 	// // menuDiv.classList.remove("hide");
			// 	// positionEscolhida = intersects[0].object.position;
			// 	// xEscolhido = 0;
			// 	// yEscolhido = -1
			// 	// adicionaCubo = true;
			// 	// menuLabel.position.setX(intersects[0].object.position.x)
			// 	// menuLabel.position.setY(intersects[0].object.position.y-1.1)
			// }
		// if (intersects[0].faceIndex == 8 || intersects[0].faceIndex == 9){
		// 	// console.log(intersects[0].object.geometry)
			

		// }
		// else if (intersects[0].faceIndex == 3){
		// 	console.log('esquerda')
		// 	menuDiv.classList.remove("hide");
		// 	positionEscolhida = intersects[0].object.position;
		// 	xEscolhido = -1;
		// 	yEscolhido = 0
		// 	adicionaCubo = true;
		// 	menuLabel.position.setX(intersects[0].object.position.x-1)
		// 	menuLabel.position.setY(intersects[0].object.position.y)
		// }
		// else if (intersects[0].faceIndex == 1){
		// 	console.log('direita')
		// 	menuDiv.classList.remove("hide");
		// 	positionEscolhida = intersects[0].object.position;
		// 	xEscolhido = 1;
		// 	yEscolhido = 0
		// 	adicionaCubo = true;
		// 	menuLabel.position.setX(intersects[0].object.position.x+1)
		// 	menuLabel.position.setY(intersects[0].object.position.y)
		// }
		// else if (intersects[0].faceIndex == 5 || intersects[0].faceIndex == 4){
		// 	console.log('cima')
		// 	menuDiv.classList.remove("hide");
		// 	positionEscolhida = intersects[0].object.position;
		// 	xEscolhido = 0;
		// 	yEscolhido = 1;
		// 	adicionaCubo = true;
		// 	menuLabel.position.setX(intersects[0].object.position.x)
		// 	menuLabel.position.setY(intersects[0].object.position.y+1)
		// }
		// else if (intersects[0].faceIndex == 7){
		// 	console.log('baixo')
		// 	menuDiv.classList.remove("hide");
		// 	positionEscolhida = intersects[0].object.position;
		// 	xEscolhido = 0;
		// 	yEscolhido = -1
		// 	adicionaCubo = true;
		// 	menuLabel.position.setX(intersects[0].object.position.x)
		// 	menuLabel.position.setY(intersects[0].object.position.y-1.1)
		// }
	}

	


}
window.addEventListener( 'pointermove', onPointerMove );


function ocultaMenu(){
	menuDiv.classList.add("label");
	menuDiv.classList.add("hide");
	for (let i = 0; i < botoes.length; i++) {
		botoes[i].button.classList.remove("hide");
		
	}
}
function mostraMenu(modelo, posicao){
	
	menuDiv.classList.remove("hide");
	for (let i = 0; i < botoes.length; i++) {
		if(modelo.tipo == "chao"){
			
			botoes[i].button.classList.add("hide");
			if (posicao == 'cima' && botoes[i].tipo == "cima"  && (botoes[i].tamanhox == modelo.tamanhox)){
				console.log(botoes[i].tamanhox, modelo.tamanhox)
				botoes[i].button.classList.remove("hide");
			}
			else if (posicao == 'direita' && botoes[i].tipo != "cima" ){
				botoes[i].button.classList.remove("hide");
			}
			else if (posicao == 'esquerda' && botoes[i].tipo != "cima" ){
				botoes[i].button.classList.remove("hide");
			}
		}
		else if(modelo.tipo == "cima"){
			menuDiv.classList.add("hide");

			if (posicao == 'direita' && botoes[i].tipo == "chao"){
				botoes[i].button.classList.add("hide");
			}
			else if (posicao == 'esquerda' && botoes[i].tipo == "chao"){
				botoes[i].button.classList.add("hide");
			}
		}
		
	}
}

function animate(){
	requestAnimationFrame(animate);
	renderer.render(scene, camera);
	labelRenderer.render( scene, camera );
	controls.update();


}
animate()





criaObjeto(0,0);



/*
// Carregando a árvore
loader.load("../tree/scene.gltf",function(gltf){
	scene.add(gltf.scene);
	gltf.scene.scale.set(16, 16, 16);
	gltf.scene.position.set(0, -6, -12);
})*/

// Classe Player
