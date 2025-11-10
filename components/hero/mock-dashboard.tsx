"use client"

import { motion } from "framer-motion"
import { CheckCircle, MessageCircle, Paintbrush, PenTool, Sparkles } from "lucide-react"

export function MockDashboard() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96, y: 12 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
      className="relative isolate mx-auto w-full max-w-3xl rounded-3xl border border-white/30 bg-white/70 p-6 backdrop-blur-lg shadow-[0_40px_120px_-60px_rgba(43,45,66,0.45)] dark:border-white/10 dark:bg-white/5"
    >
      <motion.div
        className="absolute inset-0 -z-10 rounded-3xl bg-gradient-to-br from-[#FFD6D6]/70 via-white/40 to-[#C9F0FF]/60 dark:from-[#1a1c27]/80 dark:via-[#11131C]/60 dark:to-[#1E2233]/80"
        style={{ filter: "blur(0)" }}
      />
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.22em] text-[#FF5A5F]">Design Sprint</p>
          <h3 className="mt-1 text-lg font-semibold text-[#2B2D42] dark:text-white">Voyage Studio — Rebrand launch</h3>
        </div>
        <span className="rounded-full border border-[#FF5A5F]/30 bg-[#FF5A5F]/10 px-3 py-1 text-xs font-medium text-[#FF5A5F]">
          68% in flow
        </span>
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-[1fr,0.65fr]">
        <div className="space-y-4">
          <div className="rounded-2xl border border-border/40 bg-white/70 p-4 shadow-sm dark:border-white/10 dark:bg-white/5">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-semibold text-[#2B2D42] dark:text-white">Creative Timeline</h4>
              <span className="text-xs text-muted-foreground">Week 04</span>
            </div>
            <div className="mt-4 space-y-3">
              {[
                { label: "Visual mood boards", status: "Approved", icon: Sparkles, color: "#FF5A5F" },
                { label: "UI kit exploration", status: "In feedback", icon: PenTool, color: "#6C63FF" },
                { label: "Prototype handoff", status: "In progress", icon: Paintbrush, color: "#2BB0ED" },
              ].map((item) => (
                <div key={item.label} className="flex items-center justify-between gap-3 rounded-xl bg-white/80 p-3 shadow-sm dark:bg-white/5">
                  <div className="flex items-center gap-3">
                    <span
                      className="flex h-9 w-9 items-center justify-center rounded-full bg-black/5 dark:bg-white/10"
                      style={{ color: item.color }}
                    >
                      <item.icon className="h-4 w-4" />
                    </span>
                    <div>
                      <p className="text-sm font-medium text-[#2B2D42] dark:text-white">{item.label}</p>
                      <p className="text-xs text-muted-foreground">Due tomorrow · V2 ready</p>
                    </div>
                  </div>
                  <span className="text-xs font-medium text-muted-foreground">{item.status}</span>
                </div>
              ))}
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.4 }}
            className="flex items-center justify-between rounded-2xl border border-dashed border-[#FF5A5F]/30 bg-gradient-to-r from-[#FF5A5F]/10 via-transparent to-transparent p-4 text-sm text-[#2B2D42] dark:text-white"
          >
            <div className="flex items-center gap-3">
              <CheckCircle className="h-5 w-5 text-[#FF5A5F]" />
              <div>
                <p className="font-medium">Approval cadence</p>
                <p className="text-xs text-muted-foreground">Stakeholders aligned in 2 feedback loops</p>
              </div>
            </div>
            <button className="rounded-full border border-[#FF5A5F]/40 bg-[#FF5A5F]/20 px-4 py-1 text-xs font-medium text-[#FF5A5F]">
              View summary
            </button>
          </motion.div>
        </div>

        <div className="space-y-4">
          <div className="rounded-2xl border border-border/40 bg-white/80 p-4 shadow-sm dark:border-white/10 dark:bg-white/5">
            <p className="text-sm font-semibold text-[#2B2D42] dark:text-white">Version rounds</p>
            <div className="mt-4 space-y-3">
              {["Homepage canvas", "Interaction prototype", "Design system"].map((name, index) => (
                <div
                  key={name}
                  className="flex items-start justify-between gap-3 rounded-xl bg-white/80 p-3 shadow-sm dark:bg-white/5"
                >
                  <div>
                    <p className="text-sm font-medium text-[#2B2D42] dark:text-white">{name}</p>
                    <p className="text-xs text-muted-foreground">V{index + 3} · Updated 2h ago</p>
                  </div>
                  <span className="rounded-full border border-[#2B2D42]/10 bg-[#2B2D42]/5 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide text-[#2B2D42] dark:border-white/20 dark:bg-white/10 dark:text-white">
                    Review
                  </span>
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-2xl border border-border/40 bg-white/80 p-4 shadow-sm dark:border-white/10 dark:bg-white/5">
            <p className="text-sm font-semibold text-[#2B2D42] dark:text-white">Live annotations</p>
            <div className="mt-3 space-y-3">
              {[
                {
                  name: "Amelia Chen",
                  role: "Design Director",
                  message: "Love the new hover, can we soften the shadow 8px?",
                },
                {
                  name: "Lucas Meyer",
                  role: "Product Lead",
                  message: "Version timeline is crystal clear — ready for client.",
                },
              ].map((comment) => (
                <div key={comment.name} className="rounded-xl border border-white/30 bg-white/80 p-3 shadow-sm dark:border-white/10 dark:bg-white/10">
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <p className="text-sm font-medium text-[#2B2D42] dark:text-white">{comment.name}</p>
                      <p className="text-[11px] uppercase tracking-wider text-muted-foreground">{comment.role}</p>
                    </div>
                    <MessageCircle className="h-4 w-4 text-[#FF5A5F]" />
                  </div>
                  <p className="mt-2 text-xs text-muted-foreground">{comment.message}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

