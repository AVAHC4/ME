"use client"

import { useState, useEffect } from "react"
import HeaderNav from "@/components/header-nav"
import { LinkPreview } from "@/components/ui/link-preview"
import { motion } from "framer-motion"
import { Checkbox } from "@/components/ui/checkbox"
import { cn } from "@/lib/utils"

// --- Components ---

function YearRemaining() {
    const [remaining, setRemaining] = useState<number | null>(null)

    useEffect(() => {
        const calculateRemaining = () => {
            const now = new Date()
            const endOfYear = new Date(now.getFullYear(), 11, 31, 23, 59, 59, 999)
            const startOfYear = new Date(now.getFullYear(), 0, 1, 0, 0, 0, 0)
            const total = endOfYear.getTime() - startOfYear.getTime()
            const current = endOfYear.getTime() - now.getTime()
            return (current / total) * 100
        }

        setRemaining(calculateRemaining())
        const interval = setInterval(() => {
            setRemaining(calculateRemaining())
        }, 50) // Update frequently for the "dynamic" feel

        return () => clearInterval(interval)
    }, [])

    if (remaining === null) return <span className="opacity-0">00.0000000%</span>

    return (
        <span className="font-mono text-green-500 font-bold tabular-nums">
            {remaining.toFixed(7)}%
        </span>
    )
}


function GoalItem({
    label,
    count,
    total,
    percentString,
    children,
    defaultChecked = false
}: {
    label: React.ReactNode,
    count?: number | string,
    total?: number | string,
    percentString?: string,
    children?: React.ReactNode,
    defaultChecked?: boolean
}) {
    return (
        <div className="flex gap-3 items-start group">
            <span className="mt-1">
                <Checkbox disabled checked={defaultChecked} className={cn("data-[state=checked]:bg-green-500 data-[state=checked]:border-green-500 rounded-sm w-4 h-4", defaultChecked && "opacity-50")} />
            </span>
            <div className="flex-1 space-y-1">
                <div className={cn("leading-none", defaultChecked && "line-through decoration-zinc-500 text-zinc-500")}>
                    {label}
                    {(count !== undefined || percentString) && (
                        <span className="text-blue-500 ml-1.5 text-sm">
                            ({percentString ?? `${count}/${total}`})
                        </span>
                    )}
                </div>
                {children && <div className="pl-0 mt-1 space-y-0.5">{children}</div>}
            </div>
        </div>
    )
}

function SubList({ items }: { items: React.ReactNode[] }) {
    return (
        <ol className="list-decimal list-outside ml-4 space-y-0.5 text-sm text-zinc-500 dark:text-zinc-400">
            {items.map((item, i) => (
                <li key={i} className="pl-1 leading-snug">
                    {item}
                </li>
            ))}
        </ol>
    )
}


export default function Page() {
    return (
        <main className="max-w-3xl mx-auto px-6 py-8 md:py-12">
            <HeaderNav />

            <h1 className="mt-8 text-4xl font-bold tracking-tight md:text-5xl">2026 goals.</h1>

            <div className="mt-4 text-zinc-600 dark:text-zinc-400 max-w-prose">
                <p>things i want to accomplish in 2026. goals, dreams, and everything in between.</p>
            </div>

            <div className="mt-8 font-medium">
                <YearRemaining /> remain in 2026.
            </div>

            <div className="mt-6 border rounded-lg p-6 bg-card text-card-foreground shadow-sm">
                <div className="flex justify-between items-end mb-2">
                    <div className="text-sm font-medium">
                        <div className="text-muted-foreground text-xs mb-1">goals completed</div>
                        <div className="text-xl font-bold">1/12</div>
                    </div>
                    <div className="text-right">
                        <div className="text-muted-foreground text-xs mb-1">overall progress</div>
                        <div className="text-xl font-bold text-green-500">27%</div>
                    </div>
                </div>
                <div className="h-2 w-full bg-secondary rounded-full overflow-hidden">
                    <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: "27%" }}
                        transition={{ duration: 1, ease: "easeOut" }}
                        className="h-full bg-green-500 rounded-full"
                    />
                </div>
                <div className="mt-2 text-[10px] text-muted-foreground text-center">
                    27% of all goals on track
                </div>
            </div>

            <div className="mt-12 space-y-6">

                {/* Goal 1 */}
                <GoalItem label="launch at least 5 new products" count={2} total={5}>
                    <SubList items={[
                        <span><LinkPreview url="https://www.seoitis.com/" className="underline decoration-zinc-300 hover:decoration-zinc-500 underline-offset-2">seoitis.com</LinkPreview> <span className="text-green-500 text-xs ml-1">(jan 12, 2026)</span></span>,
                        <span><LinkPreview url="https://trackmysubscriptions.com/" className="underline decoration-zinc-300 hover:decoration-zinc-500 underline-offset-2">trackmysubscriptions.com</LinkPreview> <span className="text-green-500 text-xs ml-1">(feb 1, 2026)</span></span>
                    ]} />
                </GoalItem>

                <GoalItem label="earn at least $100k (passive)" percentString="10175.92/100,000" />

                <GoalItem label="invest at least $10k in stocks, crypto, and other assets" percentString="720.82/10,000">
                    <SubList items={[
                        "sip: motilal oswal flexi cap fund",
                        "sip: parag parekh flexi cap fund",
                        "sip: hdfc small cap fund",
                        "sip: icici prudential nifty 50 index fund",
                        "sip: sbi gold fund",
                        "sip: nippon india silver etf fof"
                    ]} />
                </GoalItem>

                <GoalItem label="travel to 3 new countries" count={1} total={3}>
                    <SubList items={[
                        <span><LinkPreview url="https://en.wikipedia.org/wiki/Malaysia" className="underline decoration-zinc-300 hover:decoration-zinc-500 underline-offset-2">malaysia</LinkPreview> <span className="text-green-500 text-xs ml-1">(mar 1, 2026 - planned)</span></span>
                    ]} />
                </GoalItem>

                <GoalItem label="5 domestic trips (leisure only)" count={1} total={5}>
                    <SubList items={[
                        <span><LinkPreview url="https://www.instagram.com/p/DUswzlHD2J8" className="underline decoration-zinc-300 hover:decoration-zinc-500 underline-offset-2">puducherry</LinkPreview> <span className="text-green-500 text-xs ml-1">(feb 7, 2026)</span></span>
                    ]} />
                </GoalItem>

                <GoalItem label={<span>start a <LinkPreview url="https://instagram.com" className="underline">instagram</LinkPreview> + <LinkPreview url="https://youtube.com" className="underline">youtube</LinkPreview> accounts</span>} defaultChecked>
                    {/* Implied sub-items based on 'start a instagram' being checked */}
                </GoalItem>

                <GoalItem label={<span>have atleast 10 <LinkPreview url="https://www.kalashvasaniya.com/0-to-1" className="underline decoration-zinc-300 hover:decoration-zinc-500">passive</LinkPreview> income streams</span>} count={6} total={10}>
                    <SubList items={[
                        "twitter",
                        "medium",
                        "sponsorships",
                        "affiliate sales",
                        "startups",
                        "investment",
                        "mics"
                    ]} />
                </GoalItem>

                <GoalItem label={<span>atleast 5 <LinkPreview url="https://www.kalashvasaniya.com/bucketlist" className="underline decoration-zinc-300 hover:decoration-zinc-500">bucketlist</LinkPreview> items checked off</span>} count={1} total={5}>
                    <SubList items={[
                        <span><LinkPreview url="https://x.com/kalashbuilds/status/2010607679186829397?s=20" className="underline decoration-zinc-300 hover:decoration-zinc-500 underline-offset-2">launch startup</LinkPreview> <span className="text-green-500 text-xs ml-1">(jan 12, 2026)</span></span>
                    ]} />
                </GoalItem>

                <GoalItem label={<span>launch 2 <LinkPreview url="https://kalashvasaniya.gumroad.com/" className="underline decoration-zinc-300 hover:decoration-zinc-500">digital products</LinkPreview></span>} count={0} total={2} />

                <GoalItem label={<span>start paid <LinkPreview url="https://newsletter.kalashvasaniya.com/" className="underline decoration-zinc-300 hover:decoration-zinc-500">newsletter</LinkPreview></span>} />

                <GoalItem label={<span>read at least 12 <LinkPreview url="https://www.kalashvasaniya.com/collection#books" className="underline decoration-zinc-300 hover:decoration-zinc-500">books</LinkPreview></span>} count={3} total={12}>
                    <SubList items={[
                        <span><LinkPreview url="https://www.goodreads.com/book/show/68984.The_Power_of_Your_Subconscious_Mind" className="underline decoration-zinc-300 hover:decoration-zinc-500 underline-offset-2">the power of your subconscious mind</LinkPreview> <span className="text-green-500 text-xs ml-1">(jan 3, 2026)</span></span>,
                        <span><LinkPreview url="https://www.goodreads.com/book/show/4865-how-to-win-friends-and-influence-people" className="underline decoration-zinc-300 hover:decoration-zinc-500 underline-offset-2">how to win friends and influence people</LinkPreview> <span className="text-green-500 text-xs ml-1">(jan 13, 2026)</span></span>,
                        <span><LinkPreview url="https://www.goodreads.com/book/show/30186948-think-and-grow-rich" className="underline decoration-zinc-300 hover:decoration-zinc-500 underline-offset-2">think and grow rich</LinkPreview> <span className="text-green-500 text-xs ml-1">(jan 19, 2026)</span></span>
                    ]} />
                </GoalItem>

                <GoalItem label="hit gym 4 times a week" percentString="9/200" />

            </div>

            <div className="mt-12 text-zinc-600 dark:text-zinc-400">
                want to know more about my plan for 2026? read the <LinkPreview url="https://www.kalashvasaniya.com/blog/2026-whats-my-plan" className="underline decoration-zinc-300 hover:decoration-zinc-500 text-blue-500">blog post</LinkPreview>.
            </div>

            <div className="mt-8">
                <LinkPreview url="/" className="text-blue-500 hover:underline">← back home</LinkPreview>
            </div>
        </main>
    )
}
