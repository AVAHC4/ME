export default function HeaderNav() {
  return (
    <header className="mt-2">
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
        </ul>
      </nav>
    </header>
  )
}
