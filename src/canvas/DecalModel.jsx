import { Decal, useTexture } from "@react-three/drei";
import { useRef } from "react";

const DecalModel = ({ src, ...props }) => {
    const ref = useRef();
	const texture = useTexture(src);

	return (
		<Decal ref={ref} {...props}>
			<meshPhysicalMaterial
				transparent
                polygonOffset
                polygonOffsetFactor={-10}
                map={texture}
                // map-flipZ={false}
                map-anisotropy={16}
                iridescence={1}
                iridescenceIOR={1}
                iridescenceThicknessRange={[0, 1400]}
                roughness={1}
                clearcoat={0.5}
                metalness={0.75}
                toneMapped={false}
			/>
		</Decal>
	);
};

export default DecalModel;
