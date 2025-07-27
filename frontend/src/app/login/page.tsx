"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Logo } from "@/components/ui/icon"
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
      <div className="flex-1 flex items-center justify-center">
        <Logo variant="cuadrado" size={360} />
      </div>

      {/* Form Section - Lado Derecho */}
      <div className="flex-1 flex items-center justify-center" style={{ backgroundColor: "#dde6f2" }}>
        <div className="w-full max-w-md px-8">
          {/* Header */}
          <div className="text-start mb-10">
            <h1 className="text-2xl font-bold text-gray-900 mb-3 font-display">Bienvenido</h1>
            <p className="text-gray-600 text-xs">Inicia sesión si tienes una cuenta con nosotros</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Campo Usuario */}
            <div>
              <Label htmlFor="email" className="block text-gray-700 font-medium text-sm mb-2">
                Usuario
              </Label>
              <Input
                id="email"
                type="email"
                {...register("email")}
                className="w-full h-10 px-2 text-base border border-gray-600 focus:border-primary focus:ring-0 transition-colors bg-white"
                placeholder=""
                disabled={isLoading}
              />
              {errors.email && <p className="text-sm text-red-600">{errors.email.message}</p>}
            </div>

            {/* Campo Contraseña */}
            <div className="py-4">
              <Label htmlFor="password" className="block text-gray-700 font-medium text-sm mb-3">
                Contraseña
              </Label>
              <Input
                id="password"
                type="password"
                {...register("password")}
                className="w-full h-10 px-2 text-base border border-gray-600 focus:border-primary focus:ring-0 transition-colors bg-white"
                placeholder=""
                disabled={isLoading}
              />
              {errors.password && <p className="text-sm text-red-600">{errors.password.message}</p>}
            </div>

            {/* Botón de Login */}
            <div className="pt-4">
              <Button
                type="submit"
                className="w-full h-10 text-white font-bold text-lg transition-colors font-red-hat"
                style={{
                  backgroundColor: "#12172f",
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
                    e.currentTarget.style.backgroundColor = "#12172f"
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