"use client"

import { useState } from "react"
import { ChevronDown } from "lucide-react"

import { FancyReveal } from "fancycomponents"

const faqs = [
  {
    question: "Does FormaFlow integrate with Figma, Sketch, and Adobe CC?",
    answer:
      "Yes. Connect FormaFlow to Figma, Sketch, and Adobe Creative Cloud so new versions sync automatically. Reviewers can comment directly on frames without leaving FormaFlow.",
  },
  {
    question: "How does version control work for visuals?",
    answer:
      "Every upload or synced version becomes a locked snapshot with visual diff previews. You can promote a version as final, roll back, or compare two versions side-by-side.",
  },
  {
    question: "Is there collaborative annotation?",
    answer:
      "Threads live directly on the canvas with pixel-perfect pins. Stakeholders can annotate, react, and resolve in real time, including time-stamped video feedback.",
  },
  {
    question: "Can clients review without extra seats?",
    answer:
      "Invite clients as external reviewers with limited access. They can comment and approve without consuming internal seats or seeing unrelated work.",
  },
]

export function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
    <section className="py-24">
      <div className="mx-auto w-full max-w-4xl px-4">
        <FancyReveal className="text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.32em] text-[#FF5A5F]">FAQ</p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-[#2B2D42] md:text-4xl dark:text-white">
            Answers for design-led teams
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            From syncing assets to guiding clients through approvals, FormaFlow scales with your creative operations.
          </p>
        </FancyReveal>

        <div className="mt-12 rounded-3xl border border-border/40 bg-white/80 p-2 shadow-lg dark:border-white/10 dark:bg-white/5">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index
            return (
              <div key={faq.question} className="overflow-hidden rounded-2xl">
                <button
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="flex w-full items-center justify-between gap-4 rounded-2xl bg-white/70 px-6 py-5 text-left transition hover:bg-[#FF5A5F]/5 dark:bg-white/5 dark:hover:bg-white/10"
                >
                  <span className="text-base font-semibold text-[#2B2D42] dark:text-white">{faq.question}</span>
                  <ChevronDown
                    className={`h-5 w-5 text-muted-foreground transition-transform duration-300 ${
                      isOpen ? "rotate-180 text-[#FF5A5F]" : ""
                    }`}
                  />
                </button>
                <div
                  className={`grid transition-all duration-300 ${
                    isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <div className="overflow-hidden px-6 pb-6">
                    <p className="text-sm text-muted-foreground">{faq.answer}</p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

