// Создание сцены
var scene = new THREE.Scene();

// Создание камеры
var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 5;

// Создание рендерера
var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Создание сферы
var geometry = new THREE.SphereGeometry(1, 32, 32);
var material = new THREE.MeshBasicMaterial({color: 0xff0000});
var sphere = new THREE.Mesh(geometry, material);
scene.add(sphere);

// Обработчик события клика мыши
document.addEventListener('click', function(event) {
    // Получение позиции клика мыши
    var mouse = new THREE.Vector2();
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

    // Создание луча от камеры через позицию клика мыши
    var raycaster = new THREE.Raycaster();
    raycaster.setFromCamera(mouse, camera);

    // Поиск пересечений сферы и луча
    var intersects = raycaster.intersectObject(sphere);

    if (intersects.length > 0) {
        // Если есть пересечение, измените цвет сферы
        sphere.material.color.set(0x00ff00);
    }
}, false);

// Функция анимации
function animate() {
    requestAnimationFrame(animate);

    // Вращение сферы
    sphere.rotation.x += 0.01;
    sphere.rotation.y += 0.01;

    // Рендеринг сцены с камерой
    renderer.render(scene, camera);
}

// Запуск анимации
animate();
