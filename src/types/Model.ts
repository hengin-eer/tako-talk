import * as THREE from "three";
import { GLTF } from "three-stdlib";

/**
 * TODO: ここを変えて欲しい
 * というかアニメーションがどう見ても足りないので修正してもらう必要があるか？
 */
export type ActionName =
	| "[保留アクション].001"
	| "[保留アクション]"
	| "[保留アクション].002";

type KeyActionName = "default" | "twisting" | "thinking";

export interface GLTFAction extends THREE.AnimationClip {
	name: ActionName;
}

export type GLTFResult = GLTF & {
	nodes: {
		球_1: THREE.SkinnedMesh;
		球_2: THREE.SkinnedMesh;
		球_3: THREE.SkinnedMesh;
		球_4: THREE.SkinnedMesh;
		Bone: THREE.Bone;
		eyecontrollerboth: THREE.Bone;
		ik1L: THREE.Bone;
		ik2L: THREE.Bone;
		ik3L: THREE.Bone;
		ik4L: THREE.Bone;
		ik1R: THREE.Bone;
		ik2R: THREE.Bone;
		ik3R: THREE.Bone;
		ik4R: THREE.Bone;
		'スポット_Orientation': THREE.SpotLight
	};
	materials: {
		skin: THREE.MeshPhysicalMaterial;
		eye: THREE.MeshStandardMaterial;
		eyewhite: THREE.MeshStandardMaterial;
		eyewrapper: THREE.MeshPhysicalMaterial;
	};
	animations: GLTFAction[];
};
