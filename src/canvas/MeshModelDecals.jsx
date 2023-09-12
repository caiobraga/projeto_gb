import { easing } from "maath";
import { useSnapshot } from "valtio";
import { useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";

import state from "../store";
import DecalModel from "./DecalModel";
import { useState } from "react";
import { Vector3 } from "three";

const MeshModel = () => {
	const snap = useSnapshot(state);
	const { nodes, materials } = useGLTF("/shirt.glb");
	const [decals, setDecal] = useState([]);
	const [hovered, setHovered] = useState(false);
	const [clicked, setClicked] = useState(false);

	useFrame((state, delta) =>
		easing.dampC(materials.lambert1.color, snap.color, 0.25, delta)
	);

	function createDecal(e) {
		console.log(e);
		let pos = e.point.toArray();
		let norm = e.face.normal;
		let rot = [
			norm.angleTo(new Vector3(1, 0, 0)),
			norm.angleTo(new Vector3(0, 1, 0)),
			norm.angleTo(new Vector3(0, 0, 1)),
		];

		return (
			<DecalModel
				src="/threejs.png"
				debug
				position={pos}
				// rotation={rot}
				scale={0.2}
			/>
		);
	}

	const stateString = JSON.stringify(snap);

	return (
		<group key={stateString}>
			<mesh
				onClick={(e) => {
					e.stopPropagation();
					setClicked(!clicked);
					decals.push(createDecal(e));
                }}
				onPointerOver={(e) => (e.stopPropagation(), setHovered(true))}
				onPointerOut={(e) => setHovered(false)}
				geometry={nodes.T_Shirt_male.geometry}
				material={materials.lambert1}
				material-roughness={1}
				dispose={null}>
				{/* <bufferGeometry
					attach="geometry"
					onUpdate={(self) => self.computeVertexNormals()}>
					<bufferAttribute
						attachObject={["attributes", "position"]}
						array={vertices}
						count={vertices.length / 3}
						itemSize={3}
					/>
				</bufferGeometry> */}
				{decals}
			</mesh>
		</group>
	);
};

export default MeshModel;
