"use client"

import { Layers, MessageCircleHeart, Workflow } from "lucide-react"

import { FancyGlowCard, FancyReveal } from "fancycomponents"

const features = [
  {
    title: "Creative asset & version management",
    description:
      "Beautifully track every exploration, mock, and final delivery with auto-versioning designed for layered files.",
    icon: Layers,
    accent: "bg-gradient-to-br from-[#FF5A5F]/15 to-[#FF8A7A]/10 text-[#FF5A5F]",
  },
  {
    title: "Real-time feedback & approvals",
    description:
      "Invite stakeholders into contextual annotations with live replay and visual diffing to sign off quickly.",
    icon: MessageCircleHeart,
    accent: "bg-gradient-to-br from-[#6C63FF]/15 to-[#B195FF]/10 text-[#6C63FF]",
  },
  {
    title: "Visual workflow & timeline",
    description:
      "A timeline that maps to design rituals — crits, reviews, QA — not generic task lists.",
    icon: Workflow,
    accent: "bg-gradient-to-br from-[#2BB0ED]/15 to-[#9DE0FF]/10 text-[#2BB0ED]",
  },
]

export function WhyDesignersLoveSection() {
  return (
    <section id="features" className="relative py-24">
      <div className="absolute inset-x-0 -top-12 -z-10 h-64 bg-gradient-to-b from-transparent via-[#FF5A5F]/5 to-transparent dark:via-[#FF5A5F]/10" />
      <div className="mx-auto w-full max-w-6xl px-4">
        <FancyReveal className="mx-auto max-w-3xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.32em] text-[#FF5A5F]">Why designers love it</p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-[#2B2D42] md:text-4xl md:leading-snug dark:text-white">
            FormaFlow keeps the craft front and center.
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            We studied leading studios to build tooling that mirrors how they ideate and ship. No bloated columns. Just creative flow.
          </p>
        </FancyReveal>

        <div className="mt-12 grid gap-8 md:grid-cols-3">
          {features.map((feature) => (
            <FancyGlowCard key={feature.title} className="group">
              <div className={`flex h-12 w-12 items-center justify-center rounded-2xl ${feature.accent}`}>
                <feature.icon className="h-5 w-5" />
              </div>
              <h3 className="mt-6 text-lg font-semibold text-[#2B2D42] dark:text-white">{feature.title}</h3>
              <p className="mt-3 text-sm text-muted-foreground">{feature.description}</p>
              <button className="mt-4 inline-flex items-center gap-2 text-xs font-medium text-[#2B2D42] transition hover:text-[#FF5A5F] dark:text-white dark:hover:text-[#FF5A5F]">
                See how it works →
              </button>
            </FancyGlowCard>
          ))}
        </div>
      </div>
    </section>
  )
}

