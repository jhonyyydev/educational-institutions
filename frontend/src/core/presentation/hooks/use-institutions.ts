"use client"

import React from "react"
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import type { InstitutionsResponse, CreateInstitutionDTO, SearchParams } from "@/shared/types/institution.types"
import { InstitutionUseCases } from "@/core/domain/use-cases/institution-use-cases"
import { InstitutionRepositoryImpl } from "@/core/infrastructure/repositories/institution-repository-impl"
import type { ApiError } from "@/shared/types/api.types"

// Query keys
const QUERY_KEYS = {
  INSTITUTIONS: "institutions",
  INSTITUTION_LIST: (params?: SearchParams) => ["institutions", "list", params],
} as const

// Factory function para crear instancias
function createInstitutionUseCases() {
  return new InstitutionUseCases(new InstitutionRepositoryImpl())
}

export function useInstitutions(params?: SearchParams) {
  return useQuery<InstitutionsResponse, ApiError>({
    queryKey: QUERY_KEYS.INSTITUTION_LIST(params),
    queryFn: async () => {
      const institutionUseCases = createInstitutionUseCases()
      const result = await institutionUseCases.getInstitutions(params)
      return result
    },
    staleTime: 5 * 60 * 1000, // 5 minutos
    retry: (failureCount: number, error: ApiError) => {
      console.log(`🔄 Retry attempt ${failureCount} for institutions query`)
      // No reintentar en errores de autenticación o permisos
      if (error.status === 401 || error.status === 403) {
        return false
      }
      return failureCount < 3
    },
  })
}

export function useCreateInstitution() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: CreateInstitutionDTO) => {
      const institutionUseCases = createInstitutionUseCases()
      return institutionUseCases.createInstitution(data)
    },
    onSuccess: () => {
      // Invalidar y refrescar la lista de instituciones
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.INSTITUTIONS],
      })
    },
    onError: (error: ApiError) => {
      console.error("Error creating institution:", error)
    },
  })
}

// Hook para manejo de búsqueda y filtros
export function useInstitutionFilters() {
  const [filters, setFilters] = React.useState<SearchParams>({
    page: 1,
    per_page: 25, // Cambiar a 25 como en el diseño
  })

  const updateFilters = (newFilters: Partial<SearchParams>) => {
    setFilters((prev: SearchParams) => ({
      ...prev,
      ...newFilters,
      page: newFilters.page || 1, // Reset page when other filters change
    }))
  }

  const resetFilters = () => {
    setFilters({
      page: 1,
      per_page: 25,
    })
  }

  return {
    filters,
    updateFilters,
    resetFilters,
  }
}
