'use client'

import React, { useEffect, useState } from 'react'

interface ContributionDay {
    date: string
    count: number
    level: number
}

interface ContributionWeek {
    contributionDays: ContributionDay[]
}

interface ContributionsData {
    totalContributions: number
    weeks: ContributionWeek[]
}

export default function GitHubHeatmap({ username = 'AVAHC4' }: { username?: string }) {
    const [data, setData] = useState<ContributionsData | null>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        async function fetchContributions() {
            try {
                // Using a public contributions API
                const response = await fetch(
                    `https://github-contributions-api.jogruber.de/v4/${username}?y=last`
                )

                if (!response.ok) {
                    throw new Error('Failed to fetch contributions')
                }

                const result = await response.json()

                // Transform the data
                const weeks: ContributionWeek[] = []
                let currentWeek: ContributionDay[] = []

                result.contributions.forEach((day: { date: string; count: number; level: number }, index: number) => {
                    currentWeek.push({
                        date: day.date,
                        count: day.count,
                        level: day.level,
                    })

                    if (currentWeek.length === 7 || index === result.contributions.length - 1) {
                        weeks.push({ contributionDays: currentWeek })
                        currentWeek = []
                    }
                })

                setData({
                    totalContributions: result.total?.lastYear || result.contributions.reduce((sum: number, d: { count: number }) => sum + d.count, 0),
                    weeks,
                })
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Unknown error')
            } finally {
                setLoading(false)
            }
        }

        fetchContributions()
    }, [username])

    const getLevelColor = (level: number) => {
        const colors = [
            'bg-muted',
            'bg-green-300 dark:bg-green-900',
            'bg-green-400 dark:bg-green-700',
            'bg-green-500 dark:bg-green-500',
            'bg-green-600 dark:bg-green-400',
        ]
        return colors[level] || colors[0]
    }

    if (loading) {
        return (
            <section className="space-y-4">
                <h2 className="text-xl font-semibold tracking-tight">contributions</h2>
                <div className="animate-pulse bg-muted rounded-lg h-32" />
            </section>
        )
    }

    if (error) {
        return (
            <section className="space-y-4">
                <h2 className="text-xl font-semibold tracking-tight">contributions</h2>
                <p className="text-sm text-muted-foreground">Could not load GitHub contributions.</p>
            </section>
        )
    }

    return (
        <section className="space-y-4">
            <div className="flex items-baseline justify-between">
                <h2 className="text-xl font-semibold tracking-tight">contributions</h2>
                <a
                    href={`https://github.com/${username}`}
                    target="_blank"
                    rel="noreferrer"
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                    {data?.totalContributions.toLocaleString()} contributions in the last year
                </a>
            </div>

            <div className="overflow-x-auto pb-2">
                <div className="flex gap-[3px] min-w-max">
                    {data?.weeks.slice(-52).map((week, weekIndex) => (
                        <div key={weekIndex} className="flex flex-col gap-[3px]">
                            {week.contributionDays.map((day, dayIndex) => (
                                <div
                                    key={`${weekIndex}-${dayIndex}`}
                                    className={`w-[10px] h-[10px] rounded-sm ${getLevelColor(day.level)} transition-colors`}
                                    title={`${day.count} contributions on ${day.date}`}
                                />
                            ))}
                        </div>
                    ))}
                </div>
            </div>

            <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <span>Less</span>
                <div className="flex gap-[3px]">
                    {[0, 1, 2, 3, 4].map((level) => (
                        <div
                            key={level}
                            className={`w-[10px] h-[10px] rounded-sm ${getLevelColor(level)}`}
                        />
                    ))}
                </div>
                <span>More</span>
            </div>
        </section>
    )
}
