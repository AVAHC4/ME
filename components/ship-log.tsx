'use client'

import React from 'react'

interface LogEntry {
    date: string
    title: string
    description: string
    link?: string
}

const shipLog: LogEntry[] = [
    {
        date: 'Feb 2026',
        title: 'Scaling ENGGBOT',
        description: 'Refining the AI assistant and growing user base.',
        link: 'https://www.enggbot.me/',
    },
    {
        date: 'Jan 2026',
        title: 'ENGGBOT Milestone',
        description: 'Over 130 commits — shipping features daily.',
        link: 'https://www.enggbot.me/',
    },
    {
        date: 'Dec 2025',
        title: 'ASL Detector + Cricket ML',
        description: 'Built an American Sign Language recognition system and a cricket prediction model.',
        link: 'https://github.com/AVAHC4/ASL_Detector',
    },
    {
        date: 'Dec 2025',
        title: 'ENGGBOT Peak',
        description: 'Nearly 600 commits in one month. Pure indie hacker mode.',
        link: 'https://www.enggbot.me/',
    },
    {
        date: 'Dec 2024',
        title: 'First Portfolio',
        description: 'Launched my initial portfolio site.',
        link: 'https://akhilchava.is-a.dev/',
    },
    {
        date: 'Oct 2024',
        title: 'ChatMate + Smart Task Planner',
        description: 'Double launch — an AI chat app and a minimal to-do capture tool.',
        link: 'https://github.com/AVAHC4/ChatMate',
    },
    {
        date: 'Mid 2024',
        title: 'NYTimes Replica',
        description: 'Faithful replica of the New York Times with custom weather feature.',
        link: 'https://github.com/AVAHC4/nytimes-replica',
    },
]

export default function ShipLog() {
    return (
        <section className="space-y-6">
            <h2 className="text-xl font-semibold tracking-tight">ship log</h2>
            <div className="relative border-l-2 border-border pl-6 space-y-6">
                {shipLog.map((entry, index) => (
                    <div key={index} className="relative">
                        {/* Timeline dot */}
                        <div className="absolute -left-[31px] top-1.5 h-3 w-3 rounded-full bg-foreground" />

                        <div className="space-y-1">
                            <span className="text-sm text-muted-foreground tabular-nums">
                                {entry.date}
                            </span>
                            <h3 className="font-medium">
                                {entry.link ? (
                                    <a
                                        href={entry.link}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="hover:underline"
                                    >
                                        {entry.title}
                                    </a>
                                ) : (
                                    entry.title
                                )}
                            </h3>
                            <p className="text-sm text-muted-foreground">{entry.description}</p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    )
}
