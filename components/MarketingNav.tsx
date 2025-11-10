"use client"

import Link from "next/link"
import { motion } from "framer-motion"

import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/ui/theme-toggle"
import { Logo } from "@/components/ui/logo"

const navLinks = [
  { href: "#features", label: "Features for Designers" },
  { href: "#workflow", label: "Workflow" },
  { href: "#pricing", label: "Pricing" },
  { href: "#resources", label: "Resources" },
]

export function MarketingNav() {
  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="sticky top-0 z-50"
    >
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between rounded-full border border-border/40 bg-white/80 px-6 py-4 shadow-sm backdrop-blur dark:border-white/10 dark:bg-black/40">
        <Logo href="/" />
        <nav className="hidden items-center gap-6 text-sm font-medium text-muted-foreground md:flex">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href} className="transition hover:text-foreground">
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <ThemeToggle />
          <Link href="/dashboard" className="hidden text-sm font-medium text-muted-foreground transition hover:text-foreground md:inline">
            Sign in
          </Link>
          <Button
            size="sm"
            className="rounded-full bg-[#FF5A5F] px-5 text-white shadow-[0_12px_30px_-12px_rgba(255,90,95,0.6)] hover:bg-[#ff6f73]"
            asChild
          >
            <Link href="/dashboard">Start free</Link>
          </Button>
        </div>
      </div>
    </motion.header>
  )
}

