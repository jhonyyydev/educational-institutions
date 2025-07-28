"use client"

import { useState } from "react"
import { apiClient } from "@/core/infrastructure/api/api-client"

export function useRutValidation() {
  const [validatingSchoolRut, setValidatingSchoolRut] = useState(false)
  const [validatingUserRut, setValidatingUserRut] = useState(false)

  const validateSchoolRut = async (rut: string): Promise<boolean> => {
    if (!rut || rut.length < 8) return true // No validar RUTs incompletos

    try {
      setValidatingSchoolRut(true)
      const encodedRut = encodeURIComponent(rut)
      const response = await apiClient.get<{ available: boolean }>(`/schools/validate-rut?rut=${encodedRut}`)
      return response.available
    } catch (error) {
      console.error("Error validating school RUT:", error)
      return true
    } finally {
      setValidatingSchoolRut(false)
    }
  }

  const validateUserRut = async (rut: string): Promise<boolean> => {
    if (!rut || rut.length < 8) return true // No validar RUTs incompletos

    try {
      setValidatingUserRut(true)
      // Codificar el RUT para la URL
      const encodedRut = encodeURIComponent(rut)
      const response = await apiClient.get<{ available: boolean }>(`/users/validate-rut?rut=${encodedRut}`)
      return response.available
    } catch (error) {
      console.error("Error validating user RUT:", error)
      // En caso de error, permitir continuar (no bloquear el formulario)
      return true
    } finally {
      setValidatingUserRut(false)
    }
  }

  return {
    validateSchoolRut,
    validateUserRut,
    validatingSchoolRut,
    validatingUserRut,
  }
}
