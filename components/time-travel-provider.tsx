'use client'

import React, { createContext, useContext, useEffect, useState } from 'react'

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
        setEraState(newEra)
    }

    return (
        <TimeTravelContext.Provider value={{ era, setEra }}>
            {children}
        </TimeTravelContext.Provider>
    )
}
