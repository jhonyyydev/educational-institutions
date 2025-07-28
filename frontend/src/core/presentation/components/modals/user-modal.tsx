"use client"

import { useState } from "react"
import type { UseFormReturn } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { X } from "lucide-react"
import { FormField, TextInput, RutInput } from "../forms/form-field"
import type { SchoolData } from "@/core/presentation/hooks/use-institutions-wizar"
import type { UserFormData } from "@/shared/utils/validation"

interface UserModalProps {
  form: UseFormReturn<UserFormData>
  schools: SchoolData[]
  isEditing: boolean
  onSubmit: (data: UserFormData) => void
  onClose: () => void
  onRutValidation: (rut: string) => void
  validatingRut: boolean
}

export function UserModal({
  form,
  schools,
  isEditing,
  onSubmit,
  onClose,
  onRutValidation,
  validatingRut,
}: UserModalProps) {
  const [selectedSchools, setSelectedSchools] = useState<string[]>([])

  const handleSchoolToggle = (schoolId: string) => {
    const newSelection = selectedSchools.includes(schoolId)
      ? selectedSchools.filter((id) => id !== schoolId)
      : [...selectedSchools, schoolId]

    setSelectedSchools(newSelection)
    form.setValue("assigned_schools", newSelection)
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">{isEditing ? "Editar Usuario" : "Agregar Usuario"}</h2>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="w-4 h-4" />
          </Button>
        </div>

        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <FormField label="Nombre" required error={form.formState.errors.first_name?.message}>
              <TextInput placeholder="Nombre" register={form.register("first_name")} />
            </FormField>

            <FormField label="Apellido" required error={form.formState.errors.last_name?.message}>
              <TextInput placeholder="Apellido" register={form.register("last_name")} />
            </FormField>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <FormField
              label="RUT"
              required
              error={form.formState.errors.rut?.message}
              helpText="Formato: 12345678-9 (sin puntos)"
            >
              <RutInput
                placeholder="12345678-9"
                register={form.register("rut")}
                onBlur={onRutValidation}
                validating={validatingRut}
              />
            </FormField>

            <FormField label="Teléfono">
              <TextInput placeholder="+56 9 1234 5678" register={form.register("phone")} />
            </FormField>
          </div>

          <FormField label="Correo" required error={form.formState.errors.email?.message}>
            <TextInput type="email" placeholder="correo@ejemplo.com" register={form.register("email")} />
          </FormField>

          <div>
            <Label className="text-sm font-medium text-gray-700 mb-2 block">Colegios asignados</Label>
            <div className="mt-2 space-y-2 max-h-32 overflow-y-auto border border-gray-300 rounded p-3">
              {schools.length > 0 ? (
                schools.map((school) => (
                  <label key={school.id} className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={selectedSchools.includes(school.id)}
                      onChange={() => handleSchoolToggle(school.id)}
                      className="rounded border-gray-300"
                    />
                    <span className="text-sm">{school.name}</span>
                  </label>
                ))
              ) : (
                <p className="text-sm text-gray-500">
                  No hay colegios disponibles. Agrega colegios en el paso anterior.
                </p>
              )}
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <Button
              type="button"
              onClick={onClose}
              className="px-6 py-2 bg-gray-200 text-gray-700 border border-gray-300 rounded hover:bg-gray-300"
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              className="px-6 py-2 text-white rounded hover:opacity-90"
              style={{ backgroundColor: "#12172f" }}
            >
              {isEditing ? "Actualizar" : "Agregar"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
