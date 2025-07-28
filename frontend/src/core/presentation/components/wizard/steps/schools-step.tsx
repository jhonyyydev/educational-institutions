"use client"

import { Button } from "@/components/ui/button"
import { WizardNavigation } from "../wizar-navigation"
import { Trash2, Edit } from "lucide-react"
import { SchoolForm } from "./school-form"
import type { SchoolData } from "@/core/presentation/hooks/use-institutions-wizar"
import type { Region } from "@/shared/types/location.types"
import type { UseFormReturn } from "react-hook-form"
import type { SchoolFormData } from "@/shared/utils/validation"

interface SchoolsStepProps {
  schools: SchoolData[]
  regions: Region[]
  getCommunes: (regionId: number) => Array<{ id: number; name: string; code: string }>
  schoolForm: UseFormReturn<SchoolFormData>
  showingForm: boolean
  isEditing: boolean
  onAddSchool: () => void
  onEditSchool: (school: SchoolData) => void
  onDeleteSchool: (schoolId: string) => void
  onSubmitSchool: (data: SchoolFormData) => void
  onCancelForm: () => void
  onNext: () => void
  onPrev: () => void
  onRutValidation: (rut: string) => void
  validatingRut: boolean
}

export function SchoolsStep({
  schools,
  regions,
  getCommunes,
  schoolForm,
  showingForm,
  isEditing,
  onAddSchool,
  onEditSchool,
  onDeleteSchool,
  onSubmitSchool,
  onCancelForm,
  onNext,
  onPrev,
  onRutValidation,
  validatingRut,
}: SchoolsStepProps) {
  if (showingForm) {
    return (
      <SchoolForm
        form={schoolForm}
        regions={regions}
        getCommunes={getCommunes}
        isEditing={isEditing}
        onSubmit={onSubmitSchool}
        onCancel={onCancelForm}
        onRutValidation={onRutValidation}
        validatingRut={validatingRut}
      />
    )
  }

  return (
    <div className="w-full min-h-screen flex flex-col">
      <div className="flex-1">
        {/* Header con botón */}
        <div className="flex justify-end items-center mb-6">
          <Button
            onClick={onAddSchool}
            className="px-4 py-2 text-white rounded text-sm"
            style={{ backgroundColor: "#f97316" }}
          >
            + Agregar colegio
          </Button>
        </div>

        {/* Tabla */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          {schools.length > 0 ? (
            <table className="w-full">
              <thead style={{ backgroundColor: "#e5e5e5" }}>
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-700 border-r border-gray-300">ID</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-700 border-r border-gray-300">
                    Colegio
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-700 border-r border-gray-300">
                    RUT
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {schools.map((school, index) => (
                  <tr key={school.id} className="border-t border-gray-200">
                    <td className="px-4 py-3 text-sm text-gray-900 border-r border-gray-200">{index + 1}</td>
                    <td className="px-4 py-3 text-sm text-gray-900 border-r border-gray-200">{school.name}</td>
                    <td className="px-4 py-3 text-sm text-gray-900 border-r border-gray-200">{school.rut}</td>
                    <td className="px-4 py-3 text-sm">
                      <div className="flex gap-2">
                        <button onClick={() => onEditSchool(school)} className="p-1 text-gray-600 hover:text-blue-600">
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => onDeleteSchool(school.id)}
                          className="p-1 text-gray-600 hover:text-red-600"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="p-8 text-center text-gray-500">
              No hay colegios agregados. Haz clic en &quot;Agregar colegio&quot; para comenzar.
            </div>
          )}
        </div>
      </div>

      {/* Botones en la parte inferior */}
      <div className="mt-auto mb-36 pt-8">
        <WizardNavigation showPrev showNext onPrev={onPrev} onNext={onNext} />
      </div>
    </div>
  )
}
