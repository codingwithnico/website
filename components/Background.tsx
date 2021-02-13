import * as React from 'react'
import { Canvas } from 'react-three-fiber'
import * as THREE from 'three'
import Stars from './Stars'
import {
  EffectComposer,
  DepthOfField,
  Bloom,
  Vignette,
} from '@react-three/postprocessing'

interface Props {
  bgColor?: string
}

const Background: React.FC<Props> = ({ bgColor }) => {
  return (
    <Canvas
      colorManagement
      // concurrent
      camera={{
        position: [10, -50, 30],
      }}
      style={{
        position: 'absolute',
        top: 0,
        width: '100%',
        height: '60vh',
        zIndex: -2,
      }}
      gl={{
        alpha: false,
        antialias: false,
        stencil: false,
      }}
      onCreated={({ gl }) => {
        gl.toneMapping = THREE.ACESFilmicToneMapping
        gl.setClearColor(new THREE.Color(`${bgColor}`))
      }}
    >
      {/* <React.Suspense fallback={null}> */}
      <Stars />
      <fog attach="fog" args={['#DD5E98', 8, 1]} />
      <directionalLight position={[0, 1, 2]} color="#DD5E98" />
      <EffectComposer>
        <DepthOfField
          focusDistance={0}
          focalLength={2}
          bokehScale={2}
          height={480}
        />
        <Bloom luminanceThreshold={20} luminanceSmoothing={0.9} height={300} />
        <Vignette eskil={false} offset={0.1} darkness={1} />
      </EffectComposer>
      {/* </React.Suspense> */}
    </Canvas>
  )
}

export default Background
