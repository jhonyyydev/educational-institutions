// DTOs para autenticación
export interface LoginDTO {
  email: string
  password: string
}

export interface User {
  id: number
  first_name: string
  last_name: string
  email: string
  roles: Role[]
}

export interface Role {
  name: string
  permissions: Permission[]
}

export interface Permission {
  name: string
}

export interface LoginResponse {
  user: User
  token: string
  message: string
}

export interface LogoutResponse {
  message: string
}
