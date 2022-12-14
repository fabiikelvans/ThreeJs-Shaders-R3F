import { Canvas, useFrame } from '@react-three/fiber'
import React, { useMemo, useRef } from 'react'
import { DoubleSide, Mesh } from 'three';
import fragmentShader from './shaders/fragmentShader';
import vertexShader from './shaders/vertexShader';
import * as THREE from 'three';



function ImageWave() {

      // This reference will give us direct access to the mesh
      const mesh = useRef<Mesh>();

      const uniforms = useMemo(
          () => ({
            u_time: {
              value: 0.5,
            },
            u_color: {
                value: new THREE.Color(0.1, 0.0, 0.0),
            }
            
          
          }), []
        );
  
    useFrame((state) => {
      const { clock } = state;
      mesh.current.material.uniforms.u_time.value = clock.getElapsedTime();
    });

  return (
        <mesh
        ref={mesh}
        position={[0, 0, 0]}
        scale={2}
        >
            <planeGeometry args={[3, 5, 16, 16]} />

            <shaderMaterial
                fragmentShader={fragmentShader}
                vertexShader={vertexShader}
                 uniforms={uniforms}
                wireframe={false}
                side={DoubleSide}
            />
        </mesh>
  )
}

export default ImageWave