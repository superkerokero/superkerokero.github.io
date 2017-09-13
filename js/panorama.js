var camera, scene, renderer;
var canvas = document.getElementById("particles-js");
var isUserInteracting = false,
    onMouseDownMouseX = 0,
    onMouseDownMouseY = 0,
    lon = 0,
    onMouseDownLon = 0,
    lat = 0,
    onMouseDownLat = 0,
    phi = 0,
    theta = 0;
init();
animate();

function init() {
    var container, mesh;
    var color = new THREE.Color(0xffffff);
    container = document.getElementById('container-panorama');
    camera = new THREE.PerspectiveCamera(45, 2 * window.innerWidth / window.innerHeight, 1, 1100);
    camera.target = new THREE.Vector3(0, 0, 0);
    scene = new THREE.Scene();
    scene.background = color;
    var geometry = new THREE.SphereGeometry(500, 60, 40);
    geometry.scale(-1, 1, 1);
    var material = new THREE.MeshBasicMaterial({
        map: new THREE.TextureLoader().load('img/spaceship.jpg')
    });
    mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);
    renderer = new THREE.WebGLRenderer();
    renderer.setPixelRatio(window.devicePixelRatio);
    //renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setSize($("#masthead").width(), $("#masthead").height());
    container.appendChild(renderer.domElement);
    canvas.addEventListener('mousedown', onDocumentMouseDown, false);
    canvas.addEventListener('mousemove', onDocumentMouseMove, false);
    canvas.addEventListener('mouseup', onDocumentMouseUp, false);
    canvas.addEventListener('touchstart', onDocumentTouchStart, false);
    canvas.addEventListener('touchmove', onDocumentTouchMove, false);
    canvas.addEventListener('touchend', onDocumentTouchEnd, false);
    //document.addEventListener('wheel', onDocumentMouseWheel, false);
    //
    document.addEventListener('dragover', function(event) {
        event.preventDefault();
        event.dataTransfer.dropEffect = 'copy';
    }, false);
    document.addEventListener('dragenter', function(event) {
        document.body.style.opacity = 0.5;
    }, false);
    document.addEventListener('dragleave', function(event) {
        document.body.style.opacity = 1;
    }, false);
    document.addEventListener('drop', function(event) {
        event.preventDefault();
        var reader = new FileReader();
        reader.addEventListener('load', function(event) {
            material.map.image.src = event.target.result;
            material.map.needsUpdate = true;
        }, false);
        reader.readAsDataURL(event.dataTransfer.files[0]);
        document.body.style.opacity = 1;
    }, false);
    //
    window.addEventListener('resize', onWindowResize, false);
}

function onWindowResize() {
    camera.aspect = $("#masthead").width() / $("#masthead").height();
    camera.updateProjectionMatrix();
    //renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setSize($("#masthead").width(), $("#masthead").height());
}

function onDocumentMouseDown(event) {
    event.preventDefault();
    isUserInteracting = true;
    onMouseDownMouseX = event.clientX;
    onMouseDownMouseY = event.clientY;
    onMouseDownLon = lon;
    onMouseDownLat = lat;
}

function onDocumentMouseMove(event) {
    if (isUserInteracting === true) {
        lon = (onMouseDownMouseX - event.clientX) * 0.1 + onMouseDownLon;
        lat = (event.clientY - onMouseDownMouseY) * 0.1 + onMouseDownLat;
    }
}

function onDocumentMouseUp(event) {
    isUserInteracting = false;
}

function onDocumentTouchStart(event) {
    event.preventDefault();
    isUserInteracting = true;
    onMouseDownMouseX = event.touches[0].clientX;
    onMouseDownMouseY = event.touches[0].clientY;
    onMouseDownLon = lon;
    onMouseDownLat = lat;
}

function onDocumentTouchMove(event) {
    if (isUserInteracting === true) {
        lon = (onMouseDownMouseX - event.touches[0].clientX) * 0.1 + onMouseDownLon;
        lat = (event.touches[0].clientY - onMouseDownMouseY) * 0.1 + onMouseDownLat;
    }
}

function onDocumentTouchEnd(event) {
    isUserInteracting = false;
}

function onDocumentMouseWheel(event) {
    camera.fov += event.deltaY * 0.05;
    camera.updateProjectionMatrix();
}

function animate() {
    requestAnimationFrame(animate);
    update();
}

function update() {
    if (isUserInteracting === false) {
        lon += 0.1;
    }
    lat = Math.max(-85, Math.min(85, lat));
    phi = THREE.Math.degToRad(90 - lat);
    theta = THREE.Math.degToRad(lon);
    camera.target.x = 500 * Math.sin(phi) * Math.cos(theta);
    camera.target.y = 500 * Math.cos(phi);
    camera.target.z = 500 * Math.sin(phi) * Math.sin(theta);
    camera.lookAt(camera.target);
    /*
    // distortion
    camera.position.copy( camera.target ).negate();
    */
    renderer.render(scene, camera);
}