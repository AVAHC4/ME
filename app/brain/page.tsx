import BrainGraph from "@/components/brain/graph";
import HeaderNav from "@/components/header-nav";

export default function BrainPage() {
    return (
        <main className="max-w-prose px-6 py-8 md:py-12 ml-2 md:ml-8">
            <HeaderNav />

            <div className="mt-6 flex flex-col space-y-4">
                <h1 className="text-2xl font-bold tracking-tight">brain dump</h1>
                <p className="text-muted-foreground text-sm">
                    a visualization of my projects, skills, and how they connect.
                </p>
            </div>

            <div className="mt-8">
                <BrainGraph />
            </div>
        </main>
    );
}
