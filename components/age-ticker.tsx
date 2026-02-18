"use client"

import { useEffect, useMemo, useState } from "react"

type Props = {
  startISO: string
  decimals?: number
}

export default function AgeTicker({ startISO, decimals = 10 }: Props) {
  const start = useMemo(() => new Date(startISO).getTime(), [startISO])
  const [now, setNow] = useState<number | null>(null)

  useEffect(() => {
    setNow(Date.now())
    const id = setInterval(() => setNow(Date.now()), 100)
    return () => clearInterval(id)
  }, [])

  const years = useMemo(() => {
    if (now === null) return 0
    const ms = now - start
    const years = ms / (1000 * 60 * 60 * 24 * 365.2425)
    return years
  }, [now, start])

  return <span suppressHydrationWarning style={{ color: 'oklch(59.6% .145 163.225)' }}>{years.toFixed(decimals)}</span>
}
