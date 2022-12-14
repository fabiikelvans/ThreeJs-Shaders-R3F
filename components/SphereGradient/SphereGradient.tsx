import { useFrame } from '@react-three/fiber';
import React, { useCallback, useEffect, useMemo, useRef } from 'react'
import { Color, Vector2 } from 'three';
import fragmentShader from './shaders/fragmentShader';
import vertexShader from './shaders/vertexShader';

function SphereGradient() {
   // This reference will give us direct access to the mesh
   const mesh = useRef();
   const mousePosition = useRef({ x: 0, y: 0 });
 
   const updateMousePosition = useCallback((e) => {
     mousePosition.current = { x: e.pageX, y: e.pageY };
   }, []);
 
   const uniforms = useMemo(
     () => ({
       time: {
         value: 0.01,
       },
   
     }),
     []
   );
 
   useEffect(() => {
     window.addEventListener("mousemove", updateMousePosition, false);
 
     return () => {
       window.removeEventListener("mousemove", updateMousePosition, false);
     };
   }, [updateMousePosition]);
 
   useFrame((state) => {
     const { clock } = state;
 
     mesh.current.material.uniforms.time.value = clock.getElapsedTime();
  
   });

 
   return (
     <mesh ref={mesh} position={[0, 0, 0]} scale={6.5} > 
     {/* Scale 1.5 default */}
       <sphereGeometry attach="geometry" args={[1.5, 32, 32]} />
       <shaderMaterial
       attach="material"
       vertexShader={vertexShader}
       fragmentShader={fragmentShader}
       uniforms={uniforms}
       wireframe={true}
       />
     </mesh>
   );
}

export default SphereGradient