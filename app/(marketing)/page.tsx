import { MarketingNav } from "@/components/MarketingNav"
import { ThemeProvider } from "@/components/theme-provider"
import { FinalCtaSection } from "@/sections/cta"
import { FaqSection } from "@/sections/faq"
import { HeroSection } from "@/sections/hero"
import { PricingSection } from "@/sections/pricing"
import { SocialProofSection } from "@/sections/social-proof"
import { MarketingFooter } from "@/sections/footer"
import { WhyDesignersLoveSection } from "@/sections/why-designers-love"
import { WorkflowSection } from "@/sections/workflow"

export default function MarketingPage() {
  return <MarketingClient />
}

function MarketingClient() {
  "use client"

  return (
    <ThemeProvider>
      <div className="relative overflow-hidden">
        <MarketingNav />
        <main className="space-y-4">
          <HeroSection />
          <WhyDesignersLoveSection />
          <WorkflowSection />
          <SocialProofSection />
          <PricingSection />
          <FaqSection />
          <FinalCtaSection />
        </main>
        <MarketingFooter />
      </div>
    </ThemeProvider>
  )
}

