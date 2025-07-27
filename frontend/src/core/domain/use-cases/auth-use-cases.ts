import type { AuthRepository } from "../repositories/auth-repository"
import type { LoginDTO, LoginResponse, User } from "@/shared/types/auth.types"
import { STORAGE_KEYS } from "@/shared/utils/constants"

export class AuthUseCases {
  constructor(private authRepository: AuthRepository) {}

  async login(credentials: LoginDTO): Promise<LoginResponse> {
    try {
      const response = await this.authRepository.login(credentials)

      // Guardar token y usuario en localStorage
      if (typeof window !== "undefined") {
        localStorage.setItem(STORAGE_KEYS.TOKEN, response.token)
        localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(response.user))
      }

      return response
    } catch (error) {
      throw error
    }
  }

  async logout(): Promise<void> {
    try {
      await this.authRepository.logout()
    } catch (error) {
      // Continuar con logout local incluso si falla el servidor
      console.error("Error during server logout:", error)
    } finally {
      // Limpiar datos locales
      if (typeof window !== "undefined") {
        localStorage.removeItem(STORAGE_KEYS.TOKEN)
        localStorage.removeItem(STORAGE_KEYS.USER)
      }
    }
  }

  getCurrentUser(): User | null {
    if (typeof window === "undefined") return null

    try {
      const userData = localStorage.getItem(STORAGE_KEYS.USER)
      return userData ? JSON.parse(userData) : null
    } catch (error) {
      console.error("Error parsing user data:", error)
      return null
    }
  }

  getToken(): string | null {
    if (typeof window === "undefined") return null
    return localStorage.getItem(STORAGE_KEYS.TOKEN)
  }

  isAuthenticated(): boolean {
    return this.getToken() !== null && this.getCurrentUser() !== null
  }

  hasPermission(permission: string): boolean {
    const user = this.getCurrentUser()
    if (!user) return false

    return user.roles.some((role) => role.permissions.some((perm) => perm.name === permission))
  }
}
