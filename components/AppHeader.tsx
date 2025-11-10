'use client'

import Link from "next/link"
import { usePathname } from "next/navigation"
import { LayoutDashboard, Users } from "lucide-react"

import { cn } from "@/lib/utils"
import { ThemeToggle } from "@/components/ui/theme-toggle"

const routes = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/team", label: "Team", icon: Users },
]

export function AppHeader() {
  const pathname = usePathname()

  return (
    <header className="sticky top-0 z-40 border-b bg-background/80 backdrop-blur supports-backdrop-filter:bg-background/60">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
        <Link href="/" className="text-lg font-semibold tracking-tight">
          FormaFlow Workspace
        </Link>
        <div className="flex items-center gap-3">
          <nav className="flex items-center gap-2 text-sm">
            {routes.map((route) => {
              const isActive =
                route.href === "/dashboard"
                  ? pathname === "/dashboard" || pathname.startsWith("/project")
                  : pathname.startsWith(route.href)
              const Icon = route.icon
              return (
                <Link
                  key={route.href}
                  href={route.href}
                  className={cn(
                    "flex items-center gap-2 rounded-full px-4 py-2 transition hover:bg-muted",
                    isActive ? "bg-muted text-foreground" : "text-muted-foreground"
                  )}
                >
                  <Icon className="h-4 w-4" />
                  {route.label}
                </Link>
              )
            })}
          </nav>
          <ThemeToggle />
        </div>
      </div>
    </header>
  )
}

