// codigo desplazando camara, y cubos se acercan

import './style.css'; 
import * as THREE from 'three';

// 1. ESCENA
const scene = new THREE.Scene();

// 2. CÁMARA
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 3;

// 3. RENDERIZADOR
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// 4. CUBO
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshStandardMaterial({ color: 0x0000ff });

//cubo1
const cube = new THREE.Mesh(geometry, material);
cube.position.set(1,3,-5);

//cubo2
const cube2 = new THREE.Mesh(geometry, material);
cube2.position.set(2,2,-5);

scene.add(cube);
scene.add(cube2);


// Diccionario para registrar qué teclas están presionadas (COMA CORREGIDA)
const keys = {
    w: false,
    a: false,
    s: false,
    d: false,
    shift: false,
    ArrowUp: false,
    ArrowDown: false,
    ArrowLeft: false,
    ArrowRight: false    
};

// ==========================================
// LUCES
// ==========================================
const ambientLight = new THREE.AmbientLight(0xffffff, 0.2);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 1.5);
directionalLight.position.set(3, 5, 2); 
scene.add(directionalLight);

// 5. BUCLE DE ANIMACIÓN (Game Loop)
function animate() {
    requestAnimationFrame(animate);

    // 1. CALCULAR VELOCIDAD
    let currentSpeed = 0.05; 
    if (keys.shift) {
        currentSpeed = 0.12; // Velocidad de Sprint
    }

    // --- MECÁNICA DE MOVIMIENTO (WASD) ---
    if (keys.w) camera.position.y += currentSpeed; 
    if (keys.s) camera.position.y -= currentSpeed; 
    if (keys.a) camera.position.x -= currentSpeed; 
    if (keys.d) camera.position.x += currentSpeed; 

    // --- MECÁNICA DE ROTACIÓN (Flechas) ---
    if (keys.ArrowUp) cube.rotation.x -= currentSpeed; 
    if (keys.ArrowDown) cube.rotation.x += currentSpeed; 
    if (keys.ArrowRight) cube.rotation.y += currentSpeed; 
    if (keys.ArrowLeft) cube.rotation.y -= currentSpeed; 

    // --- LIMITAR LA POSICIÓN (Colisiones con bordes) ---
    if (camera.position.x > 3) camera.position.x = 3;
    else if (camera.position.x < -3) camera.position.x = -3;

    if (camera.position.y > 3) camera.position.y = 3;
    else if (camera.position.y < -3) camera.position.y = -3;


    // Rotación constante automática muy leve
    cube.position.z += 0.05;
    if (cube.position.z >3) cube.position.z = -5
    
    //cube.rotation.y += 0.00;

    renderer.render(scene, camera);
}

animate();

// 6. AJUSTE DE PANTALLA
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

// LISTENERS CORREGIDOS Y OPTIMIZADOS
window.addEventListener('keydown', (event) => {
    // Si empieza con Arrow se queda igual (ej: ArrowUp). Si no, pasa a minúsculas (ej: w, a, s, d, shift)
    const key = event.key.startsWith('Arrow') ? event.key : event.key.toLowerCase();
    
    if (key in keys) {
        keys[key] = true;
    }
});

window.addEventListener('keyup', (event) => {
    const key = event.key.startsWith('Arrow') ? event.key : event.key.toLowerCase();
    
    if (key in keys) {
        keys[key] = false;
    }
});