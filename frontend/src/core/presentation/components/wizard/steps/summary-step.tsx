"use client"

import { WizardNavigation } from "../wizar-navigation"
import type { InstitutionStepData, SchoolData, UserData } from "@/core/presentation/hooks/use-institutions-wizar"
import type { Region } from "@/shared/types/location.types"

interface SummaryStepProps {
  institutionData: InstitutionStepData
  schools: SchoolData[]
  users: UserData[]
  regions: Region[]
  onSubmit: () => void
  onPrev: () => void
  isLoading: boolean
}

export function SummaryStep({
  institutionData,
  schools,
  users,
  regions,
  onSubmit,
  onPrev,
  isLoading,
}: SummaryStepProps) {
  const getRegionName = (regionId: number) => {
    return regions.find((r) => r.id === regionId)?.name || ""
  }

  const getCommuneName = (regionId: number, communeId: number) => {
    const region = regions.find((r) => r.id === regionId)
    return region?.communes.find((c) => c.id === communeId)?.name || ""
  }

  const getAssignedSchoolNames = (assignedSchools: string[]) => {
    return assignedSchools.map((schoolId) => schools.find((s) => s.id === schoolId)?.name).filter(Boolean)
  }

  return (
    <div className="w-full">
      <div className="bg-white p-8 rounded-lg shadow-sm">
        <div className="space-y-8">
          {/* Cliente */}
          <div>
            <h3 className="font-semibold text-lg mb-4 border-l-4 border-orange-500 pl-4">Cliente</h3>
            <div className="ml-8 space-y-2 text-sm">
              <p className="font-semibold">{institutionData.name}</p>
              <div className="ml-4 space-y-1 text-gray-600">
                <p>
                  <strong>RUT:</strong> {institutionData.rut}
                </p>
                <p>
                  <strong>Región:</strong> {getRegionName(institutionData.region_id)}
                </p>
                <p>
                  <strong>Comuna:</strong> {getCommuneName(institutionData.region_id, institutionData.commune_id)}
                </p>
                <p>
                  <strong>Dirección:</strong> {institutionData.address}
                </p>
                {institutionData.phone && (
                  <p>
                    <strong>Teléfono:</strong> {institutionData.phone}
                  </p>
                )}
                <p>
                  <strong>Fecha inicio:</strong> {institutionData.start_date}
                </p>
              </div>
            </div>
          </div>

          {/* Colegios */}
          {schools.length > 0 && (
            <div>
              <h3 className="font-semibold text-lg mb-4 border-l-4 border-orange-500 pl-4">Colegios</h3>
              {schools.map((school) => (
                <div key={school.id} className="ml-8 mb-6 space-y-2 text-sm">
                  <p className="font-semibold">{school.name}</p>
                  <div className="ml-4 space-y-1 text-gray-600">
                    <p>
                      <strong>RUT:</strong> {school.rut}
                    </p>
                    <p>
                      <strong>Región:</strong> {getRegionName(school.region_id)}
                    </p>
                    <p>
                      <strong>Comuna:</strong> {getCommuneName(school.region_id, school.commune_id)}
                    </p>
                    <p>
                      <strong>Dirección:</strong> {school.address}
                    </p>
                    {school.phone && (
                      <p>
                        <strong>Teléfono:</strong> {school.phone}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Usuarios */}
          {users.length > 0 && (
            <div>
              <h3 className="font-semibold text-lg mb-4 border-l-4 border-orange-500 pl-4">Usuarios</h3>
              {users.map((user) => (
                <div key={user.id} className="ml-8 mb-6 space-y-2 text-sm">
                  <p className="font-semibold">
                    {user.first_name} {user.last_name}
                  </p>
                  <div className="ml-4 space-y-1 text-gray-600">
                    <p>
                      <strong>RUT:</strong> {user.rut}
                    </p>
                    {user.phone && (
                      <p>
                        <strong>Teléfono:</strong> {user.phone}
                      </p>
                    )}
                    <p>
                      <strong>Correo:</strong> {user.email}
                    </p>
                    {user.assigned_schools.length > 0 && (
                      <p>
                        <strong>Colegios asignados:</strong> {getAssignedSchoolNames(user.assigned_schools).join(", ")}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="mt-auto mb-36 pt-8">
        <WizardNavigation showPrev showSubmit onPrev={onPrev} onSubmit={onSubmit} isLoading={isLoading} />
      </div>
    </div>
  )
}
