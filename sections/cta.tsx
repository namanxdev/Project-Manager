"use client"

import Link from "next/link"
import { ArrowRight } from "lucide-react"

import { Button } from "@/components/ui/button"
import { FancyGlowCard, FancyReveal } from "fancycomponents"

export function FinalCtaSection() {
  return (
    <section className="pb-24 pt-16">
      <div className="mx-auto w-full max-w-5xl px-4">
        <FancyGlowCard className="relative overflow-hidden rounded-[40px] bg-gradient-to-br from-[#2B2D42] via-[#1F2130] to-[#0B0C13] p-12 text-white shadow-[0_50px_100px_-50px_rgba(15,17,30,0.8)] dark:from-[#161820] dark:via-[#0D0E14] dark:to-black">
          <div className="absolute -right-32 top-0 hidden h-64 w-64 rounded-full bg-[#FF5A5F]/30 blur-[120px] md:block" />
          <FancyReveal className="relative z-10 space-y-6">
            <p className="text-xs font-semibold uppercase tracking-[0.32em] text-[#FFB26B]">Next-gen creative ops</p>
            <h2 className="text-3xl font-semibold tracking-tight text-white md:text-4xl">
              Give your design team a workspace that celebrates the craft
            </h2>
            <p className="text-lg text-white/70">
              Join studios redefining creative collaboration. FormaFlow folds into your existing tools and keeps momentum on every brief.
            </p>
            <div className="flex flex-col gap-4 sm:flex-row">
              <Button
                size="lg"
                className="rounded-full bg-white/95 px-10 text-base font-medium text-[#2B2D42] hover:bg-white"
                asChild
              >
                <Link href="/dashboard">
                  Start free
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button
                size="lg"
                variant="ghost"
                className="rounded-full border border-white/40 bg-white/10 px-8 text-base text-white transition hover:bg-white/20"
                asChild
              >
                <Link href="#resources">Explore UI kit templates</Link>
              </Button>
            </div>
            <p className="text-xs uppercase tracking-[0.32em] text-white/50">
              Figma • Sketch • Adobe CC • Webflow • Notion
            </p>
          </FancyReveal>
        </FancyGlowCard>
      </div>
    </section>
  )
}

