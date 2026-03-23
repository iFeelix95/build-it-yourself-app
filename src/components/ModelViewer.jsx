import { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { Center, OrbitControls, useGLTF } from '@react-three/drei'

function LoadedModel({ modelPath }) {
  const { scene } = useGLTF(modelPath)

  return <primitive object={scene.clone()} scale={1} />
}

function LoadingFallback() {
  return (
    <mesh>
      <boxGeometry args={[1.1, 1.1, 1.1]} />
      <meshStandardMaterial color="#d7c5af" roughness={0.55} metalness={0.04} />
    </mesh>
  )
}

export default function ModelViewer({ modelPath = '/models/wand_w4.glb' }) {
  return (
    <section className="model-viewer-card" aria-label="3D-Testvorschau">
      <div
        className="model-viewer-canvas"
        onClick={(event) => event.stopPropagation()}
        onPointerDown={(event) => event.stopPropagation()}
      >
        <Canvas camera={{ position: [4.8, 2.6, 6.4], fov: 34 }}>
          <color attach="background" args={['#f6f2eb']} />
          <ambientLight intensity={0.72} />
          <directionalLight position={[6, 7, 5]} intensity={1.15} />
          <directionalLight position={[-3, 2.5, -4]} intensity={0.35} />
          <Suspense fallback={<LoadingFallback />}>
            <Center top>
              <LoadedModel modelPath={modelPath} />
            </Center>
          </Suspense>
          <OrbitControls
            enablePan={false}
            enableDamping
            dampingFactor={0.08}
            rotateSpeed={0.55}
            zoomSpeed={0.75}
            target={[0, 1.1, 0]}
            minDistance={4.8}
            maxDistance={8.5}
            minPolarAngle={0.95}
            maxPolarAngle={1.65}
          />
        </Canvas>
      </div>
    </section>
  )
}

useGLTF.preload('/models/wand_w4.glb')
