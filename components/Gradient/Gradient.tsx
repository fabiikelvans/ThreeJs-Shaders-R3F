import { useFrame } from '@react-three/fiber';
import React, { useCallback, useEffect, useMemo, useRef } from 'react'
import { Color, Vector2 } from 'three';
import fragmentShader from './shaders/fragmentShader';
import vertexShader from './shaders/vertexShader';

function Gradient() {
   // This reference will give us direct access to the mesh
   const mesh = useRef();
   const mousePosition = useRef({ x: 0, y: 0 });
 
   const updateMousePosition = useCallback((e) => {
     mousePosition.current = { x: e.pageX, y: e.pageY };
   }, []);
 
   const uniforms = useMemo(
     () => ({
       u_time: {
         value: 0.0,
       },
       u_mouse: { value: new Vector2(0, 0) },
       u_bg: {
         value: new Color("#f7a1a1"),
       },
       u_colorA: { value: new Color("#f9eb9f") },
       u_colorB: { value: new Color("#FEB3D9") },
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
 
     mesh.current.material.uniforms.u_time.value = clock.getElapsedTime();
     mesh.current.material.uniforms.u_mouse.value = new Vector2(
       mousePosition.current.x,
       mousePosition.current.y
     );
   });
 
   return (
     <mesh ref={mesh} position={[0, 0, 0]} scale={8}> 
     {/* Scale 1.5 default */}
       <planeGeometry args={[1, 1, 32, 32]} />
       <shaderMaterial
         fragmentShader={fragmentShader}
         vertexShader={vertexShader}
         uniforms={uniforms}
         wireframe={false}
       />
     </mesh>
   );
}

export default Gradient