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
            <a href="/projects" className="hover:underline">
              projects
            </a>
          </li>
          <li>
            <a href="/blogs" className="hover:underline">
              blogs
            </a>
          </li>
          <li>
            <a href="/about" className="hover:underline">
              about
            </a>
          </li>
        </ul>
      </nav>
    </header>
  )
}
