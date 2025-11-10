"use client"

import Link from "next/link"

import { Logo } from "@/components/ui/logo"
import { FancyReveal } from "fancycomponents"

const footerLinks = [
  {
    title: "Product",
    links: [
      { label: "Features", href: "#features" },
      { label: "Workflow", href: "#workflow" },
      { label: "Pricing", href: "#pricing" },
      { label: "Changelog", href: "#" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Design Ops Guide", href: "#" },
      { label: "Template Library", href: "#" },
      { label: "Case Studies", href: "#" },
      { label: "Support", href: "#" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "#" },
      { label: "Careers", href: "#" },
      { label: "Press", href: "#" },
      { label: "Contact", href: "#" },
    ],
  },
]

export function MarketingFooter() {
  return (
    <footer className="border-t border-border/40 bg-white/60 py-16 text-sm text-muted-foreground dark:border-white/10 dark:bg-black/40">
      <div className="mx-auto w-full max-w-6xl px-4">
        <div className="flex flex-wrap items-start justify-between gap-10">
          <FancyReveal className="w-full max-w-sm">
            <Logo href="/" />
            <p className="mt-4 max-w-sm text-sm text-muted-foreground">
              FormaFlow is the design-centered project platform helping creatives carry momentum from concept to delivery.
            </p>
            <p className="mt-6 text-xs text-muted-foreground">
              © {new Date().getFullYear()} FormaFlow. Crafted for design-led teams.
            </p>
          </FancyReveal>
          {footerLinks.map((column) => (
            <FancyReveal key={column.title} className="min-w-[180px] space-y-4">
              <h3 className="text-sm font-semibold text-[#2B2D42] dark:text-white">{column.title}</h3>
              <ul className="space-y-3">
                {column.links.map((link) => (
                  <li key={link.label}>
                    <Link href={link.href} className="transition hover:text-[#FF5A5F]">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </FancyReveal>
          ))}
        </div>
      </div>
    </footer>
  )
}

