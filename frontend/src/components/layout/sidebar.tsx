"use client"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Home, GraduationCap, Users, UsersRound, ArrowRight } from "lucide-react"
import { usePathname } from "next/navigation"
import Link from "next/link"

const navigationItems = [
  {
    name: "Dashboard",
    href: "/dashboard",
    icon: Home,
  },
  {
    name: "Instituciones",
    href: "/dashboard/institutions",
    icon: GraduationCap,
  },
  {
    name: "Usuarios",
    href: "/dashboard/users",
    icon: Users,
  },
  {
    name: "Grupos",
    href: "/dashboard/groups",
    icon: UsersRound,
  },
  {
    name: "Reportes",
    href: "/dashboard/reports",
    icon: ArrowRight,
  },
]

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
              className={cn(
                "w-full justify-start text-primary-foreground hover:bg-primary-foreground/10",
                isActive && "bg-primary-foreground/20 text-white",
              )}
            >
              <item.icon className="w-5 h-5 mr-3" />
              <span className="sr-only">{item.name}</span>
            </Button>
          </Link>
        )
      })}
    </nav>
  )
}
