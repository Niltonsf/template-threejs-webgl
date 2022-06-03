import * as THREE from 'three';
import Experience from "../Experience";

export default class Environment {
	constructor() {
		this.experience = new Experience();
		this.scene = this.experience.scene;
		this.resources = this.experience.resources;

		// Methods
		this.setSunLight();
		this.setEnvironment();
	}

	setSunLight() {
		this.sunLight = new THREE.DirectionalLight('#ffffff', 4);
		this.sunLight.castShadow = true;
		this.sunLight.shadow.camera.far = 15;
		this.sunLight.shadow.mapSize.set(1024, 1024);
		this.sunLight.shadow.normalBias = 0.05;
		this.sunLight.position.set(3.5, 2, - 1.25);
		this.scene.add(this.sunLight);
	}

	setEnvironment() {
		this.environmentMap = {};
		this.environmentMap.intesity = 0.4;
		this.environmentMap.texture = this.resources.items.environmentMapTexture;
		this.environmentMap.texture.encoding = THREE.sRGBEncoding;

		this.scene.environment = this.environmentMap.texture;

		this.environmentMap.updateMaterials = () => {
			this.scene.traverse((child) => {
				if(child instanceof THREE.Mesh && child.material instanceof THREE.MeshStandardMaterial)
        {
            child.material.envMap = this.environmentMap.texture;
            child.material.envMapIntensity = this.environmentMap.intesity;
            child.material.needsUpdate = true;
        }
			});
		}

		this.environmentMap.updateMaterials();
	}
}