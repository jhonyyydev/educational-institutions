"use client"

import type React from "react"
import { useAuth } from "@/core/presentation/contexts/auth-context"
import { Sidebar } from "@/components/layout/sidebar"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Icon } from "@/components/ui/icon"
import { ChevronDown } from "lucide-react"
import { useRouter } from "next/navigation"

interface DashboardLayoutProps {
  children: React.ReactNode
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const { user, logout } = useAuth()
  const router = useRouter()

  const handleLogout = async () => {
    try {
      await logout()
      router.push("/login")
    } catch (error) {
      console.error("Error during logout:", error)
    }
  }

  return (
    <div className="min-h-screen flex bg-gray-50">
      {/* Sidebar */}
      <div className="w-64 flex flex-col" style={{ backgroundColor: "#12172f" }}>
        {/* Logo */}
        <div className="p-6 flex items-center justify-center">
          <div className="w-20 h-16 bg-white rounded-lg flex items-center justify-center">
            <Icon name="logo-cuadrado" size={40} />
          </div>
        </div>

        {/* User Info */}
        <div className="px-4 pb-6">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="w-full justify-start text-white hover:bg-white/10 h-12 px-3">
                <Icon
                  name="account-circle"
                  size={32}
                  className="mr-3 brightness-0 invert"
                />
                <div className="flex flex-col items-start flex-1">
                  <span className="text-sm font-medium">
                    {user?.first_name} {user?.last_name}
                  </span>
                </div>
                <ChevronDown className="w-4 h-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-56">
              <DropdownMenuItem onClick={handleLogout}>
                <Icon name="logout" size={16} className="mr-2" />
                Cerrar Sesión
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Navigation */}
        <Sidebar />
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">{children}</div>
    </div>
  )
}
