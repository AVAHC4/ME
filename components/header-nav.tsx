import { ThemeToggle } from './theme-toggle'

export default function HeaderNav() {
  return (
    <header className="mt-2 flex items-center justify-between">
      <nav aria-label="Primary">
        <ul className="flex items-center gap-4 text-sm">
          <li>
            <a href="/" className="hover:underline">
              home
            </a>
          </li>
          <li>
            <a
              href="https://github.com/AVAHC4?tab=repositories"
              target="_blank"
              rel="noreferrer"
              className="hover:underline"
            >
              projects
            </a>
          </li>
          <li>
            <a href="/ship-log" className="hover:underline">
              ship log
            </a>
          </li>
          <li>
            <a href="/brain" className="hover:underline">
              brain
            </a>
          </li>
        </ul>
      </nav>
      <div className="fixed top-6 right-6 md:right-12 z-50">
        <ThemeToggle />
      </div>
    </header>
  )
}
