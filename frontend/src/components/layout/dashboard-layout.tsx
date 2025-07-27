"use client"

import type React from "react"

import { useAuth } from "@/core/presentation/contexts/auth-context"
import { Sidebar } from "@/components/layout/sidebar"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { ChevronDown, LogOut } from "lucide-react"
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

  const getUserInitials = () => {
    if (!user) return "U"
    return `${user.first_name?.[0] || ""}${user.last_name?.[0] || ""}`.toUpperCase()
  }

  return (
    <div className="min-h-screen flex bg-gray-50">
      {/* Sidebar */}
      <div className="w-64 bg-primary flex flex-col">
        {/* Logo */}
        <div className="p-6 border-b border-primary-foreground/10">
          <div className="flex items-center justify-center">
            <div className="w-16 h-16 bg-secondary rounded-2xl flex items-center justify-center">
              <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
                <svg width="20" height="16" viewBox="0 0 20 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M3 12L7 4L10 8L13 2L17 10L20 6V16H0V12L3 12Z" fill="#E2A355" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* User Info */}
        <div className="p-4 border-b border-primary-foreground/10">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="w-full justify-start text-primary-foreground hover:bg-primary-foreground/10"
              >
                <Avatar className="w-8 h-8 mr-3">
                  <AvatarFallback className="bg-secondary text-white text-sm">{getUserInitials()}</AvatarFallback>
                </Avatar>
                <span className="flex-1 text-left">
                  {user?.first_name} {user?.last_name}
                </span>
                <ChevronDown className="w-4 h-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-56">
              <DropdownMenuItem onClick={handleLogout}>
                <LogOut className="w-4 h-4 mr-2" />
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
