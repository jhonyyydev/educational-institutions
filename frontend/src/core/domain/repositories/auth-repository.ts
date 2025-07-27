import type { LoginDTO, LoginResponse, LogoutResponse } from "@/shared/types/auth.types"

export interface AuthRepository {
  login(credentials: LoginDTO): Promise<LoginResponse>
  logout(): Promise<LogoutResponse>
}
