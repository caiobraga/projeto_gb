import { Canvas } from "@react-three/fiber";
import { Environment, Center, OrthographicCamera, OrbitControls } from "@react-three/drei";

import Mesh from "./Mesh";

const CanvasModel = () => {
	return (
		<Canvas
			camera={{ position: [0, 0, 4], fov: 25 }}
			gl={{ preserveDrawingBuffer: true }}
			className="w-full max-w-full h-full transition-all ease-in">
			<ambientLight intensity={0.23} />
			<Environment preset="city" />
			<OrthographicCamera>
				<OrbitControls
					target={[0, 0, 0]}
					enablePan={false}
					enableZoom={false}
					makeDefault
				/>
				<Center>
					<Mesh />
				</Center>
			</OrthographicCamera>
		</Canvas>
	);
};

export default CanvasModel;
