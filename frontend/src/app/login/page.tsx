"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useAuth } from "@/core/presentation/contexts/auth-context"
import { useErrorHandler } from "@/core/presentation/hooks/use-error-handler"
import { loginSchema, type LoginFormData } from "@/shared/utils/validation"
import { Loader2 } from "lucide-react"

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false)
  const { login, isAuthenticated } = useAuth()
  const { handleError, handleSuccess } = useErrorHandler()
  const router = useRouter()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  })

  // Redirigir si ya está autenticado
  useEffect(() => {
    if (isAuthenticated) {
      router.push("/dashboard")
    }
  }, [isAuthenticated, router])

  const onSubmit = async (data: LoginFormData) => {
    try {
      setIsLoading(true)
      await login(data.email, data.password)
      handleSuccess("Inicio de sesión exitoso")
      router.push("/dashboard")
    } catch (error: any) {
      handleError(error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex">
      {/* Logo Section - Lado Izquierdo */}
      <div className="flex-1 flex items-center justify-center" style={{ backgroundColor: "#F3F4F6" }}>
        <div className="flex items-center justify-center">
          <div
            className="w-80 h-80 rounded-[2.5rem] flex items-center justify-center shadow-lg"
            style={{ backgroundColor: "#E2A355" }}
          >
            <div className="w-48 h-48 bg-white rounded-2xl flex items-center justify-center">
              <div className="relative">
                <svg width="120" height="80" viewBox="0 0 120 80" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M20 60L40 20L60 40L80 10L100 50L120 30V80H0V60L20 60Z" fill="#E2A355" />
                  <path d="M0 60L20 30L40 45L60 15L80 35L100 20L120 40V80H0V60Z" fill="#D4941E" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Form Section - Lado Derecho */}
      <div className="flex-1 flex items-center justify-center bg-white">
        <div className="w-full max-w-md px-8">
          {/* Header */}
          <div className="text-center mb-10">
            <h1 className="text-4xl font-bold text-gray-900 mb-3">Bienvenido</h1>
            <p className="text-gray-600 text-lg">Inicia sesión si tienes una cuenta con nosotros</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
            {/* Campo Usuario */}
            <div>
              <Label htmlFor="email" className="block text-gray-700 font-medium text-base mb-3">
                Usuario
              </Label>
              <Input
                id="email"
                type="email"
                {...register("email")}
                className="w-full h-14 px-4 text-base border-2 border-gray-200 rounded-lg focus:border-primary focus:ring-0 transition-colors"
                placeholder="ejemplo@correo.com"
                disabled={isLoading}
              />
              {errors.email && <p className="mt-2 text-sm text-red-600">{errors.email.message}</p>}
            </div>

            {/* Campo Contraseña */}
            <div>
              <Label htmlFor="password" className="block text-gray-700 font-medium text-base mb-3">
                Contraseña
              </Label>
              <Input
                id="password"
                type="password"
                {...register("password")}
                className="w-full h-14 px-4 text-base border-2 border-gray-200 rounded-lg focus:border-primary focus:ring-0 transition-colors"
                placeholder="Tu contraseña"
                disabled={isLoading}
              />
              {errors.password && <p className="mt-2 text-sm text-red-600">{errors.password.message}</p>}
            </div>

            {/* Botón de Login */}
            <div className="pt-4">
              <Button
                type="submit"
                className="w-full h-14 text-white font-semibold text-base rounded-lg transition-colors"
                style={{
                  backgroundColor: "#2D3748",
                  border: "none",
                }}
                disabled={isLoading}
                onMouseEnter={(e) => {
                  if (!isLoading) {
                    e.currentTarget.style.backgroundColor = "#1A202C"
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isLoading) {
                    e.currentTarget.style.backgroundColor = "#2D3748"
                  }
                }}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Iniciando sesión...
                  </>
                ) : (
                  "Iniciar sesión"
                )}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
