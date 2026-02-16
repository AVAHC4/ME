"use client"

import HeaderNav from "@/components/header-nav"
import { LinkPreview } from "@/components/ui/link-preview"
import { motion } from "framer-motion"

export default function Page() {
    return (
        <main className="max-w-prose px-6 py-8 md:py-12 ml-2 md:ml-8">
            <HeaderNav />

            <h1 className="mt-6 text-pretty text-4xl font-bold tracking-tight md:text-5xl">2026 goals.</h1>

            <section className="mt-6 space-y-4 text-base leading-7">
                <p>things i want to accomplish in 2026. goals, dreams, and everything in between.</p>

                <div className="mt-8 space-y-2">
                    <div className="flex justify-between text-sm text-muted-foreground w-full max-w-[500px]">
                        <span>2026 is over.</span>
                        <span>27% of all goals on track</span>
                    </div>
                    <div className="h-2 w-full max-w-[500px] bg-secondary rounded-full overflow-hidden">
                        <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: "27%" }}
                            transition={{ duration: 1, ease: "easeOut" }}
                            className="h-full bg-foreground rounded-full"
                        />
                    </div>
                </div>

                <ul className="mt-8 space-y-2 list-none pl-0">
                    <li>
                        <LinkPreview url="https://www.seoitis.com/">seoitis.com</LinkPreview>
                    </li>
                    <li>
                        <LinkPreview url="https://trackmysubscriptions.com/">trackmysubscriptions.com</LinkPreview>
                    </li>
                    <li>
                        <LinkPreview url="https://www.kalashvasaniya.com/0-to-1">passive</LinkPreview>
                    </li>
                    <li>
                        <LinkPreview url="https://en.wikipedia.org/wiki/Malaysia">malaysia</LinkPreview>
                    </li>
                    <li>
                        <LinkPreview url="https://www.instagram.com/p/DUswzlHD2J8">puducherry</LinkPreview>
                    </li>
                    <li>
                        <LinkPreview url="https://www.instagram.com/kalashvasaniya/">instagram</LinkPreview>
                    </li>
                    <li>
                        <LinkPreview url="https://www.youtube.com/@amikalash">youtube</LinkPreview>
                    </li>
                    <li>
                        <LinkPreview url="https://x.com/kalashbuilds">twitter</LinkPreview>
                    </li>
                    <li>
                        <LinkPreview url="https://medium.com/@kalashvasaniya">medium</LinkPreview>
                    </li>
                    <li>
                        <LinkPreview url="https://www.kalashvasaniya.com/portfolio#projects">startups</LinkPreview>
                    </li>
                    <li>
                        <LinkPreview url="https://www.kalashvasaniya.com/bucketlist">bucketlist</LinkPreview>
                    </li>
                    <li>
                        <LinkPreview url="https://x.com/kalashbuilds/status/2010607679186829397?s=20">launch startup</LinkPreview>
                    </li>
                    <li>
                        <LinkPreview url="https://kalashvasaniya.gumroad.com/">digital products</LinkPreview>
                    </li>
                    <li>
                        <LinkPreview url="https://newsletter.kalashvasaniya.com/">newsletter</LinkPreview>
                    </li>
                    <li>
                        <LinkPreview url="https://www.kalashvasaniya.com/collection#books">books</LinkPreview>
                    </li>
                    <li>
                        <LinkPreview url="https://www.goodreads.com/book/show/68984.The_Power_of_Your_Subconscious_Mind">
                            the power of your subconscious mind
                        </LinkPreview>
                    </li>
                    <li>
                        <LinkPreview url="https://www.goodreads.com/book/show/4865-how-to-win-friends-and-influence-people">
                            how to win friends and influence people
                        </LinkPreview>
                    </li>
                    <li>
                        <LinkPreview url="https://www.goodreads.com/book/show/30186948-think-and-grow-rich">
                            think and grow rich
                        </LinkPreview>
                    </li>
                </ul>

                <p className="mt-8">
                    want to know more about my plan for 2026? read the{" "}
                    <LinkPreview url="https://www.kalashvasaniya.com/blog/2026-whats-my-plan">blog post</LinkPreview>.
                </p>

                <div className="mt-8">
                    <LinkPreview url="https://www.kalashvasaniya.com/">← back home</LinkPreview>
                </div>
            </section>
        </main>
    )
}
