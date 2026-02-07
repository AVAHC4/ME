import HeaderNav from "@/components/header-nav"
import ShipLog from "@/components/ship-log"
import GitHubHeatmap from "@/components/github-heatmap"

export default function ShipLogPage() {
    return (
        <main className="max-w-prose px-6 py-8 md:py-12 ml-2 md:ml-8">
            <HeaderNav />

            <h1 className="mt-6 text-pretty text-4xl font-bold tracking-tight md:text-5xl">
                {"ship log"}
            </h1>

            <p className="mt-4 text-muted-foreground">
                {"a timeline of things i've built and shipped."}
            </p>

            <hr className="my-8 border-t border-border" />

            <GitHubHeatmap username="AVAHC4" />

            <hr className="my-8 border-t border-border" />

            <ShipLog />
        </main>
    )
}
