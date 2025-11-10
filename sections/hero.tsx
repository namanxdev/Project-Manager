"use client"

import Link from "next/link"
import { ArrowRight, Play } from "lucide-react"
import { motion } from "framer-motion"

import { MockDashboard } from "@/components/hero/mock-dashboard"
import { Button } from "@/components/ui/button"
import { FancyParallax, FancyReveal } from "fancycomponents"

export function HeroSection() {
  return (
    <section className="relative overflow-hidden pb-24 pt-24 md:pt-32">
      <div className="absolute inset-x-0 top-20 -z-10 flex justify-center">
        <div className="h-72 w-[760px] rounded-full bg-[#FF5A5F]/15 blur-[120px] dark:bg-[#FF5A5F]/20" />
      </div>

      <div className="hero-grid">
        <div className="mx-auto flex w-full max-w-6xl flex-col items-center gap-12 px-4 text-center">
          <FancyReveal className="max-w-3xl space-y-6">
            <span className="inline-flex items-center gap-2 rounded-full border border-[#FF5A5F]/30 bg-[#FF5A5F]/10 px-4 py-1 text-xs font-medium uppercase tracking-[0.32em] text-[#FF5A5F]">
              Crafted for Creative Ops
            </span>
            <h1 className="text-4xl font-semibold tracking-tight text-[#2B2D42] sm:text-5xl sm:leading-tight md:text-6xl md:leading-[1.05] dark:text-white">
              Design projects. <span className="text-transparent bg-clip-text bg-gradient-to-br from-[#FF5A5F] to-[#8A63FF]">Delivered beautifully.</span>
            </h1>
            <p className="text-lg leading-8 text-muted-foreground md:text-xl">
              FormaFlow keeps every asset, version, and stakeholder in sync — so your studio can focus on the craft, not the catch-up.
            </p>
          </FancyReveal>

          <FancyReveal className="flex flex-col items-center gap-4 sm:flex-row">
            <Button
              size="lg"
              className="group rounded-full bg-[#FF5A5F] px-10 text-base font-medium text-white shadow-[0_25px_60px_-25px_rgba(255,90,95,0.8)] transition hover:bg-[#ff6f73]"
              asChild
            >
              <Link href="/dashboard">
                Try for free
                <ArrowRight className="ml-2 h-5 w-5 transition group-hover:translate-x-1" />
              </Link>
            </Button>
            <Button
              size="lg"
              variant="ghost"
              className="rounded-full border border-border/60 bg-white/70 px-6 text-base text-[#2B2D42] transition hover:border-[#FF5A5F]/40 hover:bg-[#FF5A5F]/10 dark:bg-white/5 dark:text-white"
              asChild
            >
              <Link href="#workflow">
                <Play className="mr-2 h-4 w-4" />
                Watch designers in flow
              </Link>
            </Button>
          </FancyReveal>

          <FancyParallax className="flex w-full justify-center">
            <MockDashboard />
          </FancyParallax>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-xs text-muted-foreground"
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-border/50 bg-white/70 px-3 py-1 shadow-sm dark:bg-white/5">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#2BB0ED] opacity-75"></span>
                <span className="relative inline-flex h-full w-full rounded-full bg-[#2BB0ED]"></span>
              </span>
              12 design studios switched last week
            </span>
            <span>Trusted by teams at ZipBoard, Markup.io, Aether Labs, Visionary.</span>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

