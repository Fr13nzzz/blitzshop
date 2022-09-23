import * as THREE from 'three';

export default class StartSequence {
    moveUntil = 40;

    scene;
    camera;

    #started;
    #running;
    #cameraStartingPoint;

    leftDoor;
    rightDoor;

    constructor(options) {
        this.scene = options.scene ?? null;
        this.camera = options.camera ?? null;

        this.#cameraStartingPoint = this.camera.position.z;

        this.#started = false;
        this.#running = false;
        this.init();
    }

    init() {
        this.#drawEntryDoors();
    }

    #drawEntryDoors() {
        this.leftDoor = new THREE.Mesh(
            new THREE.PlaneGeometry(100, 100, 1, 1),
            new THREE.MeshStandardMaterial({
                opacity: 0.7,
                transparent: true,
                color: 0x606060
            })
        );

        this.rightDoor = new THREE.Mesh(
            new THREE.PlaneGeometry(100, 100, 1, 1),
            new THREE.MeshStandardMaterial({
                opacity: 0.7,
                transparent: true,
                color: 0x606060
            })
        );

        this.leftDoor.position.z = 350;
        this.rightDoor.position.z = 350;
        this.leftDoor.position.x = 50;
        this.rightDoor.position.x = -50;

        this.scene.add(this.leftDoor);
        this.scene.add(this.rightDoor);
    }

    #widenDoors() {
        this.rightDoor.position.x -= 0.2;
        this.leftDoor.position.x += 0.2;
    }

    #moveCamera() {
        this.camera.position.z -= 0.2;

        if (this.camera.position.z <= this.#cameraStartingPoint - this.moveUntil) {
            this.#running = false;
        }
    }

    startSequence() {
        if (this.#started === true) return;

        let greeting = document.querySelector('#greeting--welcome');
        greeting.style.display = 'none';
        this.#widenDoors();

        this.#started = true;
        this.#running = true;
    }

    update() {
        if (this.#running === false || this.#started === false) return;
        this.#widenDoors();
        this.#moveCamera();
    }
}