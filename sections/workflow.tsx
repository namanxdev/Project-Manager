"use client"

import { motion } from "framer-motion"

import { FancyParallax, FancyReveal } from "fancycomponents"

const steps = [
  {
    number: "01",
    title: "Create the brief",
    description: "Spin up project canvases with brand context, goals, and moodboards in minutes.",
  },
  {
    number: "02",
    title: "Upload assets & invite stakeholders",
    description: "Drop in Figma frames, prototypes, PDFs, or motion renders — invite reviewers with granular roles.",
  },
  {
    number: "03",
    title: "Review & annotate",
    description: "Annotate directly on pixels with contextual threads, visual diffing, and approval states.",
  },
  {
    number: "04",
    title: "Final deliver",
    description: "Share final packages, lock versions, and export branded presentations in one click.",
  },
]

export function WorkflowSection() {
  return (
    <section id="workflow" className="relative overflow-hidden py-24">
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-transparent via-[#2B2D42]/3 to-transparent opacity-40 dark:via-[#0f111c]" />
      <div className="mx-auto grid w-full max-w-6xl gap-12 px-4 lg:grid-cols-[1.1fr,0.9fr] lg:items-center">
        <FancyReveal className="space-y-6">
          <p className="text-xs font-semibold uppercase tracking-[0.32em] text-[#FF5A5F]">Workflow</p>
          <h2 className="text-3xl font-semibold tracking-tight text-[#2B2D42] md:text-4xl dark:text-white">
            A creative journey mapped into one tool
          </h2>
          <p className="text-lg text-muted-foreground">
            FormaFlow choreographs the design lifecycle end-to-end, so every phase feels intentional and effortless.
          </p>
          <div className="mt-8 space-y-5">
            {steps.map((step) => (
              <FancyParallax key={step.number} offset={18} className="group">
                <div className="flex items-start gap-4 rounded-3xl border border-border/50 bg-white/70 p-5 shadow-sm transition group-hover:border-[#FF5A5F]/40 group-hover:bg-[#FF5A5F]/8 dark:border-white/10 dark:bg-white/5 dark:group-hover:bg-white/10">
                  <span className="mt-1 flex h-10 w-10 items-center justify-center rounded-2xl border border-[#FF5A5F]/30 bg-[#FF5A5F]/10 text-sm font-semibold text-[#FF5A5F]">
                    {step.number}
                  </span>
                  <div>
                    <h3 className="text-lg font-semibold text-[#2B2D42] dark:text-white">{step.title}</h3>
                    <p className="mt-2 text-sm text-muted-foreground">{step.description}</p>
                  </div>
                </div>
              </FancyParallax>
            ))}
          </div>
        </FancyReveal>

        <div className="relative">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative flex items-center justify-center"
          >
            <div className="relative h-[520px] w-full max-w-[480px]">
              <div className="absolute inset-0 rounded-[42px] border border-white/40 bg-gradient-to-br from-white/90 to-white/40 shadow-[0_45px_80px_-40px_rgba(43,45,66,0.45)] backdrop-blur-md dark:border-white/10 dark:from-white/10 dark:to-white/5">
                <div className="absolute inset-4 rounded-[32px] border border-dashed border-[#FF5A5F]/40 p-6">
                  <div className="space-y-6 text-sm text-[#2B2D42] dark:text-white">
                    <div>
                      <p className="text-xs uppercase tracking-[0.28em] text-muted-foreground">Timeline</p>
                      <h3 className="mt-2 text-xl font-semibold">Voyage Studio handoff</h3>
                    </div>
                    <div className="space-y-4">
                      {steps.map((step) => (
                        <div key={step.title} className="rounded-2xl border border-border/50 bg-white/70 p-4 shadow-sm dark:border-white/10 dark:bg-white/10">
                          <p className="text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">{step.number}</p>
                          <p className="mt-1 text-base font-semibold">{step.title}</p>
                          <p className="mt-2 text-xs text-muted-foreground">{step.description}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="absolute -top-12 -right-10 hidden w-44 rotate-6 rounded-3xl border border-white/40 bg-white/80 p-4 text-xs text-[#2B2D42] shadow-lg backdrop-blur dark:border-white/10 dark:bg-white/10 md:block">
                <p className="font-semibold text-[#FF5A5F]">Stakeholder praise</p>
                <p className="mt-2 italic text-muted-foreground">“Every review now takes 50% less time.”</p>
              </div>

              <div className="absolute -bottom-12 -left-12 hidden w-52 -rotate-6 rounded-3xl border border-white/40 bg-[#2B2D42] p-4 text-xs text-white shadow-lg backdrop-blur md:block">
                <p className="font-semibold text-[#FFB26B]">Live highlights</p>
                <p className="mt-1 text-[11px] uppercase tracking-[0.32em] text-white/50">3 threads resolved · V4 ready</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

