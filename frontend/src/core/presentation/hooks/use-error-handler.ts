"use client"

import { useCallback } from "react"
import { toast } from "sonner"
import type { ApiError } from "@/shared/types/api.types"

export function useErrorHandler() {
  const handleError = useCallback((error: ApiError | Error | any) => {

    // Verificar si es un error de la API
    if (error && typeof error === "object" && "status" in error) {
      const apiError = error as ApiError

      switch (apiError.status) {
        case 0:
          toast.error("Error de conexión", {
            description: "No se puede conectar con el servidor. Verifica tu conexión a internet.",
          })
          break
        case 401:
          toast.error("Error de autenticación", {
            description: "Credenciales inválidas. Verifica tu email y contraseña.",
          })
          break
        case 403:
          toast.error("Sin permisos", {
            description: "No tienes permisos para realizar esta acción.",
          })
          break
        case 408:
          toast.error("Tiempo agotado", {
            description: "La petición ha tardado demasiado. Intenta nuevamente.",
          })
          break
        case 422:
          if (apiError.errors) {
            const errorMessages = Object.entries(apiError.errors)
              .map(([field, messages]) => `${field}: ${messages.join(", ")}`)
              .join("\n")

            toast.error("Error de validación", {
              description: errorMessages,
            })
          } else {
            toast.error("Error de validación", {
              description: apiError.message || "Los datos proporcionados no son válidos",
            })
          }
          break
        case 500:
          toast.error("Error del servidor", {
            description: "Error interno del servidor. Intenta nuevamente más tarde.",
          })
          break
        default:
          toast.error("Error", {
            description: apiError.message || "Ha ocurrido un error inesperado",
          })
      }
    } else if (error && typeof error === "object" && "message" in error) {
      toast.error("Error", {
        description: error.message || "Ha ocurrido un error inesperado",
      })
    } else {
      toast.error("Error", {
        description: "Ha ocurrido un error inesperado. Por favor, intenta nuevamente.",
      })
    }
  }, [])

  const handleSuccess = useCallback((message: string) => {
    toast.success("Éxito", {
      description: message,
    })
  }, [])

  return {
    handleError,
    handleSuccess,
  }
}
