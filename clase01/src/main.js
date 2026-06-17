//construcción cubo azul

import './style.css'; 
import * as THREE from 'three';

// 1. ESCENA
const scene = new THREE.Scene();

// 2. CÁMARA
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 5; // Lo alejé un poco más para ver mejor el escenario

// 3. RENDERIZADOR
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// ==========================================
// RELOJ PARA DELTA TIME
// ==========================================
const clock = new THREE.Clock();

// 4. CUBO (Jugador)
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshStandardMaterial({ color: 0x0000ff });
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

// Diccionario de teclas
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

// LUCES
const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 1.5);
directionalLight.position.set(3, 5, 2); 
scene.add(directionalLight);

// 5. BUCLE DE ANIMACIÓN (Game Loop)
function animate() {
    requestAnimationFrame(animate);

    // Obtener el tiempo transcurrido desde el último frame
    const deltaTime = clock.getDelta();

    // 1. CALCULAR VELOCIDAD (Ahora por segundo, no por frame)
    let speed = 5; // 5 unidades por segundo
    if (keys.shift) {
        speed = 10; // Velocidad de Sprint
    }

    // Velocidad de rotación (radianes por segundo)
    const rotationSpeed = 3; 

    // --- MECÁNICA DE MOVIMIENTO (WASD) ---
    // Multiplicamos por deltaTime para que sea uniforme en cualquier PC
    if (keys.w) cube.position.y += speed * deltaTime; 
    if (keys.s) cube.position.y -= speed * deltaTime; 
    if (keys.a) cube.position.x -= speed * deltaTime; 
    if (keys.d) cube.position.x += speed * deltaTime; 

    // --- MECÁNICA DE ROTACIÓN (Flechas) ---
    if (keys.ArrowUp) cube.rotation.x -= rotationSpeed * deltaTime; 
    if (keys.ArrowDown) cube.rotation.x += rotationSpeed * deltaTime; 
    if (keys.ArrowRight) cube.rotation.y += rotationSpeed * deltaTime; 
    if (keys.ArrowLeft) cube.rotation.y -= rotationSpeed * deltaTime; 

    // --- LIMITAR LA POSICIÓN ---
    if (cube.position.x > 5) cube.position.x = 5;
    else if (cube.position.x < -5) cube.position.x = -5;

    if (cube.position.y > 3) cube.position.y = 3;
    else if (cube.position.y < -3) cube.position.y = -3;

    renderer.render(scene, camera);
}

animate();

// 6. AJUSTE DE PANTALLA
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

// LISTENERS
window.addEventListener('keydown', (event) => {
    const key = event.key.startsWith('Arrow') ? event.key : event.key.toLowerCase();
    if (key in keys) keys[key] = true;
});

window.addEventListener('keyup', (event) => {
    const key = event.key.startsWith('Arrow') ? event.key : event.key.toLowerCase();
    if (key in keys) keys[key] = false;
});    d: false,
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
