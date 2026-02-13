import type { Metadata } from 'next'
// Using system UI fonts, no external font imports required
import { Analytics } from '@vercel/analytics/next'
import { ThemeProvider } from '@/components/theme-provider'
import { TerminalOverlay } from '@/components/terminal-overlay'
import { Toaster } from '@/components/ui/sonner'
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
    <html lang="en" suppressHydrationWarning>
      <body className={`font-sans antialiased`} suppressHydrationWarning>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <TerminalOverlay />
          <Toaster />
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  )
}
