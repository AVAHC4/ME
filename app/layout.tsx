import type { Metadata } from 'next'

import { Analytics } from '@vercel/analytics/next'
import { ThemeProvider } from '@/components/theme-provider'
import { TimeTravelProvider } from '@/components/time-travel-provider'
import './globals.css'



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
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var era = localStorage.getItem('time-travel-era');
                  if (era && (era === '1999' || era === '2010')) {
                    document.documentElement.setAttribute('data-era', era);
                  }
                } catch(e) {}
              })();
            `,
          }}
        />
      </head>
      <body className={`font-sans antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <TimeTravelProvider>
            {children}
          </TimeTravelProvider>
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  )
}

