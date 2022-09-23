import * as THREE from 'three';
import {OrbitControls} from 'three/addons/controls/OrbitControls';
import StartSequence from './Sequences/start';
import ShelfSequence from './Sequences/shelfSequence';

class listView {
    scene;
    camera;
    renderer;

    controls;

    #start;
    #shelves;

    setup() {
        //init scene camera and renderer
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 1000);
        this.camera.position.setZ(400);
        this.camera.position.setY(6);
        this.renderer = new THREE.WebGLRenderer({
            canvas: document.getElementById('background'),
        });

        this.renderer.setPixelRatio(window.devicePixelRatio);
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.camera.position.setY(6);

        //init OrbitControl
        this.controls = new OrbitControls(this.camera, this.renderer.domElement);
        this.controls.enableZoom = false;
        this.controls.minPolarAngle = 0;
        this.controls.maxPolarAngle = Math.PI / 2;

        //init lights
        let s1 = new THREE.SpotLight(0xffffff);
        s1.position.set(500, 200, 350);
        s1.castShadow = true;
        s1.shadow.mapSize.width = 1024;
        s1.shadow.mapSize.height = 1024;
        s1.shadow.camera.near = 500;
        s1.shadow.camera.far = 4000;
        s1.shadow.camera.fov = 30;

        let s2 = new THREE.SpotLight(0xffffff);
        s2.position.set(-500, 200, 350);
        s2.castShadow = true;
        s2.shadow.mapSize.width = 1024;
        s2.shadow.mapSize.height = 1024;
        s2.shadow.camera.near = 500;
        s2.shadow.camera.far = 4000;
        s2.shadow.camera.fov = 30;

        //init floor
        let groundTexture = new THREE.TextureLoader().load('./assets/floor.jpg');
        groundTexture.wrapS = THREE.RepeatWrapping;
        groundTexture.wrapT = THREE.RepeatWrapping;
        groundTexture.repeat.set(120, 120);
        let ground = new THREE.Mesh(
            new THREE.PlaneGeometry(1000, 750, 1, 1),
            new THREE.MeshStandardMaterial({map: groundTexture})
        );
        ground.rotation.x = -1.5;

        //add all to scene
        this.scene.add(s1);
        this.scene.add(s2);
        this.scene.add(ground);

        this.addEventListeners();

        this.#start = new StartSequence({
            scene: this.scene,
            camera: this.camera
        });

        this.#shelves = new ShelfSequence(3, {
            scene: this.scene,
            camera: this.camera,
            xStart: 0,
            yStart: 2,
            zStart: 300,
        });
    }

    addEventListeners() {
        const that = this;

        window.addEventListener('keydown', function (event) {
            if (event.keyCode !== 13) return;
            that.#start.startSequence();
        });

        window.addEventListener('wheel', function (event) {
            let movement = 0.5 * Math.sign(event.deltaY);
            that.camera.position.z += movement;
        });
    }

    animate() {
        requestAnimationFrame(() => this.animate());
        this.controls.update();
        this.#start.update();
        this.#shelves.update();
        this.renderer.render(this.scene, this.camera);
    }
}

window.onload = function () {
    let view = new listView();
    view.setup();
    view.animate();
}