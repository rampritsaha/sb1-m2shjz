"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, Scissors, Info, Phone } from "lucide-react"
import { cn } from "@/lib/utils"

const tabs = [
  {
    href: "/",
    label: "Home",
    icon: Home
  },
  {
    href: "/style-advisor",
    label: "Style",
    icon: Scissors
  },
  {
    href: "/about",
    label: "About",
    icon: Info
  },
  {
    href: "/contact",
    label: "Contact",
    icon: Phone
  }
]

export function MobileTabs() {
  const pathname = usePathname()

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <nav className="flex items-center justify-around h-16">
        {tabs.map((tab) => {
          const Icon = tab.icon
          return (
            <Link
              key={tab.href}
              href={tab.href}
              className={cn(
                "flex flex-col items-center justify-center flex-1 h-full gap-0.5 text-[10px] sm:text-xs font-medium transition-colors",
                pathname === tab.href
                  ? "text-primary"
                  : "text-muted-foreground hover:text-primary"
              )}
            >
              <Icon className="h-4 w-4 sm:h-5 sm:w-5" />
              <span>{tab.label}</span>
            </Link>
          )
        })}
      </nav>
    </div>
  )
}