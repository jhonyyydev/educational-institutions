import type { InstitutionRepository } from "@/core/domain/repositories/institution.repository"
import type {
  Institution,
  InstitutionsResponse,
  CreateInstitutionDTO,
  SearchParams,
} from "@/shared/types/institution.types"
import { API_ENDPOINTS } from "@/shared/utils/constants"
import { apiClient } from "../api/api-client"

export class InstitutionRepositoryImpl implements InstitutionRepository {
  async getInstitutions(params?: SearchParams): Promise<InstitutionsResponse> {
    return apiClient.get<InstitutionsResponse>(API_ENDPOINTS.INSTITUTIONS, params)
  }

  async createInstitution(data: CreateInstitutionDTO): Promise<{ message: string; data: Institution }> {
    return apiClient.post<{ message: string; data: Institution }>(API_ENDPOINTS.INSTITUTIONS, data)
  }
}
