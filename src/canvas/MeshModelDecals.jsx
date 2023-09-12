import { easing } from "maath";
import { useSnapshot } from "valtio";
import { useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";

import state from "../store";
import DecalModel from "./DecalModel";
import { useRef, useState } from "react";

const MeshModel = () => {
	const ref = useRef();
	const snap = useSnapshot(state);
	const { nodes, materials } = useGLTF("/shirt.glb");
	const [decals, setDecal] = useState([]);
	const [hovered, setHovered] = useState(false);
	const [clicked, setClicked] = useState(false);

	useFrame((state, delta) =>
		easing.dampC(materials.lambert1.color, snap.color, 0.25, delta)
	);

	function createDecal(intersect) {
		let pos = intersect.point;
        // pos.multiplyScalar(1);
		let norm = intersect.face.normal.clone();
		norm.transformDirection(ref.current.matrixWorld);
		norm.multiplyScalar(0.0000001);
		norm.add(intersect.point);
		console.log(norm);

		return (
			<DecalModel
				src="/threejs.png"
				// debug
				position={norm}
				// rotation={rot}
				scale={0.2}
			/>
		);
	}

	const stateString = JSON.stringify(snap);

	return (
		<group key={stateString}>
			<mesh
				ref={ref}
				onClick={(e) => {
					e.stopPropagation();
					setClicked(!clicked);
					decals.push(createDecal(e.intersections[0]));
				}}
				onPointerOver={(e) => (e.stopPropagation(), setHovered(true))}
				onPointerOut={(_) => setHovered(false)}
				geometry={nodes.T_Shirt_male.geometry}
				material={materials.lambert1}
				material-roughness={1}
				dispose={null}>
				{/* <Wireframe /> */}
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
