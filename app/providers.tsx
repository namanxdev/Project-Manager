"use client"

import { Toaster } from "react-hot-toast"

import { ThemeProvider } from "@/components/theme-provider"
import { AppProvider } from "@/context/AppContext"

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <AppProvider>
        {children}
        <Toaster
          position="top-right"
          toastOptions={{
            className: "rounded-lg border border-border bg-background text-foreground shadow-lg",
          }}
        />
      </AppProvider>
    </ThemeProvider>
  )
}
