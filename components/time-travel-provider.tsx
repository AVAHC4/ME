'use client'

import React, { createContext, useContext, useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export type Era = '1999' | '2010' | '2026'

interface TimeTravelContextType {
    era: Era
    setEra: (era: Era) => void
}

const TimeTravelContext = createContext<TimeTravelContextType>({
    era: '2026',
    setEra: () => { },
})

export function useTimeTravel() {
    return useContext(TimeTravelContext)
}

export function TimeTravelProvider({ children }: { children: React.ReactNode }) {
    const [era, setEraState] = useState<Era>(() => {
        if (typeof window !== 'undefined') {
            const stored = localStorage.getItem('time-travel-era') as Era | null
            if (stored && ['1999', '2010', '2026'].includes(stored)) {
                return stored
            }
        }
        return '2026'
    })
    const [mounted, setMounted] = useState(false)
    const [transitioningTo, setTransitioningTo] = useState<Era | null>(null)
    const [isTransitioning, setIsTransitioning] = useState(false)

    useEffect(() => {
        setMounted(true)
    }, [])

    useEffect(() => {
        if (!mounted) return
        const root = document.documentElement
        if (era === '2026') {
            root.removeAttribute('data-era')
        } else {
            root.setAttribute('data-era', era)
        }
        localStorage.setItem('time-travel-era', era)
    }, [era, mounted])

    const setEra = (newEra: Era) => {
        if (newEra === era || isTransitioning) return
        setIsTransitioning(true)
        setTransitioningTo(newEra)
        
        // Wait for overlay to fade in
        setTimeout(() => {
            setEraState(newEra)
            
            // Keep overlay for a moment before fading out
            setTimeout(() => {
                setTransitioningTo(null)
                
                // Allow new transitions after fade out
                setTimeout(() => {
                    setIsTransitioning(false)
                }, 800)
            }, 800)
        }, 800)
    }

    return (
        <TimeTravelContext.Provider value={{ era, setEra }}>
            {children}
            <AnimatePresence>
                {transitioningTo && (
                    <motion.div
                        initial={{ opacity: 0, backdropFilter: 'blur(0px)' }}
                        animate={{ opacity: 1, backdropFilter: 'blur(20px)' }}
                        exit={{ opacity: 0, backdropFilter: 'blur(0px)' }}
                        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                        className="fixed inset-0 z-[99999] flex flex-col items-center justify-center bg-black/90 text-white"
                    >
                        <motion.div
                            initial={{ scale: 0.2, opacity: 0, filter: 'blur(20px)' }}
                            animate={{ scale: 1, opacity: 1, filter: 'blur(0px)' }}
                            exit={{ scale: 2, opacity: 0, filter: 'blur(10px)' }}
                            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
                            className="text-8xl md:text-[12rem] font-black tracking-tighter tabular-nums"
                            style={{ textShadow: '0 0 40px rgba(255,255,255,0.3)' }}
                        >
                            {transitioningTo}
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.5, delay: 0.4 }}
                            className="absolute bottom-24 text-sm md:text-base tracking-[0.5em] uppercase text-white/50"
                        >
                            Time Jump Initiated
                        </motion.div>
                        
                        {/* Decorative scanning lines */}
                        <motion.div
                            initial={{ top: '-10%' }}
                            animate={{ top: '110%' }}
                            transition={{ duration: 1.5, ease: 'linear', repeat: Infinity }}
                            className="absolute left-0 right-0 h-[2px] bg-white/10 z-10"
                            style={{ boxShadow: '0 0 20px rgba(255,255,255,0.5)' }}
                        />
                    </motion.div>
                )}
            </AnimatePresence>
        </TimeTravelContext.Provider>
    )
}
