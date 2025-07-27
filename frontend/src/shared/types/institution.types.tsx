// DTOs para instituciones
export interface Institution {
  id: number
  name: string
  rut: string
  address: string
  phone: string | null
  start_date: string
  commune: Commune
  region: Region
  responsible: ResponsibleUser
  schools_count?: number
  created_at: string
  updated_at: string
}

export interface Commune {
  id: number
  name: string
}

export interface Region {
  id: number
  name: string
}

export interface ResponsibleUser {
  id: number
  full_name: string
  email: string
}

export interface InstitutionsResponse {
  data: Institution[]
  meta: {
    total: number
    per_page: number
    current_page: number
    last_page: number
  }
}

export interface CreateInstitutionDTO {
  name: string
  rut: string
  commune_id: number
  address: string
  phone: string | null
  start_date: string
  responsible_id: number
  schools: CreateSchoolDTO[]
  users: CreateUserDTO[]
  user_school_assignments: UserSchoolAssignmentDTO[]
}

export interface CreateSchoolDTO {
  name: string
  rut: string
  commune_id: number
  address: string
  phone: string | null
}

export interface CreateUserDTO {
  first_name: string
  last_name: string
  rut: string
  phone: string | null
  email: string
  password: string
  password_confirmation: string
  role?: string
}

export interface UserSchoolAssignmentDTO {
  user_rut: string
  school_rut: string
}

// Parámetros de búsqueda y paginación
export interface SearchParams {
  page?: number
  per_page?: number
  search?: string
  region_id?: number
  commune_id?: number
}
