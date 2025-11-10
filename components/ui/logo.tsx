"use client"

import Link from "next/link"
import { motion } from "framer-motion"

export function Logo({ href = "/", className = "" }: { href?: string; className?: string }) {
  return (
    <Link href={href} className="inline-flex items-center gap-2 text-base font-semibold tracking-tight text-foreground">
      <span className="relative isolate flex h-8 w-8 items-center justify-center">
        <motion.span
          className="absolute inset-0 rounded-xl bg-gradient-to-br from-[#FF5A5F] via-[#FF8A7A] to-[#FFB26B] shadow-[0_10px_30px_-12px_rgba(255,90,95,0.55)]"
          animate={{ rotate: [0, 8, 0], scale: [1, 1.02, 1] }}
          transition={{ duration: 3.6, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.span
          className="relative z-10 text-sm font-semibold text-white"
          animate={{ y: [0, -2, 0] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
        >
          Ff
        </motion.span>
      </span>
      <span className="text-lg font-semibold tracking-tight text-[color:#2B2D42] dark:text-white">FormaFlow</span>
    </Link>
  )
}

