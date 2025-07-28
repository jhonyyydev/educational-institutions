"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Logo } from "@/components/ui/icon"
import { useAuth } from "@/core/presentation/contexts/auth-context"
import { Home, LogIn, ArrowLeft } from "lucide-react"

export default function NotFound() {
  const router = useRouter()
  const { isAuthenticated, isLoading } = useAuth()
  const [mounted, setMounted] = useState(false)

  // Evitar hydration mismatch
  useEffect(() => {
    setMounted(true)
  }, [])

  const handleGoBack = () => {
    router.back()
  }

  const handleGoHome = () => {
    if (isAuthenticated) {
      router.push("/dashboard")
    } else {
      router.push("/login")
    }
  }

  // Mostrar loading mientras se verifica la autenticación
  if (!mounted || isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex">
      {/* Logo Section - Lado Izquierdo */}
      <div className="flex-1 flex items-center justify-center bg-white">
        <div className="text-center">
          <Logo variant="cuadrado" size={280} />
          <div className="mt-8 text-gray-600">
            <p className="text-sm">Sistema de Gestión Educativa</p>
          </div>
        </div>
      </div>

      {/* Error Section - Lado Derecho */}
      <div className="flex-1 flex items-center justify-center" style={{ backgroundColor: "#dde6f2" }}>
        <div className="w-full max-w-md px-8 text-center">
          {/* Error Icon */}
          <div className="mb-8">
            <div className="mx-auto w-24 h-24 bg-red-100 rounded-full flex items-center justify-center mb-6">
              <span className="text-4xl font-bold text-red-600">404</span>
            </div>
          </div>

          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-4 font-display">Página no encontrada</h1>
            <p className="text-gray-600 text-base leading-relaxed">
              Lo sentimos, la página que estás buscando no existe o ha sido movida.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="space-y-4">
            {/* Botón principal - Dashboard o Login según autenticación */}
            <Button
              onClick={handleGoHome}
              className="w-full h-12 text-white font-bold text-base transition-all duration-200 font-red-hat flex items-center justify-center gap-3"
              style={{
                backgroundColor: "#12172f",
                border: "none",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "#1A202C"
                e.currentTarget.style.transform = "translateY(-1px)"
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "#12172f"
                e.currentTarget.style.transform = "translateY(0px)"
              }}
            >
              {isAuthenticated ? (
                <>
                  <Home className="w-5 h-5" />
                  Ir al Dashboard
                </>
              ) : (
                <>
                  <LogIn className="w-5 h-5" />
                  Iniciar Sesión
                </>
              )}
            </Button>

            {/* Botón secundario - Volver */}
            <Button
              onClick={handleGoBack}
              variant="outline"
              className="w-full h-12 text-gray-700 font-medium text-base border-2 border-gray-300 bg-white hover:bg-gray-50 transition-all duration-200 flex items-center justify-center gap-3"
            >
              <ArrowLeft className="w-5 h-5" />
              Volver atrás
            </Button>
          </div>

          {/* Additional Info */}
          <div className="mt-8 pt-6 border-t border-gray-300">
            <p className="text-xs text-gray-500">
              Si crees que esto es un error, contacta al administrador del sistema.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
