"use client"

import * as React from "react"
import { motion, useMotionTemplate, useMotionValue } from "framer-motion"

type FancyContainerProps = {
  children: React.ReactNode
  className?: string
}

export function FancyReveal({ children, className = "" }: FancyContainerProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.35 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

type FancyCardProps = FancyContainerProps & {
  glowColor?: string
}

export function FancyGlowCard({ children, className = "", glowColor = "rgba(255,90,95,0.18)" }: FancyCardProps) {
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const glow = useMotionTemplate`radial-gradient(180px circle at ${x}px ${y}px, ${glowColor}, transparent 70%)`

  return (
    <motion.div
      className={`group relative overflow-hidden rounded-3xl border border-border/60 bg-white/70 p-6 shadow-[0_20px_60px_-40px_rgba(0,0,0,0.45)] backdrop-blur-lg transition hover:shadow-[0_25px_60px_-35px_rgba(255,90,95,0.35)] dark:border-white/10 dark:bg-white/5 ${className}`}
      onPointerMove={(event) => {
        const bounds = event.currentTarget.getBoundingClientRect()
        x.set(event.clientX - bounds.left)
        y.set(event.clientY - bounds.top)
      }}
      onPointerLeave={() => {
        x.set(0)
        y.set(0)
      }}
    >
      <motion.span
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{ background: glow }}
      />
      <div className="relative z-10">{children}</div>
    </motion.div>
  )
}

export function FancyParallax({ children, className = "", offset = 16 }: FancyContainerProps & { offset?: number }) {
  return (
    <motion.div
      className={className}
      initial={{ y: offset, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  )
}

