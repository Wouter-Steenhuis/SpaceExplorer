import * as THREE from 'https://cdn.skypack.dev/three@0.129.0/build/three.module.js';
import { OrbitControls } from 'https://cdn.skypack.dev/three@0.129.0/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'https://cdn.skypack.dev/three@0.129.0/examples/jsm/loaders/GLTFLoader.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 1, 500);

let object;
let controls;
let isInteracting = false; // Om te controleren of de gebruiker interactie heeft
let isRotating = true; // De automatische rotatie
let rotationSpeed = 0.001; // Rotatiesnelheid wanneer niet interactief
let previousMousePosition = { x: 0, y: 0 };

const loader = new GLTFLoader();

loader.load(
    `models/mars/scene.gltf`,
    function (gltf) {
        object = gltf.scene;
        scene.add(object);
    },
    function (xhr) {
        console.log((xhr.loaded / xhr.total * 100) + '% geladen');
    },
    function (error) {
        console.error('Fout bij het laden van het model:', error);
        alert('Het model kon niet worden geladen. Controleer of het pad correct is.');
    }
);

const renderer = new THREE.WebGLRenderer({ alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);

const container = document.getElementById("planet-3d-model");
if (container) {
    container.appendChild(renderer.domElement);
} else {
    console.error('Container-element niet gevonden.');
}

const topLight = new THREE.DirectionalLight(0xffffff, 2);
topLight.position.set(500, 500, 500);
scene.add(topLight);

const ambientLight = new THREE.AmbientLight(0x333333, 1);
scene.add(ambientLight);

controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.05;
controls.rotateSpeed = 1.5;
controls.enableZoom = true;
controls.enablePan = true;
controls.enabled = true;

camera.position.z = 500;

// Eventlisteners voor interactie
renderer.domElement.addEventListener("mousedown", (event) => {
    isInteracting = true; // Gebruiker is interactief
    isRotating = false;   // Stop automatische rotatie
    previousMousePosition = { x: event.clientX, y: event.clientY };
});

renderer.domElement.addEventListener("mousemove", (event) => {
    if (isInteracting) {
        // Als de muis beweegt en de gebruiker interactief is, stop de automatische rotatie
        isRotating = false;
    }
});

renderer.domElement.addEventListener("mouseup", () => {
    isInteracting = false; // Gebruiker stopt met interactie
    isRotating = true;     // Zet automatische rotatie weer aan
});

renderer.domElement.addEventListener("wheel", () => {
    if (controls.enableZoom) {
        isInteracting = true; // Inzoomen is ook interactie
        isRotating = false;   // Stop de automatische rotatie
    }
});

const animate = () => {
    requestAnimationFrame(animate);

    if (isRotating && object) {
        // Voeg automatische rotatie toe wanneer de gebruiker niet interactief is
        object.rotation.y += rotationSpeed;
    }

    controls.update();
    renderer.render(scene, camera);
};

window.addEventListener("resize", function () {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

animate();

document.getElementById("backButton").addEventListener("click", () => {
    window.location.href = "index.html";
});
