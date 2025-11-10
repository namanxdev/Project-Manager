import type { Metadata } from "next"

import "./marketing.css"

export const metadata: Metadata = {
  title: "FormaFlow – Design-Led Project Management",
}

export default function MarketingLayout({ children }: { children: React.ReactNode }) {
  return <div className="min-h-screen bg-gradient-to-b from-[#F8F9FF] via-white to-[#F4F5FA] dark:from-[#12131A] dark:via-[#0C0D12] dark:to-[#11131C]">{children}</div>
}

