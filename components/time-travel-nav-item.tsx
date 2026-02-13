'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTimeTravel, type Era } from './time-travel-provider'

const ERAS: { value: Era; label: string }[] = [
    { value: '1999', label: '1999' },
    { value: '2010', label: '2010' },
    { value: '2026', label: '2026' },
]

export function TimeTravelNavItem() {
    const { era, setEra } = useTimeTravel()
    const [isOpen, setIsOpen] = useState(false)

    return (
        <div className="relative flex items-center">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="hover:underline cursor-pointer"
                aria-expanded={isOpen}
            >
                time travel
            </button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, width: 0, marginLeft: 0 }}
                        animate={{ opacity: 1, width: 'auto', marginLeft: 12 }}
                        exit={{ opacity: 0, width: 0, marginLeft: 0 }}
                        transition={{ duration: 0.2, ease: 'easeInOut' }}
                        className="flex items-center gap-2 overflow-hidden whitespace-nowrap"
                    >
                        {ERAS.map((e) => (
                            <button
                                key={e.value}
                                onClick={() => setEra(e.value)}
                                className={`
                   text-xs px-2 py-1 rounded-sm border transition-colors
                   ${era === e.value
                                        ? 'bg-foreground text-background border-foreground font-bold'
                                        : 'bg-background text-foreground border-border hover:opacity-70'
                                    }
                `}
                                title={`Switch to ${e.label}`}
                            >
                                {e.label}
                            </button>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}
