"use client"

import { FancyGlowCard, FancyReveal } from "fancycomponents"

const testimonials = [
  {
    quote:
      "FormaFlow understands design cadence. Our designers stay in their Figma flow while stakeholders get pixel-specific feedback.",
    name: "Mila Torres",
    title: "Executive Creative Director, Layered",
  },
  {
    quote:
      "Version history saves us on every client review — no more digging through Slack just to find the right exploration.",
    name: "Akshar Desai",
    title: "Design Lead, Parallel Collective",
  },
]

const logos = ["ZipBoard", "Markup.io", "Canvas & Co", "Sightline"]

export function SocialProofSection() {
  return (
    <section id="resources" className="bg-white/70 py-24 dark:bg-white/[0.03]">
      <div className="mx-auto w-full max-w-6xl px-4">
        <FancyReveal className="mx-auto max-w-3xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.32em] text-[#FF5A5F]">Creative teams in flow</p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-[#2B2D42] md:text-4xl dark:text-white">
            Loved by design leads and creative directors
          </h2>
        </FancyReveal>

        <div className="mt-12 grid gap-8 md:grid-cols-2">
          {testimonials.map((testimonial) => (
            <FancyGlowCard key={testimonial.name}>
              <p className="text-lg italic text-[#2B2D42] dark:text-white">“{testimonial.quote}”</p>
              <div className="mt-6 text-sm text-muted-foreground">
                <p className="font-semibold text-[#2B2D42] dark:text-white">{testimonial.name}</p>
                <p>{testimonial.title}</p>
              </div>
            </FancyGlowCard>
          ))}
        </div>

        <div className="mt-16 grid grid-cols-2 items-center gap-8 text-xs text-muted-foreground sm:grid-cols-4 sm:text-sm">
          {logos.map((logo) => (
            <div key={logo} className="flex items-center justify-center rounded-2xl border border-border/40 bg-white/60 p-6 shadow-sm dark:border-white/10 dark:bg-white/5">
              <span className="font-semibold text-[#2B2D42] dark:text-white">{logo}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

