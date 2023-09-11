import { easing } from "maath";
import { useSnapshot } from "valtio";
import { useFrame } from "@react-three/fiber";
import { Decal, useGLTF, useTexture } from "@react-three/drei";

import state from "../store";

import React, { useEffect, useRef, useState, useLayoutEffect, useMemo } from "react";
  import * as THREE from "three";
 
const Mesh = () => {
	const snap = useSnapshot(state);
	const { nodes, materials } = useGLTF("/jeans.glb");

	const logoTexture = useTexture(snap.logoDecal);
	const fullTexture = useTexture(snap.fullDecal);
	const [allowControls, setAllowControls] = useState(true);

	const canvasRef = useRef(document.createElement("canvas"));
	const textureRef = useRef(new THREE.CanvasTexture(canvasRef.current));

	const colorMaterial = useMemo(() => new THREE.MeshStandardMaterial({
		color: new THREE.Color(snap.color),
		metalness: 0,
		roughness: 1,
	  }), [snap.color]);
	  
	 

  
	useLayoutEffect(() => {
		const canvas = canvasRef.current;
	
		canvas.width = 1024;
		canvas.height = 1024;
	
		const context = canvas.getContext("2d");
		if (context) {
			
		  context.rect(0, 0, canvas.width, canvas.height);
		  context.fillStyle = snap.color;
		  context.fill();
		  
		  
		}
	  }, []);

	  
	
	  function handleBrushPointerMove({ uv }) {
		if (allowControls || !snap.islookView) {
		  return;
		}
 		if (uv) {
		  const canvas = canvasRef.current;
	
		  const x = uv.x * canvas.width;
		  const y = (1 - uv.y) * canvas.height;
	
		  const context = canvas.getContext("2d");
		  if (context) {
			
			context.beginPath();
			context.arc(x - 2, y - 2, 4, 0, 2 * Math.PI);
			context.fillStyle = "black";
			context.fill();
			console.log(canvasRef);
			if (canvasRef.current) {
			  console.log("marked");
			  textureRef.current.needsUpdate = true;
			  colorMaterial.needsUpdate = true; // Force material update
			}
			
		  }
		}
	  }

	useFrame((state, delta) => {
		easing.dampC(materials.lambert1.color , snap.color, 0.25, delta)
	}, [snap.color]
		
	);



	

	const stateString = JSON.stringify(snap);

	return (
		<group key={stateString}>
			<mesh
				geometry={nodes.jeans.geometry}
				material={materials.lambert1}
				material-roughness={1}
				dispose={null}
				onPointerDown={() => setAllowControls(false)}
        onPointerUp={() => setAllowControls(true)}
        onPointerMove={handleBrushPointerMove}	
				>

{/*<meshStandardMaterial attach="material" metalness={0} roughness={1}>
            <canvasTexture
              ref={textureRef}
              attach="map"
              image={canvasRef.current}
              
            />
          </meshStandardMaterial>*/}
				{/* Apply the color material for the color */}
				
  
  <meshStandardMaterial attach="material" metalness={0} roughness={1}>
            <canvasTexture
              ref={textureRef}
              attach="map"
              image={canvasRef.current}
		  		
			  
              
            />
          </meshStandardMaterial>

		  
 

{/* Apply the canvas texture material for the texture */}
 
				{snap.isFullTexture && (
					<Decal
						position={[0, 0, 0]}
						rotation={[0, 0, 0]}
						scale={1}
						map={fullTexture}
					/>
				)}

				{snap.isLogoTexture && (
					<Decal
						position={[-0.085, 0.135, 0.15]}
						rotation={[0, 0, 0]}
						scale={0.15}
						map={logoTexture}
						depthTest={false}
						depthWrite={true}
						polygonOffset={true}
					/>
				)}
			</mesh>
		</group>
	);
};

export default Mesh;
