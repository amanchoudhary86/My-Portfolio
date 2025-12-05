"use client"

import { useRef, useMemo } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { Points, PointMaterial } from "@react-three/drei"
import * as THREE from "three"

function ParticleField() {
    const ref = useRef<THREE.Points>(null!)

    const positions = useMemo(() => {
        const count = 5000
        const positions = new Float32Array(count * 3)
        for (let i = 0; i < count; i++) {
            positions[i * 3] = (Math.random() - 0.5) * 50
            positions[i * 3 + 1] = (Math.random() - 0.5) * 50
            positions[i * 3 + 2] = (Math.random() - 0.5) * 50
        }
        return positions
    }, [])

    useFrame((state, delta) => {
        if (ref.current) {
            ref.current.rotation.x -= delta / 10
            ref.current.rotation.y -= delta / 15
        }
    })

    return (
        <group rotation={[0, 0, Math.PI / 4]}>
            <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
                <PointMaterial
                    transparent
                    color="#39ff14"
                    size={0.05}
                    sizeAttenuation={true}
                    depthWrite={false}
                />
            </Points>
        </group>
    )
}

function DigitalGrid() {
    return (
        <group position={[0, -5, 0]} rotation={[Math.PI / 2.5, 0, 0]}>
            <gridHelper args={[100, 50, 0x39ff14, 0x39ff14]} />
        </group>
    )
}

export function HackerBackground() {
    return (
        <div className="fixed inset-0 z-[-1] opacity-30 pointer-events-none bg-black">
            <Canvas camera={{ position: [0, 0, 10], fov: 60 }}>
                <fog attach="fog" args={['#000000', 5, 30]} />
                <ParticleField />
                <DigitalGrid />
            </Canvas>
        </div>
    )
}
