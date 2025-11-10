import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"

import "./globals.css"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: {
    default: "FormaFlow – Creative Project Management for Designers",
    template: "%s · FormaFlow",
  },
  description:
    "FormaFlow is the design-first project management platform that keeps creative teams in flow—asset versioning, annotation feedback, and timelines crafted for modern studios.",
  keywords: [
    "design project management",
    "creative operations",
    "designer workflow",
    "visual collaboration",
    "creative project tracking",
  ],
  openGraph: {
    title: "FormaFlow – Creative Project Management for Designers",
    description:
      "Shape ideas to delivery with asset versioning, live annotations, and timelines crafted for creative teams.",
    url: "https://forma-flow.example.com",
    siteName: "FormaFlow",
    images: [
      {
        url: "/og-formaflow.png",
        width: 1200,
        height: 630,
        alt: "FormaFlow collaborative design dashboard interface",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "FormaFlow – Creative Project Management for Designers",
    description:
      "Creative project management that speaks the language of design teams—version control, annotations, and timelines in one crafted workspace.",
    images: ["/og-formaflow.png"],
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} min-h-screen bg-background font-sans text-foreground antialiased`}
      >
        {children}
      </body>
    </html>
  )
}
