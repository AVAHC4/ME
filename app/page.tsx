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
            "when i was 17, i had an idea to build a social media platform for college students. i wanted it anonymous, so i built "
          }
          <a href="https://thepairup.com" target="_blank" rel="noreferrer">
            thepairup
          </a>
          {"."}
        </p>
        <p>{"ok, i'm not done yet."}</p>
        <p>
          <a href="https://thepairup.com" target="_blank" rel="noreferrer">
            thepairup
          </a>
          {
            " brutally failed. i thought i was the next mark zuckerberg. went all in for 3 months, coding 12–14 hours a day. and i was the only one who signed up."
          }
        </p>
        <p>
          {"back to the present, i'm the founder of "}
          <a href="https://superfast.zone" target="_blank" rel="noreferrer">
            superfast
          </a>
          {", a next.js boilerplate that helps developers go from idea to revenue in just days."}
        </p>
        <p>
          {"check out the "}
          <a href="https://superfast.zone/promo" target="_blank" rel="noreferrer">
            promo
          </a>
          {"."}
        </p>
        <p>
          {
            "superfast gives you everything you need to launch fast. no complex setup, no endless config, just powerful tools that work out of the box. focus on your product while we handle the heavy lifting. "
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
