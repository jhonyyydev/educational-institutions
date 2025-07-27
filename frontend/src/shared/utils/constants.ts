// Constantes de la aplicación - URLs para desarrollo local
export const API_BASE_URL = "http://127.0.0.1:8000/api"

export const API_ENDPOINTS = {
  LOGIN: "/login", // POST
  LOGOUT: "/logout", // POST
  INSTITUTIONS: "/institutions", // GET
} as const

export const STORAGE_KEYS = {
  TOKEN: "auth_token",
  USER: "user_data",
} as const

export const PERMISSIONS = {
  MANAGE_INSTITUTIONS: "gestionar-instituciones",
} as const

export const INSTITUTION_STATUS = {
  ACCEPTED: "Aceptado",
  IN_PROCESS: "En proceso",
  REJECTED: "Rechazado",
} as const
