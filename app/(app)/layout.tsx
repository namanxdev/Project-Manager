import type { Metadata } from "next"
import Link from "next/link"

import { AppHeader } from "@/components/AppHeader"
import { Providers } from "@/app/providers"

export const metadata: Metadata = {
  title: "Workspace · FormaFlow",
}

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <Providers>
      <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-[#F8F9FF] via-white to-[#EEF2FF] text-foreground dark:from-[#0D0F1A] dark:via-[#11131C] dark:to-[#1B1E2B]">
        <div className="pointer-events-none absolute inset-x-0 top-[-18rem] h-[36rem] bg-[#FF5A5F]/10 blur-[160px] dark:bg-[#FF5A5F]/20" />
        <div className="pointer-events-none absolute -right-40 bottom-[-20rem] h-[32rem] w-[32rem] rounded-full bg-[#6C63FF]/10 blur-[180px] dark:bg-[#6C63FF]/25" />

        <div className="relative flex min-h-screen flex-col">
          <AppHeader />
          <main className="flex-1">
            <div className="mx-auto w-full max-w-6xl px-4 pb-16 pt-10">{children}</div>
          </main>
          <footer className="border-t border-border/60 bg-white/70 py-6 shadow-sm backdrop-blur dark:border-white/10 dark:bg-white/5">
            <div className="mx-auto flex w-full max-w-6xl flex-col items-center justify-between gap-3 px-4 text-xs text-muted-foreground sm:flex-row">
              <span>
                © {new Date().getFullYear()} FormaFlow. Crafted for design-led teams — made by namanxdev.
              </span>
              <nav className="flex items-center gap-4">
                <Link href="/dashboard" className="transition hover:text-foreground">
                  Dashboard
                </Link>
                <Link href="/team" className="transition hover:text-foreground">
                  Team
                </Link>
              </nav>
            </div>
          </footer>
        </div>
      </div>
    </Providers>
  )
}

