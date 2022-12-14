import React, { useMemo, useRef } from 'react'

import { useFrame } from '@react-three/fiber';

import vertexShader from './shaders/vertexShader';
import fragmentShader from './shaders/fragmentShader';
import { Color, DoubleSide } from 'three';

function MovingPlane() {

    const mesh = useRef<Mesh>();

    const uniforms = useMemo(
        () => ({
          u_time: {
            value: 0.0,
          },
          u_colorA: { value: new Color("#FFE486") },
          u_colorB: { value: new Color("#FEB3D9") },
        }), []
      );

      useFrame((state) => {
        const { clock } = state;
        mesh.current.material.uniforms.u_time.value = clock.getElapsedTime();
      });

    return (
      <mesh ref={mesh} position={[0, 0, 0]} scale={6.0}>
        <planeGeometry args={[1, 1, 32, 32]} />
        <shaderMaterial
          fragmentShader={fragmentShader}
          vertexShader={vertexShader}
          uniforms={uniforms}
          wireframe={false}
          side={DoubleSide}
        />
      </mesh>
    );
}

export default MovingPlane