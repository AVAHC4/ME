import HeaderNav from "@/components/header-nav"
import AgeTicker from "@/components/age-ticker"
import { LinkPreview } from "@/components/ui/link-preview"


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
          <LinkPreview url="https://github.com/AVAHC4">
            find me
          </LinkPreview>
          {" + my "}
          <LinkPreview url="https://akhilchava.is-a.dev/">
            portfolio
          </LinkPreview>
          {"."}
        </p>
      </section>

      <hr className="my-8 border-t border-border" />

      <section className="space-y-4 text-base leading-7">
        <p>
          {
            "when i was 19, i built my first real project — a budget tracker for students. i wanted it to actually help people, so i obsessed over UX, performance, and automation it ended up being used by 100+ active users. "
          }
        </p>
        <p>{"ok, i'm not done yet."}</p>
        <p>



        </p>
        <p>
          {
            "fast forward to now — i’m the founder of "}
          <LinkPreview url="https://www.enggbot.me/">
            Enggbot
          </LinkPreview>
          {", an AI-powered assistant for engineering students."}
        </p>
        <p>
          {"check out the "}
          <LinkPreview url="https://www.enggbot.me/">
            project
          </LinkPreview>
          {"."}
        </p>
        <p>
          {
            "first users are rolling in, and i finally feel like all those late nights coding 12–14 hours, debugging MongoDB queries, and perfecting UI animations paid off. "
          }
          {"."}
        </p>
      </section>

      <figure className="my-8">
        <img
          src="/enggbot-screenshot.png"
          alt="ENGGBOT landing page - Your AI Study Assistant for Smarter Learning"
          className="w-full rounded-md border border-border"
        />
      </figure>

      <section className="space-y-4 text-base leading-7">
        <p className="font-medium">{"2026 is my year."}</p>
        <p>
          {
            "i’m building solo, no team — just my laptop, caffeine, and a bucket list that includes shipping from every country i visit "
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
