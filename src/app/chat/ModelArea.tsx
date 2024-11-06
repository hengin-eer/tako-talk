"use client";

import { Canvas } from "@react-three/fiber";
import { FC } from "react";
import { OrbitControls } from "@react-three/drei";
import Model from "./NewTako";
import { ActionName } from "@/types/Model";

type Props = {
	actionName: ActionName;
};

export const ModelArea: FC<Props> = ({ actionName }) => {
	return (
		<div className="mt-[160px] mx-auto h-[60vh]">
			<Canvas camera={{ position: [0, 0, 10], fov: 30 }}>
				<OrbitControls enableRotate={true} enableZoom={true} />
				<ambientLight intensity={1} color={"#a0d8ef"} />
				<fog attach="fog" color={"#2288aa"} near={3} far={20} />
				<Model actionName={actionName} />
			</Canvas>
		</div>
	);
};
