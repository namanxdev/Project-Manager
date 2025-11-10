"use client"

import Link from "next/link"
import { BadgeCheck, Crown, Palette } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { FancyParallax, FancyReveal } from "fancycomponents"

const plans = [
  {
    name: "Freelance Atelier",
    tagline: "Solo designer, boutique-grade polish.",
    price: "$24",
    cadence: "/month",
    icon: Palette,
    features: [
      "Unlimited creative projects",
      "Version timeline + asset vault",
      "Client review portal with annotations",
      "Automatic presentation exports",
    ],
    cta: "Start for free",
    highlight: false,
  },
  {
    name: "Studio",
    tagline: "Small teams orchestrating multi-track work.",
    price: "$68",
    cadence: "/seat / month",
    icon: Crown,
    features: [
      "Visual workflow & timeline",
      "Multi-brand asset libraries",
      "Advanced approvals & compare diff",
      "Figma, Sketch, Adobe CC integrations",
    ],
    cta: "Book a design tour",
    highlight: true,
  },
  {
    name: "Agency",
    tagline: "Global creative teams scaling production.",
    price: "Let’s tailor",
    cadence: "",
    icon: BadgeCheck,
    features: [
      "Dedicated creative success partner",
      "Enterprise-grade permissions",
      "Client workspace mirroring",
      "Analytics for creative ops",
    ],
    cta: "Talk to us",
    highlight: false,
  },
]

export function PricingSection() {
  return (
    <section id="pricing" className="relative py-24">
      <div className="absolute inset-x-0 top-0 -z-10 h-72 bg-gradient-to-b from-[#2B2D42]/5 to-transparent dark:from-white/5" />
      <div className="mx-auto w-full max-w-6xl px-4">
        <FancyReveal className="mx-auto max-w-3xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.32em] text-[#FF5A5F]">Pricing</p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-[#2B2D42] md:text-4xl dark:text-white">
            Pick the cadence that fits your practice
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Start free. Explore the tooling. When you’re ready to bring more of the team, scale effortlessly.
          </p>
        </FancyReveal>

        <div className="mt-12 grid gap-8 md:grid-cols-3">
          {plans.map((plan) => (
            <FancyParallax key={plan.name} offset={22}>
              <Card
                className={`relative h-full overflow-hidden rounded-3xl border border-border/40 bg-white/80 shadow-lg backdrop-blur dark:border-white/10 dark:bg-white/5 ${
                  plan.highlight
                    ? "border-[#FF5A5F]/50 shadow-[0_35px_90px_-45px_rgba(255,90,95,0.65)] dark:border-[#FF5A5F]/60"
                    : ""
                }`}
              >
                {plan.highlight ? (
                  <span className="absolute right-5 top-5 rounded-full bg-[#FF5A5F]/10 px-3 py-1 text-xs font-semibold text-[#FF5A5F]">
                    Most loved
                  </span>
                ) : null}
                <CardHeader className="space-y-4">
                  <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-[#FF5A5F]/15 to-[#FF8A7A]/5 text-[#FF5A5F]">
                    <plan.icon className="h-5 w-5" />
                  </span>
                  <div>
                    <CardTitle className="text-2xl font-semibold text-[#2B2D42] dark:text-white">{plan.name}</CardTitle>
                    <p className="mt-2 text-sm text-muted-foreground">{plan.tagline}</p>
                  </div>
                  <div className="mt-4 flex items-baseline gap-2">
                    <span className="text-3xl font-semibold text-[#2B2D42] dark:text-white">{plan.price}</span>
                    <span className="text-xs uppercase tracking-[0.24em] text-muted-foreground">{plan.cadence}</span>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <ul className="space-y-3 text-sm text-muted-foreground">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-3">
                        <span className="h-2 w-2 rounded-full bg-[#FF5A5F]" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter className="mt-auto">
                  <Button
                    variant={plan.highlight ? "default" : "outline"}
                    className={`w-full rounded-full ${
                      plan.highlight
                        ? "bg-[#FF5A5F] text-white shadow-[0_20px_60px_-35px_rgba(255,90,95,0.85)] hover:bg-[#ff6f73]"
                        : "border-border/60 bg-white/80 text-[#2B2D42] hover:border-[#FF5A5F]/40 hover:bg-[#FF5A5F]/10 dark:bg-white/5 dark:text-white"
                    }`}
                    asChild
                  >
                    <Link href="/dashboard">{plan.cta}</Link>
                  </Button>
                </CardFooter>
              </Card>
            </FancyParallax>
          ))}
        </div>
      </div>
    </section>
  )
}

