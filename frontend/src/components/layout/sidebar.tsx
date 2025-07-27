"use client"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Icon } from "@/components/ui/icon"
import { usePathname } from "next/navigation"
import Link from "next/link"

const navigationItems = [
  {
    name: "Dashboard",
    href: "/dashboard",
    icon: "home",
  },
  {
    name: "Instituciones",
    href: "/dashboard/institutions",
    icon: "school",
  },
  {
    name: "Usuarios",
    href: "/dashboard/users",
    icon: "person",
  },
  {
    name: "Grupos",
    href: "/dashboard/groups",
    icon: "group",
  },
  {
    name: "Reportes",
    href: "/dashboard/reports",
    icon: "image",
  },
] as const

export function Sidebar() {
  const pathname = usePathname()

  return (
    <nav className="flex-1 px-4 py-6 space-y-2">
      {navigationItems.map((item) => {
        const isActive = pathname === item.href || pathname.startsWith(item.href + "/")

        return (
          <Link key={item.name} href={item.href}>
            <Button
              variant="ghost"
              className={cn("w-full justify-start text-white hover:bg-white/10", isActive && "bg-white/20 text-white")}
            >
              <Icon name={item.icon} size={20} className="mr-3 brightness-0 invert" />
              {item.name}
            </Button>
          </Link>
        )
      })}
    </nav>
  )
}
