import type { AuthRepository } from "@/core/domain/repositories/auth-repository"
import type { LoginDTO, LoginResponse, LogoutResponse } from "@/shared/types/auth.types"
import { API_ENDPOINTS } from "@/shared/utils/constants"
import { apiClient } from "../api/api-client"

export class AuthRepositoryImpl implements AuthRepository {
  async login(credentials: LoginDTO): Promise<LoginResponse> {
    return apiClient.post<LoginResponse>(API_ENDPOINTS.LOGIN, credentials)
  }

  async logout(): Promise<LogoutResponse> {
    return apiClient.post<LogoutResponse>(API_ENDPOINTS.LOGOUT)
  }
}
