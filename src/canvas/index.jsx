import { Canvas } from "@react-three/fiber";
import {
	Environment,
	Center,
	OrthographicCamera,
	OrbitControls,
	CycleRaycast,
} from "@react-three/drei";

import MeshModel from "./MeshModelDecals";

import { useSnapshot } from "valtio";
import state from "../store";
import { useState } from "react";

const CanvasModel = () => {
	const snap = useSnapshot(state);
	const [{ objects, cycle }, setRaycast] = useState({});

	return (
		<Canvas
			camera={{ position: [0, 0, 2.5], fov: 25 }}
			gl={{ preserveDrawingBuffer: true }}
			className="w-full max-w-full h-full transition-all ease-in">
			<ambientLight intensity={0.23} />
			<Environment preset="city" />
			<OrthographicCamera>
				{!snap.islookView ? (
					<OrbitControls
						target={[0, 0, 0]}
						enablePan={false}
						enableZoom={true}
						makeDefault
						minDistance={0.75}
						maxDistance={2}
					/>
				) : (
					<></>
				)}
				<Center>
					<MeshModel />
				</Center>
			</OrthographicCamera>
			<CycleRaycast
				onChanged={(objects, cycle) => setRaycast(objects, cycle)}
			/>
		</Canvas>
	);
};

export default CanvasModel;
