import * as THREE from 'three';
import {CSG} from 'three-csg-ts';

const xAmount = 4;
const yAmount = 4;
const caseSize = 4;
const innerCaseSize = 3.5;
const caseBuffer = 2;
const groundTexture = new THREE.TextureLoader().load('./assets/wood.jpeg');

export default class shelfSequence {
    scene;
    camera;
    shelves;

    #started;

    constructor(amount, options) {
        this.scene = options.scene ?? null;
        this.camera = options.camera ?? null;

        this.#started = false;
        this.shelves = [];

        for (let i = 0; i < amount; i++) {
            let xPosition = (options.xStart ?? 0) + (i * ((caseSize * xAmount) + caseBuffer));
            let yPosition = options.yStart ?? 0;
            let zPosition = options.zStart ?? 0;

            this.shelves.push(this.initShelf(xPosition, yPosition, zPosition));
        }
    }

    initShelf(xStart, yStart, zStart) {
        let cases = [];

        for (let i = 0; i < yAmount; i++) {
            for (let ii = 0; ii < xAmount; ii++) {
                let shelfCase = this.#createShelfCase();
                let zPosition = (ii * caseSize) + zStart;
                let yPosition = (i * caseSize) + yStart;
                let spotLight = new THREE.SpotLight(0x1F0353, 12, caseSize + 2);

                shelfCase.position.set(xStart, yPosition, zPosition);
                spotLight.position.set(xStart, yPosition + (caseSize / 2), zPosition +  (caseSize / 2));
                shelfCase.rotation.y = 1.5;

                spotLight.castShadow = true;
                spotLight.shadow.mapSize.width = caseSize;
                spotLight.shadow.mapSize.height = caseSize;
                spotLight.shadow.camera.near = 0.1;
                spotLight.shadow.camera.far = 1000;

                this.scene.add(spotLight);
                this.scene.add(shelfCase);
                cases.push(shelfCase);
            }
        }

        return cases;
    }

    #createShelfCase() {
        let box = new THREE.Mesh(
            new THREE.BoxGeometry(caseSize, caseSize, caseSize),
            new THREE.MeshStandardMaterial({map: groundTexture})
        );

        let negativeBox = new THREE.Mesh(
            new THREE.BoxGeometry(innerCaseSize, innerCaseSize, caseSize),
            new THREE.MeshStandardMaterial({map: groundTexture})
        );

        box.updateMatrix();
        negativeBox.updateMatrix();
        return CSG.subtract(box, negativeBox);
    }

    update() {
        if (this.#started === false) return;
    }
}