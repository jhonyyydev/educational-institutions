// Tipos para manejo de API
export interface ApiError {
  message: string
  errors?: Record<string, string[]>
  status: number
}

export interface PaginationParams {
  page?: number
  per_page?: number
}

export interface SearchParams extends PaginationParams {
  search?: string
  region_id?: number
  commune_id?: number
}
