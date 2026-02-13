'use client'

import React, { useEffect, useState } from 'react'
import { useTimeTravel, type Era } from './time-travel-provider'

const ERAS: { value: Era; label: string; tagline: string }[] = [
    { value: '1999', label: '1999', tagline: 'GeoCities vibes' },
    { value: '2010', label: '2010', tagline: 'Web 2.0 era' },
    { value: '2026', label: '2026', tagline: 'present day' },
]

export function TimeTravelSlider() {
    const { era, setEra } = useTimeTravel()
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
    }, [])

    if (!mounted) return null

    const currentIndex = ERAS.findIndex((e) => e.value === era)

    const handleClick = (newEra: Era) => {
        setEra(newEra)
    }

    return (
        <div
            className="time-travel-panel"
            style={{
                position: 'fixed',
                bottom: '24px',
                right: '24px',
                zIndex: 9998,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '8px',
                padding: '14px 18px',
                borderRadius: '14px',
                background: 'rgba(0,0,0,0.65)',
                backdropFilter: 'blur(16px)',
                WebkitBackdropFilter: 'blur(16px)',
                border: '1px solid rgba(255,255,255,0.12)',
                boxShadow: '0 8px 32px rgba(0,0,0,0.3)',
                fontFamily:
                    'ui-monospace, SFMono-Regular, Menlo, Monaco, "Roboto Mono", monospace',
                color: '#fff',
                userSelect: 'none',
            }}
        >
            {/* Header */}
            <div
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    fontSize: '11px',
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                    opacity: 0.6,
                    fontWeight: 500,
                }}
            >
                <span style={{ fontSize: '13px' }}>⏳</span>
                <span>time travel</span>
            </div>

            {/* Era Buttons */}
            <div
                style={{
                    display: 'flex',
                    gap: '4px',
                    background: 'rgba(255,255,255,0.08)',
                    borderRadius: '8px',
                    padding: '3px',
                }}
            >
                {ERAS.map((e, i) => {
                    const isActive = i === currentIndex
                    return (
                        <button
                            key={e.value}
                            onClick={() => handleClick(e.value)}
                            style={{
                                padding: '6px 14px',
                                borderRadius: '6px',
                                border: 'none',
                                cursor: 'pointer',
                                fontSize: '13px',
                                fontWeight: isActive ? 700 : 400,
                                fontFamily: 'inherit',
                                color: isActive ? '#000' : 'rgba(255,255,255,0.6)',
                                background: isActive ? '#fff' : 'transparent',
                                transition: 'all 200ms ease',
                                lineHeight: '1.2',
                            }}
                        >
                            {e.label}
                        </button>
                    )
                })}
            </div>

            {/* Tagline */}
            <div
                style={{
                    fontSize: '11px',
                    opacity: 0.5,
                    fontStyle: 'italic',
                    transition: 'all 300ms ease',
                }}
            >
                {ERAS[currentIndex]?.tagline}
            </div>
        </div>
    )
}
