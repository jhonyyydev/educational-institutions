"use client"

import { useState } from "react"
import { apiClient } from "@/core/infrastructure/api/api-client"

interface RutValidationResponse {
  valid: boolean
  message?: string
  institution_name?: string
  institution_names?: string[]
}

export function useRutValidation() {
  const [validatingSchoolRut, setValidatingSchoolRut] = useState(false)
  const [validatingUserRut, setValidatingUserRut] = useState(false)

  const validateSchoolRut = async (rut: string): Promise<boolean> => {
    if (!rut || rut.length < 8) return true // No validar RUTs incompletos

    try {
      setValidatingSchoolRut(true)
      const encodedRut = encodeURIComponent(rut)
      const response = await apiClient.get<RutValidationResponse>(
        `/schools/validate-rut?rut=${encodedRut}`
      )

      // Si valid es true, el RUT está disponible (NO existe)
      return response.valid
    } catch (error) {
      return true
    } finally {
      setValidatingSchoolRut(false)
    }
  }

  const validateUserRut = async (rut: string): Promise<boolean> => {
    if (!rut || rut.length < 8) return true // No validar RUTs incompletos

    try {
      setValidatingUserRut(true)
      const encodedRut = encodeURIComponent(rut)
      const response = await apiClient.get<RutValidationResponse>(
        `/users/validate-rut?rut=${encodedRut}`
      )

      // Si valid es true, el RUT está disponible (NO existe)
      return response.valid
    } catch (error) {
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