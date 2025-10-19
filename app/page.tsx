import HeaderNav from "@/components/header-nav"
import AgeTicker from "@/components/age-ticker"

export default function Page() {
  return (
    <main className="max-w-prose px-6 py-8 md:py-12 ml-2 md:ml-8">
      <HeaderNav />

      <h1 className="mt-6 text-pretty text-4xl font-bold tracking-tight md:text-5xl">{"hi i'm Akhil."}</h1>

      <section className="mt-6 space-y-4 text-base leading-7">
        <p>{"i'm just a guy who builds stuff."}</p>
        <p>
          {"been here since "}
          <span className="tabular-nums">
            <AgeTicker startISO="2005-08-31T00:00:00.000Z" decimals={10} />
          </span>
          {" years."}
        </p>
        <p>
          {
            "full-stack developer, indie hacker, and occasional writer. i love turning ideas into real things on the internet."
          }
        </p>
        <p>
          {"you can "}
          <a href="https://x.com/Akhiltwtz" target="_blank" rel="noreferrer">
            find me
          </a>
          {" + my "}
          <a href="https://akhilchava.is-a.dev/" target="_blank" rel="noreferrer">
            portfolio
          </a>
          {"."}
        </p>
      </section>

      <hr className="my-8 border-t border-border" />

      <section className="space-y-4 text-base leading-7">
        <p>
          {
            "when i was 18, i built my first real project — a budget tracker for students. i wanted it to actually help people, so i obsessed over UX, performance, and automation it ended up being used by 100+ active users. "
          }
          <a href="https://thepairup.com" target="_blank" rel="noreferrer">
            thepairup
          </a>
          {"."}
        </p>
        <p>{"ok, i'm not done yet."}</p>
        <p>


          
        </p>
        <p>
            {
            "fast forward to now — i’m the founder of EnggBot "}
          <a href="https://www.enggbot.me/" target="_blank" rel="noreferrer">
            Enggbot
          </a>
          {", an AI-powered assistant for engineering students."}
        </p>
        <p>
          {"check out the "}
          <a href="https://www.enggbot.me/" target="_blank" rel="noreferrer">
            project
          </a>
          {"."}
        </p>
        <p>
          {
            "first users are rolling in, and i finally feel like all those late nights coding 12–14 hours, debugging MongoDB queries, and perfecting UI animations paid off. "
          }
          <a href="https://docs.superfast.zone" target="_blank" rel="noreferrer">
            learn more about superfast
          </a>
          {"."}
        </p>
      </section>

      <figure className="my-8">
        <img
          src="/dodo-payments-receipt-screenshot.jpg"
          alt="Payment receipt screenshot from Dodo Payments showing a congratulatory payment message."
          className="w-full rounded-md border border-border"
        />
        <figcaption className="mt-2 text-sm text-muted-foreground">{"first sale is always special."}</figcaption>
      </figure>

      <section className="space-y-4 text-base leading-7">
        <p className="font-medium">{"2025 is my year."}</p>
        <p>
          {
            "i always wanted to build a product that helps people. solo, no team, because at the same time i want to travel the world. like a nomad. check my "
          }
          <a href="https://www.kalashvasaniya.com/collection" target="_blank" rel="noreferrer">
            bucket list
          </a>
          {"."}
        </p>
        <p>
          {"and i found out about "}
          <a href="https://marclou.com/" target="_blank" rel="noreferrer">
            marc lou
          </a>
          {", the legend."}
        </p>
      </section>
    </main>
  )
}
