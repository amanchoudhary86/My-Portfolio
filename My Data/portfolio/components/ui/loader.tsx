"use client"

import { useState, useEffect, useRef, useMemo } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Canvas, useFrame } from "@react-three/fiber"
import { Points, PointMaterial, Torus } from "@react-three/drei"
import * as THREE from "three"
import { MatrixRain } from "./matrix-rain"

function ParticleSphere() {
    const ref = useRef<THREE.Points>(null!)

    const sphere = useMemo(() => {
        const temp = new Float32Array(3000 * 3)
        for (let i = 0; i < 3000; i++) {
            const theta = THREE.MathUtils.randFloatSpread(360)
            const phi = THREE.MathUtils.randFloatSpread(360)
            const r = 1.2 + Math.random() * 0.2

            const x = r * Math.sin(theta) * Math.cos(phi)
            const y = r * Math.sin(theta) * Math.sin(phi)
            const z = r * Math.cos(theta)

            temp[i * 3] = x
            temp[i * 3 + 1] = y
            temp[i * 3 + 2] = z
        }
        return temp
    }, [])

    useFrame((state) => {
        const time = state.clock.getElapsedTime()
        ref.current.rotation.y = time * 0.1
        // Pulsating effect
        const scale = 1 + Math.sin(time * 2) * 0.05
        ref.current.scale.set(scale, scale, scale)
    })

    return (
        <group rotation={[0, 0, Math.PI / 4]}>
            <Points ref={ref} positions={sphere} stride={3} frustumCulled={false}>
                <PointMaterial
                    transparent
                    color="#39ff14"
                    size={0.02}
                    sizeAttenuation={true}
                    depthWrite={false}
                    blending={THREE.AdditiveBlending}
                />
            </Points>
        </group>
    )
}

function GyroRings() {
    const ring1 = useRef<THREE.Mesh>(null!)
    const ring2 = useRef<THREE.Mesh>(null!)
    const ring3 = useRef<THREE.Mesh>(null!)

    useFrame((state) => {
        const time = state.clock.getElapsedTime()

        ring1.current.rotation.x = time * 0.5
        ring1.current.rotation.y = time * 0.2

        ring2.current.rotation.x = time * 0.3
        ring2.current.rotation.z = time * 0.4

        ring3.current.rotation.y = time * 0.6
        ring3.current.rotation.z = time * 0.2
    })

    return (
        <group>
            <Torus ref={ring1} args={[1.8, 0.02, 16, 100]}>
                <meshBasicMaterial color="#39ff14" wireframe transparent opacity={0.3} />
            </Torus>
            <Torus ref={ring2} args={[2.1, 0.02, 16, 100]}>
                <meshBasicMaterial color="#39ff14" wireframe transparent opacity={0.2} />
            </Torus>
            <Torus ref={ring3} args={[2.4, 0.02, 16, 100]}>
                <meshBasicMaterial color="#39ff14" wireframe transparent opacity={0.1} />
            </Torus>
        </group>
    )
}

export function Loader() {
    const [isLoading, setIsLoading] = useState(true)
    const [progress, setProgress] = useState(0)
    const [statusText, setStatusText] = useState("INITIALIZING KERNEL")

    useEffect(() => {
        const duration = 3500 // 3.5 seconds total load time
        const interval = 35 // Update every 35ms
        const steps = duration / interval
        let currentStep = 0

        const timer = setInterval(() => {
            currentStep++
            const newProgress = Math.min((currentStep / steps) * 100, 100)
            setProgress(newProgress)

            // Update status text based on progress
            if (newProgress < 30) setStatusText("INITIALIZING SEQUENCE")
            else if (newProgress < 60) setStatusText("LOADING ASSETS")
            else if (newProgress < 90) setStatusText("CONFIGURING VIEWPORT")
            else setStatusText("SYSTEM ONLINE")

            if (currentStep >= steps) {
                clearInterval(timer)
                setTimeout(() => setIsLoading(false), 500)
            }
        }, interval)

        return () => clearInterval(timer)
    }, [])

    return (
        <AnimatePresence>
            {isLoading && (
                <motion.div
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }}
                    transition={{ duration: 0.8, ease: "easeInOut" }}
                    className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-black overflow-hidden"
                >
                    {/* Background Matrix Rain (Dimmed) */}
                    <div className="absolute inset-0 opacity-20">
                        <MatrixRain />
                    </div>

                    {/* 3D Scene */}
                    <div className="w-[500px] h-[500px] relative z-10">
                        <Canvas camera={{ position: [0, 0, 6] }}>
                            <ParticleSphere />
                            <GyroRings />
                        </Canvas>
                    </div>

                    {/* UI Overlay */}
                    <div className="absolute bottom-20 w-full max-w-md px-4 z-20 flex flex-col items-center space-y-4">
                        <motion.div
                            key={statusText}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="font-mono text-[#39ff14] text-lg tracking-[0.2em] font-bold text-center glow-text"
                        >
                            {`> ${statusText}...`}
                        </motion.div>

                        {/* Progress Bar */}
                        <div className="w-full h-1 bg-gray-900 rounded-full overflow-hidden border border-[#39ff14]/30">
                            <motion.div
                                className="h-full bg-[#39ff14] shadow-[0_0_15px_#39ff14]"
                                style={{ width: `${progress}%` }}
                            />
                        </div>

                        <div className="flex justify-between w-full text-[10px] font-mono text-[#39ff14]/50">
                            <span>SYS.V.4.0.2</span>
                            <span>{Math.round(progress)}%</span>
                        </div>
                    </div>

                    {/* Corner Accents */}
                    <div className="absolute top-8 left-8 w-16 h-16 border-t-2 border-l-2 border-[#39ff14]/30" />
                    <div className="absolute top-8 right-8 w-16 h-16 border-t-2 border-r-2 border-[#39ff14]/30" />
                    <div className="absolute bottom-8 left-8 w-16 h-16 border-b-2 border-l-2 border-[#39ff14]/30" />
                    <div className="absolute bottom-8 right-8 w-16 h-16 border-b-2 border-r-2 border-[#39ff14]/30" />
                </motion.div>
            )}
        </AnimatePresence>
    )
}
