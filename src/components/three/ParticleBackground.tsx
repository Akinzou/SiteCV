import { useRef, useMemo, useEffect } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Points, PointMaterial } from '@react-three/drei'
import * as THREE from 'three'

function ParticleField() {
  const ref = useRef<THREE.Points>(null)
  const mouseRef = useRef({ x: 0, y: 0 })

  // Generate particles
  const particles = useMemo(() => {
    const count = 2000
    const positions = new Float32Array(count * 3)
    const colors = new Float32Array(count * 3)

    for (let i = 0; i < count; i++) {
      // Position
      positions[i * 3] = (Math.random() - 0.5) * 20
      positions[i * 3 + 1] = (Math.random() - 0.5) * 20
      positions[i * 3 + 2] = (Math.random() - 0.5) * 20

      // Color - cyberpunk palette
      const colorChoice = Math.random()
      if (colorChoice < 0.4) {
        // Cyan
        colors[i * 3] = 0
        colors[i * 3 + 1] = 0.94
        colors[i * 3 + 2] = 1
      } else if (colorChoice < 0.7) {
        // Purple
        colors[i * 3] = 0.75
        colors[i * 3 + 1] = 0
        colors[i * 3 + 2] = 1
      } else {
        // Pink
        colors[i * 3] = 1
        colors[i * 3 + 1] = 0
        colors[i * 3 + 2] = 0.63
      }
    }

    return { positions, colors }
  }, [])

  // Mouse tracking
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.x = (e.clientX / window.innerWidth) * 2 - 1
      mouseRef.current.y = -(e.clientY / window.innerHeight) * 2 + 1
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  // Animation
  useFrame((state) => {
    if (!ref.current) return

    // Slow rotation
    ref.current.rotation.x = state.clock.elapsedTime * 0.02
    ref.current.rotation.y = state.clock.elapsedTime * 0.03

    // Mouse parallax effect
    ref.current.rotation.x += mouseRef.current.y * 0.001
    ref.current.rotation.y += mouseRef.current.x * 0.001
  })

  return (
    <Points ref={ref} positions={particles.positions} colors={particles.colors}>
      <PointMaterial
        transparent
        vertexColors
        size={0.03}
        sizeAttenuation={true}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </Points>
  )
}

function GridPlane() {
  const ref = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (!ref.current) return
    ref.current.position.z = -5 + Math.sin(state.clock.elapsedTime * 0.2) * 0.5
  })

  return (
    <mesh ref={ref} rotation={[-Math.PI / 2.5, 0, 0]} position={[0, -3, -5]}>
      <planeGeometry args={[30, 30, 30, 30]} />
      <meshBasicMaterial
        color="#00f0ff"
        wireframe
        transparent
        opacity={0.1}
      />
    </mesh>
  )
}

function FloatingOrbs() {
  const orb1Ref = useRef<THREE.Mesh>(null)
  const orb2Ref = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (orb1Ref.current) {
      orb1Ref.current.position.x = Math.sin(state.clock.elapsedTime * 0.3) * 3
      orb1Ref.current.position.y = Math.cos(state.clock.elapsedTime * 0.4) * 2
    }
    if (orb2Ref.current) {
      orb2Ref.current.position.x = Math.cos(state.clock.elapsedTime * 0.2) * 4
      orb2Ref.current.position.y = Math.sin(state.clock.elapsedTime * 0.3) * 2.5
    }
  })

  return (
    <>
      <mesh ref={orb1Ref} position={[3, 1, -5]}>
        <sphereGeometry args={[0.5, 16, 16]} />
        <meshBasicMaterial color="#00f0ff" transparent opacity={0.1} />
      </mesh>
      <mesh ref={orb2Ref} position={[-3, -1, -4]}>
        <sphereGeometry args={[0.8, 16, 16]} />
        <meshBasicMaterial color="#bf00ff" transparent opacity={0.1} />
      </mesh>
    </>
  )
}

const ParticleBackground = () => {
  return (
    <div className="fixed inset-0 z-0">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 75 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
      >
        <color attach="background" args={['#0a0a0f']} />
        <fog attach="fog" args={['#0a0a0f', 5, 20]} />

        <ambientLight intensity={0.5} />

        <ParticleField />
        <GridPlane />
        <FloatingOrbs />
      </Canvas>
    </div>
  )
}

export default ParticleBackground
