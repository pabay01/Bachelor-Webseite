
import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { TrackballControls } from 'three/examples/jsm/controls/TrackballControls'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { OutlinePass } from 'three/examples/jsm/postprocessing/OutlinePass'
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer'
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass'
import { SMAAPass } from 'three/examples/jsm/postprocessing/SMAAPass'
import { CSS2DRenderer, CSS2DObject } from 'three/examples/jsm/renderers/CSS2DRenderer'




//																Variablen

//Scene Rendereinstellungen
let scene = new THREE.Scene();
let camera = new THREE.PerspectiveCamera(40, window.innerWidth / window.innerHeight, 0.1, 1000);
let renderer1 = new THREE.WebGLRenderer({
	canvas: document.querySelector('#bg'),
	antialias: true,
	powerPreference: "high-performance"
});


renderer1.setPixelRatio(window.devicePixelRatio);
renderer1.setSize(window.innerWidth, window.innerHeight);
renderer1.frustumCulling = true;
camera.position.set(-150, 40, 0);

//Kantenglättung
const composer = new EffectComposer(renderer1);
const smaaPass = new SMAAPass(window.innerWidth/2 , window.innerHeight/2);
smaaPass.renderToScreen = true; 


//y Variabeln
let temperature;
let divconatiner2;
let rotationDirection = 1;
let targetPosition;
let P1;
let P2;
let P3;
let overlay;
let overlay2;
let overlay3;
let mesh4;
let mesh;
let mesh2;
let mesh3;
let mesh5;
let mesh6;
let mesh7;
let mesh8;
let mesh9;
let mesh10;
let mesh11;
let im1;
let im2;
let im3;
let im4;
let im5;
let mesh_cityground;
let mesh_deco;
let mesh_buildings;
let mesh_street;
let stage;
let input = 0;
let hover = false;
let click = false;
let no_view = true;
let o = 1;
let rv = false;
let Outline_switch = true;
let isZoomed = false;
let burger = false;
let control = false;
let cursor_size = 0.4;
var customCursor = document.getElementById('cursor');
let links = document.querySelectorAll('a, button,input, label');
let areaNames5 = ["Aufzug.e5", "Dachterasse"];
let areaNames4 = ["Aufzug.e3", "Büroraum.e3", "Büroraum2.e3", "Büroraum3.e3","Büroraum4.e3", "Eingangsbereich.e3", "Flur.e3", "Lagerraum.e3", "Lagerraum2.e3", "Meetingraum.e3", "Toilette.e3"];
let areaNames3 = ["Aufzug.e2", "Büroraum.e2", "Büroraum2.e2", "Büroraum3.e2","Büroraum4.e2", "Eingangsbereich.e2", "Flur.e2", "Lagerraum.e2", "Lagerraum2.e2", "Meetingraum.e2", "Toilette.e2"];
let areaNames2 = ["Aufzug.e1", "Büroraum.e1", "Büroraum2.e1", "Büroraum3.e1","Büroraum4.e1", "Eingangsbereich.e1", "Flur.e1", "Lagerraum.e1", "Lagerraum2.e1", "Meetingraum.e1", "Toilette.e1"];
let areaNames = ["Abstellplatz1", "Aufzug", "Bürobereich1", "Bürobereich2","Druckraum", "Eingangsbereich", "Fahrradkeller", "Flur", "Toilette", "Waschraum",];

//Raycaster
const raycaster = new THREE.Raycaster();

const hoverMouse = new THREE.Vector2();

//Outline
const outlinePass = new OutlinePass(new THREE.Vector2(window.innerWidth, window.innerHeight), scene, camera);

//Hintergrund
const hintergrund = new THREE.TextureLoader().load('sky7.jpg'); scene.background = hintergrund;

//Licht 
const sun = new THREE.PointLight(0xFFFFF6);
const sun2 = new THREE.PointLight(0xFFFFF6);
const room = new THREE.RectAreaLight(0xCFFFFF)

//Orbit
const steuerung = new OrbitControls(camera, renderer1.domElement);

//Label
const labelrenderer = new CSS2DRenderer();
labelrenderer.setSize(window.innerWidth, window.innerHeight);
labelrenderer.domElement.style.position = 'absolute';
labelrenderer.domElement.style.top = '0px';
labelrenderer.domElement.style.right = '0px';
labelrenderer.domElement.style.pointerEvents = 'none';
labelrenderer.domElement.style.width = '-webkit-fill-available';
labelrenderer.domElement.style.zIndex = '17';
labelrenderer.domElement.style.display = 'none';
document.body.appendChild(labelrenderer.domElement);
const p = document.createElement('p');
p.className = "tooltip"
const div = document.createElement('div');
div.appendChild(p)
const divcontainer = new CSS2DObject(div);
divcontainer.position.set(0, 8, -6);
scene.add(divcontainer);

document.addEventListener('click', getObjekt_click);
document.addEventListener('mousemove', onDocumentMouseMove)


//																Funktionen



// Dropdown
window.toggleDropdown = function(button) {
	var dropdownContent = button.nextElementSibling;
	if (dropdownContent.style.display === "flex") {
		dropdownContent.style.display = "none";
		button.classList.remove("open");
	} else {
		dropdownContent.style.display = "flex";
		button.classList.add("open");
	}
}

window.selectOption = function (option, event) {
	event.preventDefault();
	var dropdownToggle = option.parentElement.previousElementSibling;
	dropdownToggle.innerHTML = option.innerHTML + '<svg width="10" height="6" viewBox="0 0 10 6"><path d="M0 0L5 6L10 0" fill="none" stroke="white" stroke-width="2"/></svg>';
	toggleDropdown(dropdownToggle);
	setStage(option.innerHTML);
}

var dropdownToggle = document.querySelector(".dropdown-toggle");
dropdownToggle.innerHTML = dropdownToggle.nextElementSibling.firstElementChild.innerHTML + '<svg width="10" height="6" viewBox="0 0 10 6"><path d="M0 0L5 6L10 0" fill="none" stroke="white" stroke-width="2"/></svg>';
 


//burgermenu
window.setburger = function () {
	const a = document.getElementById('b_animation');
	const b = document.getElementById('b_animation2');
	const menu = document.getElementById('menu');
	const navbar = document.getElementById('navbar');
	
	const elements = document.querySelectorAll('.cls-2');

	burger = !burger;
	if (burger) {
		a.style.transform = 'matrix(0.7071111798286438,0.7071024179458618,-0.7071024179458618,0.7071111798286438,409.1927490234375,457.2756042480469)';
		b.style.transform = 'matrix(0.7071111798286438,-0.7071024179458618,0.7071024179458618,0.7071111798286438,457.27569580078125,390.8079528808594)';
		menu.style.top = '6.8em';
		navbar.style.backgroundColor = '#1d1619';
		a.style.stroke = 'rgb(255,255,255)';
		b.style.stroke = 'rgb(255,255,255)';
		elements.forEach(function (element) {
			element.style.fill = 'white  ';
		});
	}
	else {
		a.style.transform = 'matrix(1,0,0,1,447,534)';
		b.style.transform = 'matrix(1,0,0,1,447,334)';
		menu.style.top = '-20em'
		navbar.style.backgroundColor = '#e9edee';
		a.style.stroke = 'rgb(29,22,25)'
		b.style.stroke = 'rgb(29,22,25)'
		elements.forEach(function (element) {
			element.style.fill = '#1d1619';
		});
	}
}
//Kamerafahrten
window.exit_cam = function() {
	defaultcam_transition();
	P3.className = 'POI'
	P2.className = 'POI'
	P1.className = 'POI'
	Orbit(control = false);
	document.getElementById('Exit_icon').style.right = '-25vw'
	document.getElementById('Exit_icon').style.opacity = '0'
	document.getElementById('room_i').style.right = '-25vw'
	document.getElementById('room_i').style.opacity = '0'
	document.querySelectorAll('#kamera').forEach(element => { element.style.display = 'block'; });
}
function cam1() {


		P2cam_transition();
		input = 0;
		rv = true
		document.querySelector('input[class="s5"]').checked = true;
		document.querySelectorAll('#kamera').forEach(element => { element.style.display = 'none'; });
		P3.className = 'POI hide'
		P2.className = 'POI hide'
		P1.className = 'POI hide'
		Orbit(control = true);
		document.getElementById('Exit_icon').textContent = 'Frontansicht'
		document.getElementById('Exit_icon').style.right = '1vw'
		document.getElementById('Exit_icon').style.opacity = '1'
		document.getElementById('room_i').style.right = '1vw'
		document.getElementById('room_i').style.opacity = '1'
	
	
}

function cam2() {
	

	P1cam_transition();
	input = 0;
	rv = true
	document.querySelector('input[class="s5"]').checked = true;
	document.querySelectorAll('#kamera').forEach(element => { element.style.display = 'none'; });
	P3.className = 'POI hide'
	P2.className = 'POI hide'
	P1.className = 'POI hide'
	Orbit(control = true);
	document.getElementById('Exit_icon').textContent = 'Topansicht'
	document.getElementById('Exit_icon').style.right = '1vw'
	document.getElementById('Exit_icon').style.opacity = '1'
	document.getElementById('room_i').style.right = '1vw'
	document.getElementById('room_i').style.opacity = '1'
}

function cam3() {


	P3cam_transition();
	input = 0;
	rv = true
	document.querySelector('input[class="s5"]').checked = true;
	document.querySelectorAll('#kamera').forEach(element => {element.style.display = 'none';});
	P3.className = 'POI hide'
	P2.className = 'POI hide'
	P1.className = 'POI hide'
	Orbit(control = true);
	document.getElementById('Exit_icon').textContent = 'Seitenansicht'
	document.getElementById('Exit_icon').style.right = '1vw'
	document.getElementById('Exit_icon').style.opacity = '1'
	document.getElementById('room_i').style.right = '1vw'
	document.getElementById('room_i').style.opacity = '1'
}
	

function cam1_hover() {
	hover = !hover;

	if (hover) {
		customCursor.style.width = '0.4em';
		customCursor.style.height = '0.4em';
		cursor_size = 0.2;
		customCursor.style.backgroundColor = 'gray';
		customCursor.style.opacity = '0.5';
		overlay.className ='P_info show_P'
		
	}
	else {
		customCursor.style.width = '0.6em';
		customCursor.style.height = '0.6em';
		cursor_size = 0.3;
		customCursor.style.backgroundColor = '#1d1619';
		customCursor.style.opacity = '1';
		overlay.className = 'P_info hide_P'
		
	}
	
}

function cam2_hover() {
	hover = !hover;

	if (hover) {
		customCursor.style.width = '0.4em';
		customCursor.style.height = '0.4em';
		cursor_size = 0.2;
		customCursor.style.backgroundColor = 'gray';
		customCursor.style.opacity = '0.5';
		overlay2.className = 'P_info show_P'

	}
	else {
		customCursor.style.width = '0.6em';
		customCursor.style.height = '0.6em';
		cursor_size = 0.3;
		customCursor.style.backgroundColor = '#1d1619';
		customCursor.style.opacity = '1';
		overlay2.className = 'P_info hide_P'
		
	}
}

function cam3_hover() {
	hover = !hover;

	if (hover) {
		customCursor.style.width = '0.4em';
		customCursor.style.height = '0.4em';
		cursor_size = 0.2;
		customCursor.style.backgroundColor = 'gray';
		customCursor.style.opacity = '0.5';
		overlay3.className = 'P_info show_P'

	}
	else {
		customCursor.style.width = '0.6em';
		customCursor.style.height = '0.6em';
		cursor_size = 0.3;
		customCursor.style.backgroundColor = '#1d1619';
		customCursor.style.opacity = '1';
		overlay3.className = 'P_info hide_P'

	}
}


//Kamerafahrt übergänge
function P1cam_transition() {

	if (window.innerWidth < 667) {
		targetPosition = new THREE.Vector3(-2, 200, -0.049);
		} 
	else if(window.innerWidth > 667 && window.innerWidth < 1024){
		targetPosition = new THREE.Vector3(-2, 140, -0.049);
		}
	else {
		targetPosition = new THREE.Vector3(-2, 120, -0.049); 
		}
	const startPosition = camera.position.clone(); 
	const animationDuration = 1000; 
	let animationStartTime = null;
	no_view = false;
	function animateCamera(timestamp) {
		if (!animationStartTime) animationStartTime = timestamp;
		const progress = timestamp - animationStartTime;
		const t = progress / animationDuration;
		if (t < 1) {
			const newPosition = new THREE.Vector3().lerpVectors(startPosition, targetPosition, t);
			camera.position.copy(newPosition);
			requestAnimationFrame(animateCamera);
		} else {
			camera.position.copy(targetPosition);
		}
	}

	requestAnimationFrame(animateCamera);
	
}

function P2cam_transition() {
	
	if (window.innerWidth < 667) {
		targetPosition = new THREE.Vector3(-180, 80, -0.049); 
		} 
	else if(window.innerWidth > 667 && window.innerWidth < 1024){
		targetPosition = new THREE.Vector3(-110, 80, -0.049);
		}
	else {
			targetPosition = new THREE.Vector3(-90, 80, -0.049); 
		}
	const startPosition = camera.position.clone(); 
	const animationDuration = 1000;
	let animationStartTime = null;
	no_view = false;
	function animateCamera(timestamp) {
		if (!animationStartTime) animationStartTime = timestamp;
		const progress = timestamp - animationStartTime;
		const t = progress / animationDuration;
		if (t < 1) {
			const newPosition = new THREE.Vector3().lerpVectors(startPosition, targetPosition, t);
			camera.position.copy(newPosition);
			requestAnimationFrame(animateCamera);
		} else {
			camera.position.copy(targetPosition);
		}
	}

	requestAnimationFrame(animateCamera);

}
function P3cam_transition() {

	if (window.innerWidth < 667) {
		targetPosition = new THREE.Vector3(-120, 120, 120); // Zielposition für die Kamera, wenn die Bildschirmbreite kleiner als 667 ist
		} 
	else if(window.innerWidth > 667 && window.innerWidth < 1024){
		targetPosition = new THREE.Vector3(-80, 80, 80);
		}
	else {
		targetPosition = new THREE.Vector3(-60, 60, 60); // Zielposition für die Kamera, wenn die Bildschirmbreite größer oder gleich 667 ist
		}
	
	const startPosition = camera.position.clone(); // Startposition der Kamera
	const animationDuration = 1000; // Dauer der Animation in Millisekunden
	let animationStartTime = null;
	no_view = false;
	function animateCamera(timestamp) {
		if (!animationStartTime) animationStartTime = timestamp;
		const progress = timestamp - animationStartTime;
		const t = progress / animationDuration;
		if (t < 1) {
			const newPosition = new THREE.Vector3().lerpVectors(startPosition, targetPosition, t);
			camera.position.copy(newPosition);
			requestAnimationFrame(animateCamera);
		} else {
			camera.position.copy(targetPosition);
		}
	}

	requestAnimationFrame(animateCamera);

}
function defaultcam_transition() {
	 

	if (window.innerWidth < 667) {
    targetPosition = new THREE.Vector3(-300, 40, 0); 
	} 
	else if(window.innerWidth > 667 && window.innerWidth < 1024){
	targetPosition = new THREE.Vector3(-200, 40, 0);
	}
	else {
    targetPosition = new THREE.Vector3(-150, 40, 0); 
	}
	const startPosition = camera.position.clone(); 
	const animationDuration = 1000; 
	let animationStartTime = null;
	no_view = true;
	function animateCamera(timestamp) {
		if (!animationStartTime) animationStartTime = timestamp;
		const progress = timestamp - animationStartTime;
		const t = progress / animationDuration;
		if (t < 1) {
			const newPosition = new THREE.Vector3().lerpVectors(startPosition, targetPosition, t);
			camera.position.copy(newPosition);
			requestAnimationFrame(animateCamera);
		} else {
			camera.position.copy(targetPosition);
		}
	}

	requestAnimationFrame(animateCamera);

}


//Editiermenu
window.Edit_Box = function (){
	
	if(click){
		if (window.innerWidth < 667) {
			document.getElementById('Edit_menu').style.width = '80%';
			document.getElementById('Edit_box_icon').style.left = 'calc(80% - 1.5em)';

		}
		else if (window.innerWidth > 667 && window.innerWidth < 1024) {
			document.getElementById('Edit_menu').style.width = '35%';
			document.getElementById('Edit_box_icon').style.left = 'calc(35% - 1.5em)';
		}
		else{
			document.getElementById('Edit_menu').style.width = '25%';
			document.getElementById('Edit_box_icon').style.left = 'calc(25% - 1.5em)';
		}
		
		
		document.getElementById('Edit_menu').style.transition = 'width ease 0.5s'
		document.getElementById('Edit_box_icon').style.transition = 'left ease 0.5s, transform ease 0.3s 0.5s'
		document.getElementById('Edit_box_icon').style.transform = 'rotate(180deg)'
	}
	else{
		if (window.innerWidth < 667) {
			document.getElementById('Edit_menu').style.width = '6%';
			document.getElementById('Edit_box_icon').style.left = 'calc(6% - 1.5em)';
		}
		else if (window.innerWidth > 667 && window.innerWidth < 1024) {
			document.getElementById('Edit_menu').style.width = '4%';
			document.getElementById('Edit_box_icon').style.left = 'calc(4% - 1.5em)';
		}
		else{
			document.getElementById('Edit_menu').style.width = '2%';
			document.getElementById('Edit_box_icon').style.left = 'calc(2% - 1.5em)';
		}
		document.getElementById('Edit_menu').style.transition = 'width ease 0.5s'
		document.getElementById('Edit_box_icon').style.transition = 'left ease 0.5s, transform ease 0.3s 0.5s'
		document.getElementById('Edit_box_icon').style.transform = 'rotate(0deg)'
	}
	click = !click
}
//3D Ansicht
window.setCanvasSize = function () {
	const element = document.getElementById('element');
	const is_box = document.querySelector('div[class="is-box"]');
	const wrapper = document.querySelector('div[class="is-overlay_wrapper"]');
	const arrow_down = document.getElementById('other_arrow');
	const other_section = document.getElementById('other');
	const section_headline = document.getElementById('section-headline');
	const icon = document.getElementById('icon');
	isZoomed = !isZoomed;
	
	if (isZoomed) {
		element.style.width = '100%';
		element.style.height = '100%';
		element.style.x = '0';
		element.style.y = '0';
		element.style.rx = '0em';
		element.style.ry = '0em';
		other_section.style.display = 'none';
		section_headline.style.top = '-31%';
		section_headline.style.opacity = '0';
		
		
		icon.style.marginRight = 'calc(50% - 2em)';
		icon.style.transition = 'margin-top 2s ease, margin-right 2s ease';
		section_headline.style.transition = 'top 0.5s ease, opacity 1s ease';
		element.style.transitionDelay = '0s';
		is_box.style.opacity = '1';

		
		if (window.innerWidth < 667) {
			wrapper.style.width = '80%';
			document.getElementById('Edit_box_icon').style.left = 'calc(80% - 1.5em)';
			document.getElementById('Edit_box_icon').style.transition = 'left ease 2s 2s, opacity ease 2s 2s'
			icon.style.marginTop = '70vh';

		}
		else if (window.innerWidth > 667 && window.innerWidth < 1024) {
			wrapper.style.width = '35%';
			document.getElementById('Edit_box_icon').style.left = 'calc(35% - 1.5em)';
			document.getElementById('Edit_box_icon').style.transition = 'left ease 2s 2s, opacity ease 2s 2s'
			icon.style.marginTop = '90vh';
		}
		else {
			wrapper.style.width = '20%';
			document.getElementById('Edit_box_icon').style.left = 'calc(20% - 1.5em)';
			document.getElementById('Edit_box_icon').style.transition = 'left ease 2s 2s, opacity ease 2s 2s'
			icon.style.marginTop = '90vh';
		}
		is_box.style.transition = 'opacity 2s ease 2s'
		wrapper.style.transition = 'width 2s ease 2s'
		arrow_down.style.marginRight = '110%'
		arrow_down.style.transition = 'margin-right 2s ease'
		
		labelrenderer.domElement.style.display = 'unset';
		Orbit(control = false);
		exit_cam();
		
		document.getElementById('Edit_box_icon').style.pointerEvents = 'unset';
		document.getElementById('Edit_box_icon').style.opacity= '1'
		document.getElementById('Edit_box_icon').style.transform = 'rotate(180deg)'
		click = false;
	} else {
		
		element.style.x = '30%';
		element.style.y = '20%';
		element.style.width = '65%';
		element.style.height = '72%';
		element.style.rx = '2em';
		element.style.ry = '2em';
		other_section.style.display = 'block';
		if (window.innerWidth > 667) {
			element.style.x = '30%';
			element.style.y = '20%';
			element.style.width = '65%';
			element.style.height = '72%';
			icon.style.marginRight = '8vw';
			icon.style.marginTop = '70vh';
			section_headline.style.top = 'calc(4.8em + 4%)';
			section_headline.style.opacity = '1';
		}
		else {
			element.style.x = '2%';
			element.style.y = 'calc(6.8em + 12%)';
			element.style.width = '96%';
			element.style.height = 'calc(76% - 6.8em)';
			icon.style.marginRight = 'calc(50vw - 2em)';
			icon.style.marginTop = '50vh';
			section_headline.style.top = 'calc(4.8em + 4%)';
			section_headline.style.top = 'unset';
			section_headline.style.opacity = '1';
		}
		icon.style.transition = 'margin-top 2s ease 1.5s, margin-right 2s ease 1.5s';
		section_headline.style.transition = 'top 0.5s ease 2s, opacity 1s ease 2s';
		element.style.transitionDelay = '1.5s';
		is_box.style.opacity = '0';
		wrapper.style.width = '0%';
	
		is_box.style.transition = 'opacity 2s ease'
		wrapper.style.transition = 'width 2s ease'
		arrow_down.style.marginRight = '76%'
		arrow_down.style.transition = 'margin-right 2s ease 2s'
		control = true;
		
		labelrenderer.domElement.style.display = 'none';
		Orbit(control = false);
		document.getElementById('Exit_icon').style.right = '-25vw'
		document.getElementById('Exit_icon').style.opacity = '0'
		document.getElementById('room_i').style.right = '-25vw'
		document.getElementById('room_i').style.opacity = '0'
		document.getElementById('Edit_box_icon').style.left = 'calc(0% - 1.5em)';
		document.getElementById('Edit_box_icon').style.pointerEvents = 'none';
		document.getElementById('Edit_box_icon').style.opacity= '0'
		document.getElementById('Edit_box_icon').style.transition = 'left ease 2s, opacity ease 2s';
		document.getElementById('Edit_box_icon').style.transform = 'rotate(0deg)'

		click = true;
		
	}
}

// Edit_transparenz
window.getOpacity = function () {

	o = document.querySelector('input[name="opacity"]').value;


	if (o == 0) {
		if (mesh2.userData.upperstage == true) { mesh2.visible = false; }
		if (mesh4.userData.upperstage == true) { mesh4.visible = false; }
		if (mesh6.userData.upperstage == true) { mesh6.visible = false; }
		if (mesh8.userData.upperstage == true) { mesh8.visible = false; }
		if (mesh10.userData.upperstage == true) { mesh10.visible = false; }
	}

	else {
		if (mesh2.userData.upperstage == true) {
			mesh2.visible = true;
			mesh2.traverse((child) => {
				if (child.isMesh) {
					child.material.transparent = true;
					child.material.opacity = o;
					
				}
			});
		}
		if (mesh4.userData.upperstage == true) {
			mesh4.visible = true;
			mesh4.traverse((child) => {
				if (child.isMesh) {
					child.material.transparent = true;
					child.material.opacity = o;
				}
			});
		}
		if (mesh6.userData.upperstage == true) {
			mesh6.visible = true;
			mesh6.traverse((child) => {
				if (child.isMesh) {
					child.material.transparent = true;
					child.material.opacity = o;
				}
			});
		}
		if (mesh8.userData.upperstage == true) {
			mesh8.visible = true;
			mesh8.traverse((child) => {
				if (child.isMesh) {
					child.material.transparent = true;
					child.material.opacity = o;
				}
			});
		}
		if (mesh10.userData.upperstage == true) {
			mesh10.visible = true;
			mesh10.traverse((child) => {
				if (child.isMesh) {
					child.material.transparent = true;
					child.material.opacity = o;
				}
			});
		}
	}
	if (o <= 0.7) {
		if (mesh2.userData.upperstage == true) { mesh2.userData.id = true; }
		if (mesh4.userData.upperstage == true) { mesh4.userData.id = true; }
		if (mesh6.userData.upperstage == true) { mesh6.userData.id = true; }
		if (mesh8.userData.upperstage == true) { mesh8.userData.id = true; }
		if (mesh10.userData.upperstage == true) { mesh10.userData.id = true; }
		
	}
	else {
		if (mesh2.userData.upperstage == true) { mesh2.userData.id = false; }
		if (mesh4.userData.upperstage == true) { mesh4.userData.id = false; }
		if (mesh6.userData.upperstage == true) { mesh6.userData.id = false; }
		if (mesh8.userData.upperstage == true) { mesh8.userData.id = false; }
		if (mesh10.userData.upperstage == true) { mesh10.userData.id = false; }
		mesh10.traverse((child) => {
			if (child.isMesh) {
				if (child.name === 'glass5') {
					child.material.opacity = 0.8;
					child.material.transparent = true;
				  }
			}
		});
		mesh8.traverse((child) => {
			if (child.isMesh) {
				if (child.name === 'glass4') {
					child.material.opacity = 0.8;
					child.material.transparent = true;
				  }
			}
		});
		mesh6.traverse((child) => {
			if (child.isMesh) {
				if (child.name === 'glass3') {
					child.material.opacity = 0.8;
					child.material.transparent = true;
				  }
			}
		});
		mesh4.traverse((child) => {
			if (child.isMesh) {
				if (child.name === 'glass2') {
					child.material.opacity = 0.8;
					child.material.transparent = true;
				  }
			}
		});
		mesh2.traverse((child) => {
			if (child.isMesh) {
				if (child.name === 'glass1') {
					child.material.opacity = 0.8;
					child.material.transparent = true;
				  }
			}
		});
	}
}
// Edit_Umgebung
window.switchDekoration = function () {

	if (document.querySelector('input[class="s4"]').checked == true) {
		mesh_buildings.visible = false;
		mesh_cityground.visible = false;
		mesh_deco.visible = false;
		mesh_street.visible = false;
		scene.background = new THREE.Color(0xf9f9f9);
		
	}
	else {
		mesh_buildings.visible = true;
		mesh_cityground.visible = true;
		mesh_deco.visible = true;
		mesh_street.visible = true;
		if(document.querySelector('input[class="s2"]').checked){
			scene.background = new THREE.Color(0x000000);
		}
		else{
		const hintergrund = new THREE.TextureLoader().load('sky7.jpg'); scene.background = hintergrund;
		}
	}
}
// Edit_Kamerafahrt
window.switchKameraMovement = function () {
	if (document.querySelector('input[class="s5"]').checked) {
			input = 0;
			rv = true
		
	}
	else {
		input = 0.0004;
		rv = true;
	}
	
}
//Edit_Light
window.switchSunlight = function () {
	if (document.querySelector('input[class="s2"]').checked) {
		sun.intensity = 0;
		sun2.intensity = 0;
		room.intensity = 1.4;
		scene.background = new THREE.Color(0x000000);
	}
	else {
		scene.background = hintergrund
		sun.intensity = 300000;
		sun2.intensity = 90000;
		room.intensity = 0;
		if(document.querySelector('input[class="s4"]').checked == true)
		{
			scene.background = new THREE.Color(0xf9f9f9);
		}
		else{
			scene.background = hintergrund
		}
		
	}
}
//Edit_Etagensetting
window.setStage = function (auswahl) {
	document.getElementById('o_slider').value = '1'

	if (auswahl == 'Alle&nbsp;Etagen') {
		mesh.visible = true;
		mesh2.visible = true;
		mesh3.visible = true;
		mesh4.visible = true;
		mesh5.visible = true;
		mesh6.visible = true;
		mesh7.visible = true;
		mesh8.visible = true;
		mesh9.visible = true;
		mesh10.visible = true;
		mesh11.visible = true;
		im1.visible = false;
		im2.visible = false;
		im3.visible = false;
		im4.visible = false;
		im5.visible = false;
		stage = 0;

		mesh.userData.stage = true;
		mesh2.userData.stage = true;
		mesh3.userData.stage = true;
		mesh4.userData.stage = true;
		mesh5.userData.stage = true;
		mesh6.userData.stage = true;
		mesh7.userData.stage = true;
		mesh8.userData.stage = true;
		mesh9.userData.stage = true;
		mesh10.userData.stage = true;
		mesh11.userData.stage = true;

		mesh.userData.upperstage = true;
		mesh2.userData.upperstage = true;
		mesh3.userData.upperstage = true;
		mesh4.userData.upperstage = true;
		mesh5.userData.upperstage = true;
		mesh6.userData.upperstage = true;
		mesh7.userData.upperstage = true;
		mesh8.userData.upperstage = true;
		mesh9.userData.upperstage = true;
		mesh10.userData.upperstage = true;
		mesh11.userData.upperstage = true;
	}
	if (auswahl == 'Erdgeschoss') {
		mesh.visible = true;
		mesh2.visible = true;
		mesh3.visible = false;
		mesh4.visible = false;
		mesh5.visible = false;
		mesh6.visible = false;
		mesh7.visible = false;
		mesh8.visible = false;
		mesh9.visible = false;
		mesh10.visible = false;
		mesh11.visible = false;
		
		im1.visible = true;
		im2.visible = false;
		im3.visible = false;
		im4.visible = false;
		im5.visible = false;
		stage = 1;
	
	
		mesh.userData.stage = true;
		mesh2.userData.stage = true;
		mesh3.userData.stage = false;
		mesh4.userData.stage = false;
		mesh5.userData.stage = false;
		mesh6.userData.stage = false;
		mesh7.userData.stage = false;
		mesh8.userData.stage = false;
		mesh9.userData.stage = false;
		mesh10.userData.stage = false;
		mesh11.userData.stage = false;

		mesh.userData.upperstage = true;
		mesh2.userData.upperstage = true;
		mesh3.userData.upperstage = false;
		mesh4.userData.upperstage = false;
		mesh5.userData.upperstage = false;
		mesh6.userData.upperstage = false;
		mesh7.userData.upperstage = false;
		mesh8.userData.upperstage = false;
		mesh9.userData.upperstage = false;
		mesh10.userData.upperstage = false;
		mesh11.userData.upperstage = false;
	}
	if (auswahl == '1.&nbsp;Etage') {
		mesh.visible = true;
		mesh2.visible = true;
		mesh3.visible = true;
		mesh4.visible = true;
		mesh5.visible = false;
		mesh6.visible = false;
		mesh7.visible = false;
		mesh8.visible = false;
		mesh9.visible = false;
		mesh10.visible = false;
		mesh11.visible = false;
		im1.visible = false;
		im2.visible = true;
		im3.visible = false;
		im4.visible = false;
		im5.visible = false;
		stage = 2;

		mesh.userData.stage = true;
		mesh2.userData.stage = true;
		mesh3.userData.stage = true;
		mesh4.userData.stage = true;
		mesh5.userData.stage = false;
		mesh6.userData.stage = false;
		mesh7.userData.stage = false;
		mesh8.userData.stage = false;
		mesh9.userData.stage = false;
		mesh10.userData.stage = false;
		mesh11.userData.stage = false;

		mesh.userData.upperstage = false;
		mesh2.userData.upperstage = false;
		mesh3.userData.upperstage = true;
		mesh4.userData.upperstage = true;
		mesh5.userData.upperstage = false;
		mesh6.userData.upperstage = false;
		mesh7.userData.upperstage = false;
		mesh8.userData.upperstage = false;
		mesh9.userData.upperstage = false;
		mesh10.userData.upperstage = false;
		mesh11.userData.upperstage = false;

	}
	if (auswahl == '2.&nbsp;Etage') {
		mesh.visible = true;
		mesh2.visible = true;
		mesh3.visible = true;
		mesh4.visible = true;
		mesh5.visible = true;
		mesh6.visible = true;
		mesh7.visible = false;
		mesh8.visible = false;
		mesh9.visible = false;
		mesh10.visible = false;
		mesh11.visible = false;
		im1.visible = false;
		im2.visible = false;
		im3.visible = true;
		im4.visible = false;
		im5.visible = false;
		stage = 3;

		mesh.userData.stage = true;
		mesh2.userData.stage = true;
		mesh3.userData.stage = true;
		mesh4.userData.stage = true;
		mesh5.userData.stage = true;
		mesh6.userData.stage = true;
		mesh7.userData.stage = false;
		mesh8.userData.stage = false;
		mesh9.userData.stage = false;
		mesh10.userData.stage = false;
		mesh11.userData.stage = false;

		mesh.userData.upperstage = false;
		mesh2.userData.upperstage = false;
		mesh3.userData.upperstage = false;
		mesh4.userData.upperstage = false;
		mesh5.userData.upperstage = true;
		mesh6.userData.upperstage = true;
		mesh7.userData.upperstage = false;
		mesh8.userData.upperstage = false;
		mesh9.userData.upperstage = false;
		mesh10.userData.upperstage = false;
		mesh11.userData.upperstage = false;

	}
	if (auswahl == '3.&nbsp;Etage') {
		mesh.visible = true;
		mesh2.visible = true;
		mesh3.visible = true;
		mesh4.visible = true;
		mesh5.visible = true;
		mesh6.visible = true;
		mesh7.visible = true;
		mesh8.visible = true;
		mesh9.visible = false;
		mesh10.visible = false;
		mesh11.visible = false;
		im1.visible = false;
		im2.visible = false;
		im3.visible = false;
		im4.visible = true;
		im5.visible = false;
		stage = 4;

		mesh.userData.stage = true;
		mesh2.userData.stage = true;
		mesh3.userData.stage = true;
		mesh4.userData.stage = true;
		mesh5.userData.stage = true;
		mesh6.userData.stage = true;
		mesh7.userData.stage = true;
		mesh8.userData.stage = true;
		mesh9.userData.stage = false;
		mesh10.userData.stage = false;
		mesh11.userData.stage = false;

		mesh.userData.upperstage = false;
		mesh2.userData.upperstage = false;
		mesh3.userData.upperstage = false;
		mesh4.userData.upperstage = false;
		mesh5.userData.upperstage = false;
		mesh6.userData.upperstage = false;
		mesh7.userData.upperstage = true;
		mesh8.userData.upperstage = true;
		mesh9.userData.upperstage = false;
		mesh10.userData.upperstage = false;
		mesh11.userData.upperstage = false;

	}
	if (auswahl == 'Dach') {
		mesh.visible = true;
		mesh2.visible = true;
		mesh3.visible = true;
		mesh4.visible = true;
		mesh5.visible = true;
		mesh6.visible = true;
		mesh7.visible = true;
		mesh8.visible = true;
		mesh9.visible = true;
		mesh10.visible = true;
		mesh11.visible = false;
		im1.visible = false;
		im2.visible = false;
		im3.visible = false;
		im4.visible = false;
		im5.visible = true;
		stage = 5;

		mesh.userData.stage = true;
		mesh2.userData.stage = true;
		mesh3.userData.stage = true;
		mesh4.userData.stage = true;
		mesh5.userData.stage = true;
		mesh6.userData.stage = true;
		mesh7.userData.stage = true;
		mesh8.userData.stage = true;
		mesh9.userData.stage = true;
		mesh10.userData.stage = true;
		mesh11.userData.stage = false;

		mesh.userData.upperstage = false;
		mesh2.userData.upperstage = false;
		mesh3.userData.upperstage = false;
		mesh4.userData.upperstage = false;
		mesh5.userData.upperstage = false;
		mesh6.userData.upperstage = false;
		mesh7.userData.upperstage = false;
		mesh8.userData.upperstage = false;
		mesh9.userData.upperstage = true;
		mesh10.userData.upperstage = true;
		mesh11.userData.upperstage = false;

	}
}
//Mousemovelistener
function onDocumentMouseMove(event) {
	hoverMouse.x = (event.clientX / window.innerWidth) * 2 - 1;
	hoverMouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
	if (Outline_switch) { getObjekt_hover(); }

	customCursor.style.left = (event.clientX - cursor_size * parseFloat(getComputedStyle(customCursor).fontSize)) + "px";
	customCursor.style.top = (event.clientY - cursor_size * parseFloat(getComputedStyle(customCursor).fontSize)) + "px";
}
//CustomCursor
links.forEach(link => {
	link.addEventListener('mouseover', () => {
		customCursor.style.width = '0.4em'; 
		customCursor.style.height = '0.4em'; 
		cursor_size = 0.2;
		customCursor.style.backgroundColor = 'gray';
		customCursor.style.opacity = '0.5';
		
		
	});

	link.addEventListener('mouseleave', () => {
		customCursor.style.width = '0.6em'; 
		customCursor.style.height = '0.6em'; 
		cursor_size = 0.3;
		customCursor.style.backgroundColor = '#1d1619';
		customCursor.style.opacity = '1';
	});
});
//Preloader
window.addEventListener('load', function () {
	const preloader = document.getElementById('preloader');
	const bar = document.getElementById('bar');

	let progress = 0;
	const interval = setInterval(function () {
		progress += 10;
		bar.style.width = `${progress}%`;

		if (progress >= 100) {
			clearInterval(interval);
			preloader.style.display = 'none';
		}
	}, 500);
});
//CustomCursor
document.addEventListener("mouseover", function () {
	customCursor.style.display = "flex";
});
document.addEventListener("mouseout", function () {
	customCursor.style.display = "none";
});

//Label Points 
function setPoints() {
	P1 = document.createElement('a');
	P1.className = 'POI'
	divconatiner2 = new CSS2DObject(P1);
	divconatiner2.position.set(-60, 20, 0);
	P1.addEventListener('click', cam1);
	P1.addEventListener('mouseenter', cam1_hover);
	P1.addEventListener('mouseleave', cam1_hover);
	overlay = document.createElement('div');
	overlay.className = "P_info hide_P"
	P1.appendChild(overlay)
	const overlay_text = document.createElement('span');
	overlay_text.className = "P_textinfo"
	overlay_text.textContent = 'Frontansicht'
	overlay.appendChild(overlay_text)
	scene.add(divconatiner2);
	
	

	 P2 = document.createElement('a');
	P2.className = 'POI'
	divconatiner2 = new CSS2DObject(P2);
	divconatiner2.position.set(-2, 30, 0);
	P2.addEventListener('click', cam2);
	P2.addEventListener('mouseenter', cam2_hover);
	P2.addEventListener('mouseleave', cam2_hover);
	overlay2 = document.createElement('div');
	overlay2.className = "P_info hide_P"
	P2.appendChild(overlay2)
	const overlay_text2 = document.createElement('span');
	overlay_text2.className = "P_textinfo"
	overlay_text2.textContent = 'Topansicht'
	overlay2.appendChild(overlay_text2)
	scene.add(divconatiner2);
	

	P3 = document.createElement('a');
	P3.className = 'POI'
	divconatiner2 = new CSS2DObject(P3);
	divconatiner2.position.set(-40, 30, 40);
	P3.addEventListener('click', cam3);
	P3.addEventListener('mouseenter', cam3_hover);
	P3.addEventListener('mouseleave', cam3_hover);
	overlay3 = document.createElement('div');
	overlay3.className = "P_info hide_P"
	P3.appendChild(overlay3)
	const overlay_text3 = document.createElement('span');
	overlay_text3.className = "P_textinfo"
	overlay_text3.textContent = 'Seitenansicht'
	overlay3.appendChild(overlay_text3)
	scene.add(divconatiner2);
	
	
}

//Orbit Kontrolle
function Orbit() {
	
	steuerung.enabled = control;
	steuerung.enableDamping = !control;
	steuerung.dampingFactor = 1.2;
	steuerung.enableRotate = false;
	steuerung.enableZoom = control;
}
//Rauminfo
function getObjekt_click() {

	let first_c = false;
	raycaster.setFromCamera(hoverMouse, camera);
	const intersects = raycaster.intersectObjects(scene.children, true);
	for (let i = 0; i < intersects.length; i++) {

		for (let i = 0; i < intersects.length; i++) {
			const area = intersects[i].object;
			
			

			if (!first_c && !no_view && isZoomed && stage == 1){
			if (  area.userData.name && areaNames.includes(area.userData.name)){
				first_c = true;
				switch (area.name) {
					case "Aufzug":
						document.getElementById("h2_i").innerHTML = "Aufzug";
						document.getElementById("p_ih").textContent = "Kapazität:";
						document.getElementById("p_it").textContent = "4 Personen";
						document.getElementById("p_ih2").textContent = "Geschwindigkeit:";
						document.getElementById("p_it2").textContent = "1m/s";
						break;
					case "Abstellplatz1":
						document.getElementById("h2_i").innerHTML = "Grafik&shy;büro";
						document.getElementById("p_ih").textContent = "Größe:";
						document.getElementById("p_it").textContent = "270m²";
						document.getElementById("p_ih2").textContent = "Belegung:";
						document.getElementById("p_it2").textContent = "8-10 Personen";
						break;
					case "Bürobereich1":
						document.getElementById("h2_i").innerHTML = "Foto&shy;studio";
						document.getElementById("p_ih").textContent = "Größe:";
						document.getElementById("p_it").textContent = "300m²";
						document.getElementById("p_ih2").textContent = "";
						document.getElementById("p_it2").textContent = "";
						break;
					case "Bürobereich2":
						document.getElementById("h2_i").innerHTML = "Verwaltung";
						document.getElementById("p_ih").textContent = "Größe:";
						document.getElementById("p_it").textContent = "180m²";
						document.getElementById("p_ih2").textContent = "Belegung:";
						document.getElementById("p_it2").textContent = "4 Personen";
						break;
					case "Druckraum":
						document.getElementById("h2_i").innerHTML = "Drucker&shy;raum";
						document.getElementById("p_ih").textContent = "Größe:";
						document.getElementById("p_it").textContent = "90m²";
						document.getElementById("p_ih2").textContent = "Druckeranzahl:";
						document.getElementById("p_it2").textContent = "5";
						break;
					case "Eingangsbereich":
						document.getElementById("h2_i").innerHTML = "Eingangs&shy;bereich";
						document.getElementById("p_ih").textContent = "Größe:";
						document.getElementById("p_it").textContent = "400m²";
						document.getElementById("p_ih2").textContent = "Sitzplätze:";
						document.getElementById("p_it2").textContent = "6";
						break;
					case "Fahrradkeller":
						document.getElementById("h2_i").innerHTML = "Besprechungs&shy;raum";
						document.getElementById("p_ih").textContent = "Größe:";
						document.getElementById("p_it").textContent = "270m²";
						document.getElementById("p_ih2").textContent = "Belegung:";
						document.getElementById("p_it2").textContent = "8-10 Personen";
						break;
					case "Flur":
						document.getElementById("h2_i").innerHTML = "Flur";
						document.getElementById("p_ih").textContent = "Größe:";
						document.getElementById("p_it").textContent = "200m²";
						document.getElementById("p_ih2").textContent = "";
						document.getElementById("p_it2").textContent = "";
						break;
					case "Toilette":
						document.getElementById("h2_i").innerHTML = "Toilette";
						document.getElementById("p_ih").textContent = "Größe:";
						document.getElementById("p_it").textContent = "90m²";
						document.getElementById("p_ih2").textContent = "Toilettenanzahl:";
						document.getElementById("p_it2").textContent = "4";
						break;
					case "Waschraum":
						document.getElementById("h2_i").innerHTML = "Misch&shy;büro";
						document.getElementById("p_ih").textContent = "Größe:";
						document.getElementById("p_it").textContent = "270m²";
						document.getElementById("p_ih2").textContent = "Belegung";
						document.getElementById("p_it2").textContent = "8-10 Personen";
						break;
					default:
						document.getElementById("h2_i").textContent = "";
						document.getElementById("p_ih").textContent = "comming soon...";
						document.getElementById("p_it").textContent = "";
						document.getElementById("p_ih2").textContent = "";
						document.getElementById("p_it2").textContent = "";
						break;
				}
				
				
				
			}
			else {
				document.getElementById("h2_i").textContent = "";
				document.getElementById("p_ih").textContent = "klicke auf einen Raum";
				document.getElementById("p_it").textContent = "";
				document.getElementById("p_ih2").textContent = "";
				document.getElementById("p_it2").textContent = "";
			}
			}
			if (!first_c && !no_view && isZoomed && stage == 2){
				if (  area.userData.name && areaNames2.includes(area.userData.name)){
					first_c = true;
					switch (area.name) {
						case "Aufzuge1":
							document.getElementById("h2_i").innerHTML = "Aufzug";
							document.getElementById("p_ih").textContent = "Kapazität:";
							document.getElementById("p_it").textContent = "4 Personen";
							document.getElementById("p_ih2").textContent = "Geschwindigkeit:";
							document.getElementById("p_it2").textContent = "1m/s";
							break;
						case "Büroraum3e1":
							document.getElementById("h2_i").innerHTML = "Meeting&shyraum";
							document.getElementById("p_ih").textContent = "Größe:";
							document.getElementById("p_it").textContent = "170m²";
							document.getElementById("p_ih2").textContent = "Belegung:";
							document.getElementById("p_it2").textContent = "6 Personen";
							break;
						case "Büroraume1":
							document.getElementById("h2_i").innerHTML = "Entwicklungs&shy;labor";
							document.getElementById("p_ih").textContent = "Größe:";
							document.getElementById("p_it").textContent = "300m²";
							document.getElementById("p_ih2").textContent = "Belegung:";
							document.getElementById("p_it2").textContent = "6 Personen";
							break;
						case "Büroraum2e1":
							document.getElementById("h2_i").innerHTML = "Server&shy;raum";
							document.getElementById("p_ih").textContent = "Größe:";
							document.getElementById("p_it").textContent = "260m²";
							document.getElementById("p_ih2").textContent = "Belegung:";
							document.getElementById("p_it2").textContent = "8-10 Personen";
							break;
						case "Büroraum4e1":
							document.getElementById("h2_i").innerHTML = "Schulungs&shy;raum";
							document.getElementById("p_ih").textContent = "Größe:";
							document.getElementById("p_it").textContent = "260m²";
							document.getElementById("p_ih2").textContent = "Belegung:";
							document.getElementById("p_it2").textContent = "8-10 Personen";
							break;
						case "Eingangsbereiche1":
							document.getElementById("h2_i").innerHTML = "Eingangs&shy;bereich";
							document.getElementById("p_ih").textContent = "Größe:";
							document.getElementById("p_it").textContent = "350m²";
							document.getElementById("p_ih2").textContent = "Sitzplätze:";
							document.getElementById("p_it2").textContent = "6";
							break;
						case "Lagerraume1":
							document.getElementById("h2_i").innerHTML = "Lager";
							document.getElementById("p_ih").textContent = "Größe:";
							document.getElementById("p_it").textContent = "100m²";
							document.getElementById("p_ih2").textContent = "Lagerbestand:";
							document.getElementById("p_it2").textContent = "Elektronik";
							break;
						case "Flure1":
							document.getElementById("h2_i").innerHTML = "Flur";
							document.getElementById("p_ih").textContent = "Größe:";
							document.getElementById("p_it").textContent = "200m²";
							document.getElementById("p_ih2").textContent = "";
							document.getElementById("p_it2").textContent = "";
							break;
						case "Toilettee1":
							document.getElementById("h2_i").innerHTML = "Toilette";
							document.getElementById("p_ih").textContent = "Größe:";
							document.getElementById("p_it").textContent = "90m²";
							document.getElementById("p_ih2").textContent = "Toilettenanzahl:";
							document.getElementById("p_it2").textContent = "4";
							break;
						case "Meetingraume1":
							document.getElementById("h2_i").innerHTML = "Geschäfts&shy;führung";
							document.getElementById("p_ih").textContent = "Größe:";
							document.getElementById("p_it").textContent = "280m²";
							document.getElementById("p_ih2").textContent = "Belegung:";
							document.getElementById("p_it2").textContent = "10 Personen";
							break;
						case "Lagerraum2e1":
							document.getElementById("h2_i").innerHTML = "Küche";
							document.getElementById("p_ih").textContent = "Größe:";
							document.getElementById("p_it").textContent = "90m²";
							document.getElementById("p_ih2").textContent = "Belegung";
							document.getElementById("p_it2").textContent = "4 Personen";
							break;
						default:
							document.getElementById("h2_i").textContent = "";
							document.getElementById("p_ih").textContent = "comming soon...";
							document.getElementById("p_it").textContent = "";
							document.getElementById("p_ih2").textContent = "";
							document.getElementById("p_it2").textContent = "";
							break;
					}
					
					
					
				}
				else {
					document.getElementById("h2_i").textContent = "";
					document.getElementById("p_ih").textContent = "klicke auf einen Raum";
					document.getElementById("p_it").textContent = "";
					document.getElementById("p_ih2").textContent = "";
					document.getElementById("p_it2").textContent = "";
				}
					
			}
			if (!first_c && !no_view && isZoomed && stage == 3){
				if (  area.userData.name && areaNames3.includes(area.userData.name)){
					first_c = true;
					switch (area.name) {
						case "Aufzuge2":
							document.getElementById("h2_i").innerHTML = "Aufzug";
							document.getElementById("p_ih").textContent = "Kapazität:";
							document.getElementById("p_it").textContent = "4 Personen";
							document.getElementById("p_ih2").textContent = "Geschwindigkeit:";
							document.getElementById("p_it2").textContent = "1m/s";
							break;
						case "Büroraum3e2":
							document.getElementById("h2_i").innerHTML = "Meeting&shyraum";
							document.getElementById("p_ih").textContent = "Größe:";
							document.getElementById("p_it").textContent = "170m²";
							document.getElementById("p_ih2").textContent = "Belegung:";
							document.getElementById("p_it2").textContent = "6 Personen";
							break;
						case "Büroraume2":
							document.getElementById("h2_i").innerHTML = "Entwicklungs&shy;labor";
							document.getElementById("p_ih").textContent = "Größe:";
							document.getElementById("p_it").textContent = "300m²";
							document.getElementById("p_ih2").textContent = "Belegung:";
							document.getElementById("p_it2").textContent = "6 Personen";
							break;
						case "Büroraum2e2":
							document.getElementById("h2_i").innerHTML = "Server&shy;raum";
							document.getElementById("p_ih").textContent = "Größe:";
							document.getElementById("p_it").textContent = "260m²";
							document.getElementById("p_ih2").textContent = "Belegung:";
							document.getElementById("p_it2").textContent = "8-10 Personen";
							break;
						case "Büroraum4e2":
							document.getElementById("h2_i").innerHTML = "Schulungs&shy;raum";
							document.getElementById("p_ih").textContent = "Größe:";
							document.getElementById("p_it").textContent = "260m²";
							document.getElementById("p_ih2").textContent = "Belegung:";
							document.getElementById("p_it2").textContent = "8-10 Personen";
							break;
						case "Eingangsbereiche2":
							document.getElementById("h2_i").innerHTML = "Eingangs&shy;bereich";
							document.getElementById("p_ih").textContent = "Größe:";
							document.getElementById("p_it").textContent = "350m²";
							document.getElementById("p_ih2").textContent = "Sitzplätze:";
							document.getElementById("p_it2").textContent = "6";
							break;
						case "Lagerraume2":
							document.getElementById("h2_i").innerHTML = "Lager";
							document.getElementById("p_ih").textContent = "Größe:";
							document.getElementById("p_it").textContent = "100m²";
							document.getElementById("p_ih2").textContent = "Lagerbestand:";
							document.getElementById("p_it2").textContent = "Elektronik";
							break;
						case "Flure2":
							document.getElementById("h2_i").innerHTML = "Flur";
							document.getElementById("p_ih").textContent = "Größe:";
							document.getElementById("p_it").textContent = "200m²";
							document.getElementById("p_ih2").textContent = "";
							document.getElementById("p_it2").textContent = "";
							break;
						case "Toilettee2":
							document.getElementById("h2_i").innerHTML = "Toilette";
							document.getElementById("p_ih").textContent = "Größe:";
							document.getElementById("p_it").textContent = "90m²";
							document.getElementById("p_ih2").textContent = "Toilettenanzahl:";
							document.getElementById("p_it2").textContent = "4";
							break;
						case "Meetingraume2":
							document.getElementById("h2_i").innerHTML = "Geschäfts&shy;führung";
							document.getElementById("p_ih").textContent = "Größe:";
							document.getElementById("p_it").textContent = "280m²";
							document.getElementById("p_ih2").textContent = "Belegung:";
							document.getElementById("p_it2").textContent = "10 Personen";
							break;
						case "Lagerraum2e2":
							document.getElementById("h2_i").innerHTML = "Küche";
							document.getElementById("p_ih").textContent = "Größe:";
							document.getElementById("p_it").textContent = "90m²";
							document.getElementById("p_ih2").textContent = "Belegung";
							document.getElementById("p_it2").textContent = "4 Personen";
							break;
						default:
							document.getElementById("h2_i").textContent = "";
							document.getElementById("p_ih").textContent = "comming soon...";
							document.getElementById("p_it").textContent = "";
							document.getElementById("p_ih2").textContent = "";
							document.getElementById("p_it2").textContent = "";
							break;
					}
					
					
					
				}
				else {
					document.getElementById("h2_i").textContent = "";
					document.getElementById("p_ih").textContent = "klicke auf einen Raum";
					document.getElementById("p_it").textContent = "";
					document.getElementById("p_ih2").textContent = "";
					document.getElementById("p_it2").textContent = "";
				}
					
			}
			if (!first_c && !no_view && isZoomed && stage == 4){
				if (  area.userData.name && areaNames4.includes(area.userData.name)){
					first_c = true;
					switch (area.name) {
						case "Aufzuge3":
							document.getElementById("h2_i").innerHTML = "Aufzug";
							document.getElementById("p_ih").textContent = "Kapazität:";
							document.getElementById("p_it").textContent = "4 Personen";
							document.getElementById("p_ih2").textContent = "Geschwindigkeit:";
							document.getElementById("p_it2").textContent = "1m/s";
							break;
						case "Büroraum3e3":
							document.getElementById("h2_i").innerHTML = "IT-büro";
							document.getElementById("p_ih").textContent = "Größe:";
							document.getElementById("p_it").textContent = "12m²";
							document.getElementById("p_ih2").textContent = "Belegung:";
							document.getElementById("p_it2").textContent = "2 Mitarbeiter";
							break;
						case "Büroraume3":
							document.getElementById("h2_i").innerHTML = "Grafik&shy;büro";
							document.getElementById("p_ih").textContent = "Größe:";
							document.getElementById("p_it").textContent = "20m²";
							document.getElementById("p_ih2").textContent = "Belegung:";
							document.getElementById("p_it2").textContent = "8 Mitarbeiter";
							break;
						case "Büroraum2e3":
							document.getElementById("h2_i").innerHTML = "Verwaltung";
							document.getElementById("p_ih").textContent = "Größe:";
							document.getElementById("p_it").textContent = "18m²";
							document.getElementById("p_ih2").textContent = "Belegung:";
							document.getElementById("p_it2").textContent = "4 Mitarbeiter";
							break;
						case "Büroraum4e3":
							document.getElementById("h2_i").innerHTML = "Marketing&shy;büro";
							document.getElementById("p_ih").textContent = "Größe:";
							document.getElementById("p_it").textContent = "18m²";
							document.getElementById("p_ih2").textContent = "Belegung:";
							document.getElementById("p_it2").textContent = "4 Mitarbeiter";
							break;
						case "Eingangsbereiche3":
							document.getElementById("h2_i").innerHTML = "Eingangs&shy;bereich";
							document.getElementById("p_ih").textContent = "Größe:";
							document.getElementById("p_it").textContent = "58m²";
							document.getElementById("p_ih2").textContent = "Sitzplätze:";
							document.getElementById("p_it2").textContent = "6";
							break;
						case "Lagerraume3":
							document.getElementById("h2_i").innerHTML = "Lager";
							document.getElementById("p_ih").textContent = "Größe:";
							document.getElementById("p_it").textContent = "12m²";
							document.getElementById("p_ih2").textContent = "Lagerbestand:";
							document.getElementById("p_it2").textContent = "Papier";
							break;
						case "Flure3":
							document.getElementById("h2_i").innerHTML = "Flur";
							document.getElementById("p_ih").textContent = "Größe:";
							document.getElementById("p_it").textContent = "10m²";
							document.getElementById("p_ih2").textContent = "";
							document.getElementById("p_it2").textContent = "";
							break;
						case "Toilettee3":
							document.getElementById("h2_i").innerHTML = "Toilette";
							document.getElementById("p_ih").textContent = "Größe:";
							document.getElementById("p_it").textContent = "10m²";
							document.getElementById("p_ih2").textContent = "Toilettenanzahl:";
							document.getElementById("p_it2").textContent = "4";
							break;
						case "Meetingraume3":
							document.getElementById("h2_i").innerHTML = "Meeting&shy;raum";
							document.getElementById("p_ih").textContent = "Größe:";
							document.getElementById("p_it").textContent = "10m²";
							document.getElementById("p_ih2").textContent = "Kapazität:";
							document.getElementById("p_it2").textContent = "10 Personen";
							break;
						case "Lagerraum2e3":
							document.getElementById("h2_i").innerHTML = "Lager";
							document.getElementById("p_ih").textContent = "Größe:";
							document.getElementById("p_it").textContent = "12m²";
							document.getElementById("p_ih2").textContent = "Lagerbestand:";
							document.getElementById("p_it2").textContent = "Papier";
							break;
						default:
							document.getElementById("h2_i").textContent = "";
							document.getElementById("p_ih").textContent = "comming soon...";
							document.getElementById("p_it").textContent = "";
							document.getElementById("p_ih2").textContent = "";
							document.getElementById("p_it2").textContent = "";
							break;
					}
					
					
					
				}
				else {
					document.getElementById("h2_i").textContent = "";
					document.getElementById("p_ih").textContent = "klicke auf einen Raum";
					document.getElementById("p_it").textContent = "";
					document.getElementById("p_ih2").textContent = "";
					document.getElementById("p_it2").textContent = "";
				}
					
			}
			if (!first_c && !no_view && isZoomed && stage == 5){
				if (  area.userData.name && areaNames5.includes(area.userData.name)){
					first_c = true;
					switch (area.name) {
						case "Aufzuge5":
							document.getElementById("h2_i").innerHTML = "Aufzug";
							document.getElementById("p_ih").textContent = "Kapazität:";
							document.getElementById("p_it").textContent = "4 Personen";
							document.getElementById("p_ih2").textContent = "Geschwindigkeit:";
							document.getElementById("p_it2").textContent = "1m/s";
							break;
						case "Dachterasse":
							document.getElementById("h2_i").innerHTML = "Dach&shy;terasse";
							document.getElementById("p_ih").textContent = "Größe:";
							document.getElementById("p_it").textContent = "12m²";
							document.getElementById("p_ih2").textContent = "";
							document.getElementById("p_it2").textContent = "";
							break;
						default:
							document.getElementById("h2_i").textContent = "";
							document.getElementById("p_ih").textContent = "comming soon...";
							document.getElementById("p_it").textContent = "";
							document.getElementById("p_ih2").textContent = "";
							document.getElementById("p_it2").textContent = "";
							break;
					}
					
					
					
				}
				else {
					document.getElementById("h2_i").textContent = "";
					document.getElementById("p_ih").textContent = "klicke auf einen Raum";
					document.getElementById("p_it").textContent = "";
					document.getElementById("p_ih2").textContent = "";
					document.getElementById("p_it2").textContent = "";
				}
					
			}
			if (!first_c && !no_view && isZoomed && stage == 0){
				if (  areaNames5.includes(area.userData.name)  || areaNames4.includes(area.userData.name)  || areaNames3.includes(area.userData.name) || areaNames2.includes(area.userData.name) || areaNames.includes(area.userData.name)){
					first_c = true;
					document.getElementById("h2_i").textContent = "Gebäude";
					document.getElementById("p_ih").textContent = "Wetter:";
					document.getElementById("p_it").textContent = temperature;
					document.getElementById("p_ih2").textContent = "Gesamtbereich:";
					document.getElementById("p_it2").textContent = "300m²";
					}
					else{
						document.getElementById("h2_i").textContent = "";
							document.getElementById("p_ih").textContent = "klicke auf das Gebäude";
							document.getElementById("p_it").textContent = "";
							document.getElementById("p_ih2").textContent = "";
							document.getElementById("p_it2").textContent = "";
			}
			
			}
		}
	}

}
//GebäudeInfos
function getObjekt_hover() {

	let first = false;
	let first2 = false;
	outlinePass.selectedObjects = []
	
	
	if (!no_view && isZoomed){
	im1.traverse((child) => {if (child.isMesh) {child.material.opacity = 0;  }});
	im2.traverse((child) => {if (child.isMesh) {child.material.opacity = 0;  }});
	im3.traverse((child) => {if (child.isMesh) {child.material.opacity = 0;  }});
	im4.traverse((child) => {if (child.isMesh) {child.material.opacity = 0;  }});
	im5.traverse((child) => {if (child.isMesh) {child.material.opacity = 0;  }});
	}
	p.className = "tooltip hide";
	div.className ="hide_C"
	cursor_size = 0.3;
	customCursor.className = "cursor unfocus";
	raycaster.setFromCamera(hoverMouse, camera);
	const intersects = raycaster.intersectObjects(scene.children, true);
	for (let i = 0; i < intersects.length; i++) {

		for (let i = 0; i < intersects.length; i++) {
			
			
			

			const group = findParentGroup(intersects[i].object);
			const area = intersects[i].object;

			

			if (!first2 && !no_view && isZoomed && stage == 1){
			if (  area.userData.name && areaNames.includes(area.userData.name)){
				first2 = true;
				outlinePass.selectedObjects = [area]
				area.material.opacity = 0.4;
				customCursor.className = "cursor focus";
				cursor_size = 0.5
				}
			}
			if (!first2 && !no_view && isZoomed && stage == 2){
				if (  area.userData.name && areaNames2.includes(area.userData.name)){
					first2 = true;
					outlinePass.selectedObjects = [area]
					area.material.opacity = 0.4;
					customCursor.className = "cursor focus";
					cursor_size = 0.5
					}
			}
			if (!first2 && !no_view && isZoomed && stage == 3){
				if (  area.userData.name && areaNames3.includes(area.userData.name)){
					first2 = true;
					outlinePass.selectedObjects = [area]
					area.material.opacity = 0.4;
					customCursor.className = "cursor focus";
					cursor_size = 0.5
					}
			}
			if (!first2 && !no_view && isZoomed && stage == 4){
				if (  area.userData.name && areaNames4.includes(area.userData.name)){
					first2 = true;
					outlinePass.selectedObjects = [area]
					area.material.opacity = 0.4;
					customCursor.className = "cursor focus";
					cursor_size = 0.5
					}
			}
			if (!first2 && !no_view && isZoomed && stage == 5){
				if (  area.userData.name && areaNames5.includes(area.userData.name)){
					first2 = true;
					outlinePass.selectedObjects = [area]
					area.material.opacity = 0.4;
					customCursor.className = "cursor focus";
					cursor_size = 0.5
					}
			}
			if (!first2 && !no_view && isZoomed && stage == 0){
				if (  areaNames5.includes(area.userData.name)  || areaNames4.includes(area.userData.name)  || areaNames3.includes(area.userData.name) || areaNames2.includes(area.userData.name) || areaNames.includes(area.userData.name)){
					first2 = true;
					outlinePass.selectedObjects = [area]
					area.material.opacity = 0.4;
					customCursor.className = "cursor focus";
					cursor_size = 0.5
					}
			}

			if (group && group.visible && !first && !group.userData.ground && !group.userData.id && isZoomed && no_view && group.userData.name != "area") {
				first = true;
				
				group.traverse((child) => {
					//if (child.isMesh) {child.material.color.set(0xffF000);}
					outlinePass.selectedObjects = [group]
					

				
				
				});
				if (group.userData.name == 1) {
					p.className = "tooltip show";
					div.className = "show_C"
					divcontainer.position.set(-9, 30, 0);
					p.textContent = "Ergeschoss"
				  }
				  
				 
				  else if (group.userData.name == 2) {
					p.className = "tooltip show";
					div.className = "show_C"
					divcontainer.position.set(-9, 30, 0);
					p.textContent = "1.Etage"
				  }
				  
				  
				  else if (group.userData.name == 3) {
					p.className = "tooltip show";
					div.className = "show_C"
					divcontainer.position.set(-9, 30, 0);
					p.textContent = "2.Etage"
				  }
				  
				  
				  else if (group.userData.name == 4) {
					p.className = "tooltip show";
					div.className = "show_C"
					divcontainer.position.set(-9, 30, 0);
					p.textContent = "3.Etage"
				  }
				  else if (group.userData.name == 5) {
					p.className = "tooltip show";
					div.className = "show_C"
					divcontainer.position.set(-9, 30, 0);
					p.textContent = "Dach"
				  }
				

				

			}
			

		}

	}

	
}

//parent Element
function findParentGroup(object) {
	let topParent = null;
	let parent = object.parent;

	while (parent) {
		if (parent.isGroup) {
			topParent = parent;
		}
		parent = parent.parent;
	}

	return topParent;
}



//3D-Objekte anlegen
function setMesh_cityground() {
	loader_cg.load(scenePath_cg, function (gltf) {
		mesh_cityground = gltf.scene;
		mesh_cityground.position.set(0, 0, 0);
		mesh_cityground.rotation.y = 3.1;
		mesh_cityground.userData.name = "floor"
		mesh_cityground.userData.ground = true
		mesh_cityground.userData.stage = true
		mesh_cityground.userData.upperstage = true
		scene.add(mesh_cityground);
	})
}

function setMesh_deco() {
	loader_d.load(scenePath_d, function (gltf) {
		mesh_deco = gltf.scene;
		mesh_deco.position.set(0, 0, 0);
		mesh_deco.rotation.y = 3.1;
		mesh_deco.userData.name = "decor"
		mesh_deco.userData.ground = true;
		scene.add(mesh_deco);
	})
}

function setMesh_street() {
	loader_s.load(scenePath_s, function (gltf) {
		mesh_street = gltf.scene;
		mesh_street.position.set(0, 0, 0);
		mesh_street.rotation.y = 3.1;
		mesh_street.userData.name = "decor"
		mesh_street.userData.ground = true;
		scene.add(mesh_street);
	})
}

function setMesh_buildings() {
	loader_b.load(scenePath_b, function (gltf) {
		mesh_buildings = gltf.scene;
		mesh_buildings.position.set(0, 0, 0);
		mesh_buildings.rotation.y = 3.1;
		mesh_buildings.userData.name = "decor"
		mesh_buildings.userData.ground = true;
		scene.add(mesh_buildings);
	})
}

function setMesh() {
	loader.load(scenePath, function (gltf) {
		mesh = gltf.scene;
		mesh.position.set(0, 0, 0);
		mesh.rotation.y = 3.1;
		mesh.userData.name = "floor"
		mesh.userData.ground = true
		mesh.userData.stage = true
		mesh.userData.upperstage = true
		scene.add(mesh);
	})
}

function setMesh4() {
	loader4.load(scenePath4, function (gltf4) {
		mesh4 = gltf4.scene;
		mesh4.position.set(0, 0, 0);
		mesh4.rotation.y = 3.1;
		mesh4.userData.name = "2"
		mesh4.userData.ground = false
		mesh4.userData.stage = true
		mesh4.userData.upperstage = true
		mesh4.traverse((child) => {
			if (child.isMesh) {
				if (child.name === 'glass2') {
					child.material.opacity = 0.8;
					child.material.transparent = true;
					
				  }

			}
		});
		scene.add(mesh4);
	})
}

function setMesh2() {
	loader2.load(scenePath2, function (gltf2) {
		mesh2 = gltf2.scene;
		mesh2.position.set(0, 0, 0);
		mesh2.rotation.y = 3.1;
		mesh2.userData.name = "1"
		mesh2.userData.ground = false
		mesh2.userData.stage = true
		mesh2.userData.upperstage = true


		mesh2.traverse((child) => {
			if (child.isMesh) {
				if (child.name === 'glass1') {
					child.material.opacity = 0.8;
					child.material.transparent = true;
				  }

			}
		});
		scene.add(mesh2);
	})
}

function setMesh3() {
	loader3.load(scenePath3, function (gltf3) {
		mesh3 = gltf3.scene;
		mesh3.position.set(0, 0, 0);
		mesh3.rotation.y = 3.1;
		mesh3.userData.name = "floor"
		mesh3.userData.ground = true
		mesh3.userData.stage = true
		mesh3.userData.upperstage = true
		scene.add(mesh3);
	})
}

function setMesh5() {
	loader5.load(scenePath5, function (gltf) {
		mesh5 = gltf.scene;
		mesh5.position.set(0, 0, 0);
		mesh5.rotation.y = 3.1;
		mesh5.userData.name = "floor"
		mesh5.userData.ground = true
		mesh5.userData.stage = true
		mesh5.userData.upperstage = true
		scene.add(mesh5);
	})
}

function setMesh6() {
	loader6.load(scenePath6, function (gltf) {
		mesh6 = gltf.scene;
		mesh6.position.set(0, 0, 0);
		mesh6.rotation.y = 3.1;
		mesh6.userData.name = "3"
		mesh6.userData.ground = false
		mesh6.userData.stage = true
		mesh6.userData.upperstage = true


		mesh6.traverse((child) => {
			if (child.isMesh) {
				if (child.name === 'glass3') {
					child.material.opacity = 0.8;
					child.material.transparent = true;
				  }

			}
		});
		scene.add(mesh6);
	})
}

function setMesh7() {
	loader7.load(scenePath7, function (gltf) {
		mesh7 = gltf.scene;
		mesh7.position.set(0, 0, 0);
		mesh7.rotation.y = 3.1;
		mesh7.userData.name = "box"
		mesh7.userData.ground = true
		mesh7.userData.stage = true
		mesh7.userData.upperstage = true
		scene.add(mesh7);
	})
}

function setMesh8() {
	loader8.load(scenePath8, function (gltf) {
		mesh8 = gltf.scene;
		mesh8.position.set(0, 0, 0);
		mesh8.rotation.y = 3.1;
		mesh8.userData.name = "4"
		mesh8.userData.ground = false
		mesh8.userData.stage = true
		mesh8.userData.upperstage = true
		


		mesh8.traverse((child) => {
			if (child.isMesh) {
				if (child.name === 'glass4') {
					child.material.opacity = 0.8;
					child.material.transparent = true;
				  }
			}
		});

		scene.add(mesh8);
	})
}

function setMesh9() {
	loader9.load(scenePath9, function (gltf) {
		mesh9 = gltf.scene;
		mesh9.position.set(0, 0, 0);
		mesh9.rotation.y = 3.1;
		mesh9.userData.name = "box"
		mesh9.userData.ground = true
		mesh9.userData.stage = true
		mesh9.userData.upperstage = true
		scene.add(mesh9);
	})
}

function setMesh10() {
	loader10.load(scenePath10, function (gltf) {
		mesh10 = gltf.scene;
		mesh10.position.set(0, 0, 0);
		mesh10.rotation.y = 3.1;
		mesh10.userData.name = "5"
		mesh10.userData.ground = false
		mesh10.userData.stage = true
		mesh10.userData.upperstage = true


		mesh10.traverse((child) => {
			if (child.isMesh) {
				if (child.name === 'glass5') {
					child.material.opacity = 0.8;
					child.material.transparent = true;
				  }
			}
		});

		scene.add(mesh10);
	})
}

function setMesh11() {
	loader11.load(scenePath11, function (gltf) {
		mesh11 = gltf.scene;
		mesh11.position.set(0, 0, 0);
		mesh11.rotation.y = 3.1;
		mesh11.userData.name = "box"
		mesh11.userData.ground = true
		mesh11.userData.stage = true
		mesh11.userData.upperstage = true
		scene.add(mesh11);
	})
}

function setInfoMesh1() {
	im1_loader.load(im1_scenePath, function (gltf) {
		im1 = gltf.scene;
		im1.position.set(0, 0, 0);
		im1.rotation.y = 3.1;
		im1.userData.name = "area"
		im1.userData.ground = false
		im1.userData.stage = true
		im1.userData.upperstage = true
		im1.userData.unsichtbar = true;
		im1.visible = false;
		im1.traverse((child) => {
			if (child.isMesh) {
				child.material.opacity = 0;
				child.material.transparent = true;
				child.material.color.set(0xe3720c);
				child.material.depthWrite = false;
			}
		});
		scene.add(im1);
	})
}

function setInfoMesh2() {
	im2_loader.load(im2_scenePath, function (gltf) {
		im2 = gltf.scene;
		im2.position.set(0, 0, 0);
		im2.rotation.y = 3.1;
		im2.userData.name = "area"
		im2.userData.ground = false
		im2.userData.stage = true
		im2.userData.upperstage = true
		im2.visible = false;
		im2.traverse((child) => {
			if (child.isMesh) {
				child.material.opacity = 0;
				child.material.transparent = true;
				child.material.color.set(0xe3720c);
				child.material.depthWrite = false;
			}
		});
		scene.add(im2);
	})
}

function setInfoMesh3() {
	im3_loader.load(im3_scenePath, function (gltf) {
		im3 = gltf.scene;
		im3.position.set(0, 0, 0);
		im3.rotation.y = 3.1;
		im3.userData.name = "area"
		im3.userData.ground = false
		im3.userData.stage = true
		im3.userData.upperstage = true
		im3.visible = false;
		im3.traverse((child) => {
			if (child.isMesh) {
				child.material.opacity = 0;
				child.material.transparent = true;
				child.material.color.set(0xe3720c);  
				child.material.depthWrite = false;
			}
		});
		scene.add(im3);
	})
}

function setInfoMesh4() {
	im4_loader.load(im4_scenePath, function (gltf) {
		im4 = gltf.scene;
		im4.position.set(0, 0, 0);
		im4.rotation.y = 3.1;
		im4.userData.name = "area"
		im4.userData.ground = false
		im4.userData.stage = true
		im4.userData.upperstage = true
		im4.visible = false;
		im4.traverse((child) => {
			if (child.isMesh) {
				child.material.opacity = 0;
				child.material.transparent = true;
				child.material.color.set(0xe3720c);  
				child.material.depthWrite = false;
			}
		});
		scene.add(im4);
	})
}

function setInfoMesh5() {
	im5_loader.load(im5_scenePath, function (gltf) {
		im5 = gltf.scene;
		im5.position.set(0, 0, 0);
		im5.rotation.y = 3.1;
		im5.userData.name = "area"
		im5.userData.ground = false
		im5.userData.stage = true
		im5.userData.upperstage = true
		im5.visible = false;
		im5.traverse((child) => {
			if (child.isMesh) {
				child.material.opacity = 0;
				child.material.transparent = true;
				child.material.color.set(0xe3720c); 
				child.material.depthWrite = false; 
			}
		});
		scene.add(im5);
	})
}

//Kameramovement
function rotateCameraAroundWorldAxis(angle) {
	// Bestimme die aktuelle Position der Kamera relativ zum Ursprung (0, 0, 0)
	const cameraPosition = camera.position.clone();

	// Rotiere die Position der Kamera um die Weltachse
	cameraPosition.applyAxisAngle(new THREE.Vector3(0, 1, 0), angle * rotationDirection);

	// Setze die neue Position der Kamera
	camera.position.copy(cameraPosition);

	// Richte die Kamera auf den Ursprung aus
	camera.lookAt(0, 0, 0);
}
//Resize
function onWindowResize() {
	
	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();
	renderer1.setSize(window.innerWidth, window.innerHeight);
	labelrenderer.setSize(window.innerWidth, window.innerHeight);
	console.log(window.innerWidth / window.innerHeight)
	if(window.innerWidth / window.innerHeight > 2.1 ){
		document.getElementById('other_arrow').style.display ="none"
		
	  }
	else{
		document.getElementById('other_arrow').style.display ="flex"
	}
}
//Performance optimierung
function getDeviceCapacity() {
    const cpuScore = measureCpuPerformance();
    const gpuScore = measureGpuPerformance();

    const totalScore = (cpuScore * 1000 + gpuScore)/10000 ; // Anpassung der Gewichtung für CPU
	
    // Kategorisierung der Gerätekapazität
    if (totalScore < 4000) {
        console.log(totalScore)
		return '1'; // Niedrigere Leistungskategorie
		
    } else {
        console.log(totalScore)
		return '2'; // Höhere Leistungskategorie
    }
	
}
function measureGpuPerformance() {
    const canvas = document.createElement('canvas');
    const gl = canvas.getContext('webgl');
    if (!gl) {
        return 0; // WebGL nicht unterstützt
    }

    const debugInfo = gl.getExtension('WEBGL_debug_renderer_info');
    const renderer = gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL);
    const isIntegratedGpu = renderer.includes("Intel");
    // Einfache Einschätzung basierend auf dem GPU-Typ
    return isIntegratedGpu ? 1000 : 3000; // Integrierte GPUs erhalten niedrigere Werte
}

function measureCpuPerformance() {
    const start = performance.now();
    let result = 0;

    // Durchführen einer intensiven Berechnung
    for (let i = 0; i < 5000000; i++) {
        result += Math.sqrt(i);
    }

    const end = performance.now();
    const duration = end - start;
    
    // Schätzung der CPU-Leistung basierend auf der Ausführungsdauer
    return 500000 / duration; // Höherer Wert entspricht besserer Leistung
}



// Animation der 3D-Objekte
function animate() {
	requestAnimationFrame(animate);
	steuerung.update();
	if ( !rv ) {
		input = 0.001
	}
	if (camera.position.z <= -111 || camera.position.z >= 111) {
		rotationDirection *= -1; 
	}
	rotateCameraAroundWorldAxis(input); 
	labelrenderer.render(scene, camera);
	
	composer.render();
	
	
	


}





//Listener

document.addEventListener('click', getObjekt_click);
document.addEventListener('mousemove', onDocumentMouseMove)
window.addEventListener('resize', onWindowResize)





//																main


Orbit();
setPoints();

//Kantenglättung - Outline anlegen
composer.addPass(new RenderPass(scene, camera));
composer.addPass(outlinePass);
composer.addPass(smaaPass);
outlinePass.edgeStrength = 50;
outlinePass.edgeThickness = 0.5;
outlinePass.visibleEdgeColor.set(0xe3720c)
outlinePass.hiddenEdgeVisible = true;

//3D- Objekt anlegen
let scenePath_s = './city_street.gltf'
let loader_s = new GLTFLoader();
setMesh_street();

let scenePath_b = './city_buildings.gltf'
let loader_b = new GLTFLoader();
setMesh_buildings();

let scenePath_d = './city_deko.gltf'
let loader_d = new GLTFLoader();
setMesh_deco();

let scenePath_cg = './city_ground.gltf'
let loader_cg = new GLTFLoader();
setMesh_cityground();

let scenePath = './ground_structure.gltf'
let loader = new GLTFLoader();
setMesh();

let scenePath4 = './stage2_wall.gltf'
let loader4 = new GLTFLoader();
setMesh4();

let scenePath2 = './ground_wall.gltf'
let loader2 = new GLTFLoader();
setMesh2();

let scenePath3 = './stage2_structure.gltf'
let loader3 = new GLTFLoader();
setMesh3();

let scenePath5 = './stage3_structure.gltf'
let loader5 = new GLTFLoader();
setMesh5();

let scenePath6 = './stage3_wall.gltf'
let loader6 = new GLTFLoader();
setMesh6();

let scenePath7 = './stage4_structure.gltf'
let loader7 = new GLTFLoader();
setMesh7();

let scenePath8 = './stage4_wall.gltf'
let loader8 = new GLTFLoader();
setMesh8();

let scenePath9 = './roof_structure.gltf'
let loader9 = new GLTFLoader();
setMesh9();

let scenePath10 = './roof_wall.gltf'
let loader10 = new GLTFLoader();
setMesh10();

let scenePath11 = './rooftop.gltf'
let loader11 = new GLTFLoader();
setMesh11();

let im1_scenePath = './i1.gltf'
let im1_loader = new GLTFLoader();
setInfoMesh1();

let im2_scenePath = './i2.gltf'
let im2_loader = new GLTFLoader();
setInfoMesh2();

let im3_scenePath = './i3.gltf'
let im3_loader = new GLTFLoader();
setInfoMesh3();

let im4_scenePath = './i4.gltf'
let im4_loader = new GLTFLoader();
setInfoMesh4();

let im5_scenePath = './i5.gltf'
let im5_loader = new GLTFLoader();
setInfoMesh5();

//Licht anlegen
sun.position.set(-200, 250, 100);
sun.intensity = 300000;
scene.add(sun)
sun2.position.set(200, 250, -100);
sun2.intensity = 90000;
scene.add(sun2)
room.position.set(0, 25, 0);
room.intensity = 0;
room.lookAt(0,0,0)
room.width = 100;
room.height = 100;
scene.add(room)
onWindowResize();
animate();

setTimeout(function() {
	//low Performance
	if (getDeviceCapacity() === '1') {
	  renderer1.setPixelRatio(0.8);
	
	  document.querySelector('input[class="s4"]').checked = true
	  switchDekoration()
	  
	}
	//high Performance
	if(getDeviceCapacity()==2){
	renderer1.setPixelRatio(window.devicePixelRatio);

	
	}
  }, 8000);

fetchWeatherData();


function fetchWeatherData() {
    const url = `https://api.openweathermap.org/data/2.5/weather?units=metric&lang=de&lat=48.456778&lon=7.943003&appid=ea0bb6cc92b5461f06dbd6ea7dbc8c4f`;
	
    fetch(url)
    .then(response => response.json())
    .then(data => {
        

		let description = data.weather[0].description;
		let formattedDescription = description.charAt(0).toLowerCase() + description.slice(1);

		temperature  = data.main.temp +"°C und " + formattedDescription;
		
    })
    .catch(error => console.error('Fehler beim Abrufen der Wetterdaten:', error));
	
	
	
}
setInterval(fetchWeatherData, 900000);