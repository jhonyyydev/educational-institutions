import type { InstitutionRepository } from "../repositories/institution.repository"
import type {
  Institution,
  InstitutionsResponse,
  CreateInstitutionDTO,
  SearchParams,
} from "@/shared/types/institution.types"

export class InstitutionUseCases {
  constructor(private institutionRepository: InstitutionRepository) {}

  async getInstitutions(params?: SearchParams): Promise<InstitutionsResponse> {
    try {
      return await this.institutionRepository.getInstitutions(params)
    } catch (error) {
      throw error
    }
  }

  async createInstitution(data: CreateInstitutionDTO): Promise<{ message: string; data: Institution }> {
    try {
      return await this.institutionRepository.createInstitution(data)
    } catch (error) {
      throw error
    }
  }

  getStatusColor(status: string): string {
    switch (status.toLowerCase()) {
      case "aceptado":
        return "status-accepted"
      case "en proceso":
        return "status-process"
      case "rechazado":
        return "status-rejected"
      default:
        return "status-process"
    }
  }

  formatInstitutionForDisplay(institution: Institution) {
    return {
      ...institution,
      full_address: `${institution.address}, ${institution.commune.name}, ${institution.region.name}`,
      status_display: this.getStatusColor("aceptado"), // Por ahora hardcodeado, se puede mejorar
    }
  }
}
