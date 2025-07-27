"use client"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Icon } from "@/components/ui/icon"
import { usePathname } from "next/navigation"
import { useRouter } from "next/navigation"
import { useAuth } from "@/core/presentation/contexts/auth-context"
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
] as const

export function Sidebar() {
  const pathname = usePathname()
  const router = useRouter()
  const { logout } = useAuth()

  const handleLogout = async () => {
    try {
      await logout()
      router.push("/login")
    } catch (error) {
      console.error("Error during logout:", error)
    }
  }

  return (
    <nav className="flex-1 px-4 py-6 space-y-1 flex flex-col">
      {/* Navigation Items */}
      <div className="space-y-1">
        {navigationItems.map((item) => {
          const isActive = pathname === item.href || pathname.startsWith(item.href + "/")

          return (
            <Link key={item.name} href={item.href}>
              <Button
                variant="ghost"
                className={cn(
                  "w-full justify-start text-white hover:bg-white/10 h-12 px-3",
                  isActive && "bg-white/20 text-white",
                )}
              >
                <Icon name={item.icon} size={24} className="mr-4 brightness-0 invert" />
                <span className="text-sm font-medium">{item.name}</span>
              </Button>
            </Link>
          )
        })}
      </div>

      {/* Logout Button - Fixed at bottom */}
      <div >
        <Button
          variant="ghost"
          onClick={handleLogout}
          className="w-full justify-start text-white hover:bg-white/10 h-12 px-3"
        >
          <Icon name="logout" size={24} className="mr-4 brightness-0 invert" />
          <span className="text-sm font-medium">Cerrar Sesión</span>
        </Button>
      </div>
    </nav>
  )
}
