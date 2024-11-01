"use client";

import { Canvas } from "@react-three/fiber";
import { FC } from "react";
import { OctopusModel } from "./OctopusModel";
import { OrbitControls } from "@react-three/drei";

export const ModelArea: FC = () => {
	return (
		<div className="w-full sm:w-[400px] aspect-square mx-auto">
			<Canvas camera={{ position: [0, 0, 10], fov: 30 }}>
				<OrbitControls enableRotate={true} enableZoom={true} />
				<ambientLight intensity={2} />
				{/* Rig? */}
				<fog attach="fog" color={"#fff"} near={1} far={20} />
				<OctopusModel position={[0, -1.5, 2]} />
			</Canvas>
		</div>
	)
}
