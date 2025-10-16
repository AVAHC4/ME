import type { Metadata } from 'next'
// Using system UI fonts, no external font imports required
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

// removed Geist font loading in favor of system UI fonts

export const metadata: Metadata = {
  title: 'v0 App',
  description: 'Created with v0',
  generator: 'v0.app',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`font-sans antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
