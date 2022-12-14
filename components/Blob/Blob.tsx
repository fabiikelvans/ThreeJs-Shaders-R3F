import { useFrame } from '@react-three/fiber';
import { button, folder, useControls } from 'leva';
import React, { useMemo, useRef } from 'react'
import { MathUtils } from 'three';
import fragmentShader from './shaders/fragmentShader';
import vertexShader from './shaders/vertexShader';


function Blob() {
  // This reference will give us direct access to the mesh
  const mesh = useRef();
  const hover = useRef(false);

  // Debug
  const [{ scale, wireframe }, set] = useControls("Blob", 
  () => ({
    transform: folder({
      scale : { 
        value: 1.5, 
        min: 0.4, 
        max:3, step: 
        0.2,}
    }),
    material:  folder({
      wireframe: false,
    }),
    
    reset: button(() => {
      set({
        scale: 1.5,
        wireframe: false,
      })
    })
  })
);

  const uniforms = useMemo(
    () => ({
      u_intensity: {
        value: 0.3,
      },
      u_time: {
        value: 0.0,
      },
    }),
    []
  );

  useFrame((state) => {
    const { clock } = state;
    mesh.current.material.uniforms.u_time.value = 0.4 * clock.getElapsedTime();

    mesh.current.material.uniforms.u_intensity.value = MathUtils.lerp(
      mesh.current.material.uniforms.u_intensity.value,
      hover.current ? 0.85 : 0.15,
      0.02
    );
  });

  return (
    <mesh
      ref={mesh}
      position={[0, 0, 0]}
      scale={scale}
      onPointerOver={() => (hover.current = true)}
      onPointerOut={() => (hover.current = false)}
    >
      <icosahedronGeometry args={[2, 20]} />
      <shaderMaterial
        fragmentShader={fragmentShader}
        vertexShader={vertexShader}
        uniforms={uniforms}
        wireframe={wireframe}
      />
    </mesh>
  );
}

export default Blob