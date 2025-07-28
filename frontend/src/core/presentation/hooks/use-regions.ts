"use client"

import { useQuery } from "@tanstack/react-query"
import type { RegionsResponse } from "@/shared/types/location.types"
import { apiClient } from "@/core/infrastructure/api/api-client"
import type { ApiError } from "@/shared/types/api.types"

export function useRegions() {
  return useQuery<RegionsResponse, ApiError>({
    queryKey: ["regions"],
    queryFn: async () => {
      return apiClient.get<RegionsResponse>("/regions")
    },
    staleTime: 30 * 60 * 1000, // 30 minutos - los datos de regiones no cambian frecuentemente
    retry: (failureCount: number, error: ApiError) => {
      if (error.status === 401 || error.status === 403) {
        return false
      }
      return failureCount < 3
    },
  })
}
