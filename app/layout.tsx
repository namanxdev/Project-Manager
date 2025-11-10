import type { Metadata } from "next"
import Link from "next/link"
import { Geist, Geist_Mono } from "next/font/google"

import "./globals.css"
import { Providers } from "./providers"
import { AppHeader } from "@/components/AppHeader"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "Studio Project Manager",
  description:
    "Minimal workspace for architecture studios to manage projects, tasks, and teams.",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} min-h-screen bg-background font-sans antialiased`}>
        <Providers>
          <div className="flex min-h-screen flex-col bg-muted/20 text-foreground">
            <AppHeader />
            <main className="flex-1">
              <div className="mx-auto w-full max-w-6xl px-4 pb-16 pt-10">{children}</div>
            </main>
            <footer className="border-t bg-background py-6">
              <div className="mx-auto flex w-full max-w-6xl flex-col items-center justify-between gap-3 px-4 text-xs text-muted-foreground sm:flex-row">
                <span>© {new Date().getFullYear()} Studio Project Manager. Ship better projects together.</span>
                <nav className="flex items-center gap-4">
                  <Link href="/" className="transition hover:text-foreground">
                    Projects
                  </Link>
                  <Link href="/team" className="transition hover:text-foreground">
                    Team
                  </Link>
                </nav>
              </div>
            </footer>
          </div>
        </Providers>
      </body>
    </html>
  )
}
