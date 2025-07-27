import type {
  Institution,
  InstitutionsResponse,
  CreateInstitutionDTO,
  SearchParams,
} from "@/shared/types/institution.types"

export interface InstitutionRepository {
  getInstitutions(params?: SearchParams): Promise<InstitutionsResponse>
  createInstitution(data: CreateInstitutionDTO): Promise<{ message: string; data: Institution }>
}
