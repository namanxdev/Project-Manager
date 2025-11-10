'use client'

import { type ReactNode, useEffect, useState } from "react"
import { createPortal } from "react-dom"
import { cn } from "@/lib/utils"

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  children: ReactNode
  className?: string
  labelledBy?: string
  describedBy?: string
}

export function Modal({
  isOpen,
  onClose,
  children,
  className,
  labelledBy,
  describedBy,
}: ModalProps) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!isOpen || typeof document === "undefined") return
    const keyListener = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose()
      }
    }
    document.addEventListener("keydown", keyListener)
    return () => {
      document.removeEventListener("keydown", keyListener)
    }
  }, [isOpen, onClose])

  useEffect(() => {
    if (!isOpen || typeof document === "undefined") return
    const originalOverflow = document.body.style.overflow
    document.body.style.overflow = "hidden"
    return () => {
      document.body.style.overflow = originalOverflow
    }
  }, [isOpen])

  if (!mounted || !isOpen || typeof document === "undefined") {
    return null
  }

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4 sm:px-6">
      <div
        className="absolute inset-0 bg-background/80 backdrop-blur-sm transition-opacity"
        aria-hidden="true"
        onClick={onClose}
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={labelledBy}
        aria-describedby={describedBy}
        className={cn(
          "relative z-10 w-full max-w-lg rounded-xl border bg-background shadow-xl",
          className
        )}
        onClick={(event) => event.stopPropagation()}
      >
        {children}
      </div>
    </div>,
    document.body
  )
}


