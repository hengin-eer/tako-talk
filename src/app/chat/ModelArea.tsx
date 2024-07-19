"use client";

import { Canvas } from "@react-three/fiber";
import { FC } from "react";
import { OctopusModel } from "./OctopusModel";

export const ModelArea: FC = () => {
	return (
		<div className="w-full sm:w-[400px] aspect-square mx-auto">
			<Canvas>
				<ambientLight />
				{/* Rig? */}
				<fog attach="fog" color={"#fff"} near={1} far={20} />
				<pointLight position={[10, 10, 10]} />
				<OctopusModel position={[0, 0, 2]} />
			</Canvas>
		</div>
	)
}
