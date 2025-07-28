"use client"

import { useState } from "react"
import type { UseFormReturn } from "react-hook-form"
import { FormField, TextInput, RutInput } from "../../forms/form-field"
import { WizardNavigation } from "../wizar-navigation"
import { Label } from "@/components/ui/label"
import type { SchoolData } from "@/core/presentation/hooks/use-institutions-wizar"
import type { UserFormData } from "@/shared/utils/validation"

interface UserFormProps {
  form: UseFormReturn<UserFormData>
  schools: SchoolData[]
  isEditing: boolean
  onSubmit: (data: UserFormData) => void
  onCancel: () => void
  onRutValidation: (rut: string) => void
  validatingRut: boolean
}

export function UserForm({
  form,
  schools,
  isEditing,
  onSubmit,
  onCancel,
  onRutValidation,
  validatingRut,
}: UserFormProps) {
  const [selectedSchools, setSelectedSchools] = useState<string[]>(form.getValues("assigned_schools") || [])

  const hasRutError = !!form.formState.errors.rut
  const isFormInvalid = !form.formState.isValid
  const isSubmitDisabled = validatingRut || hasRutError || isFormInvalid

  const handleSchoolToggle = (schoolId: string) => {
    const newSelection = selectedSchools.includes(schoolId)
      ? selectedSchools.filter((id) => id !== schoolId)
      : [...selectedSchools, schoolId]

    setSelectedSchools(newSelection)
    form.setValue("assigned_schools", newSelection)
  }

  const handleSubmit = () => {
    form.handleSubmit(onSubmit)()
  }

  return (
    <div className="w-full min-h-screen flex flex-col">
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex-1 flex flex-col">
        <div className="flex-1 space-y-6">
          {/* Primera fila: Nombre y Apellido */}
          <div className="grid grid-cols-2 gap-6">
            <FormField label="Nombre" required error={form.formState.errors.first_name?.message}>
              <TextInput placeholder="Nombre" register={form.register("first_name")} />
            </FormField>

            <FormField label="Apellido" required error={form.formState.errors.last_name?.message}>
              <TextInput placeholder="Apellido" register={form.register("last_name")} />
            </FormField>
          </div>

          {/* Segunda fila: RUT, Teléfono y Correo */}
          <div className="grid grid-cols-3 gap-6">
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

            <FormField label="Correo" required error={form.formState.errors.email?.message}>
              <TextInput type="email" placeholder="correo@ejemplo.com" register={form.register("email")} />
            </FormField>
          </div>

          {/* Tercera fila: Colegios asignados */}
          <div className="grid grid-cols-1 gap-6">
            <div>
              <Label className="text-sm font-medium text-gray-700 mb-2 block">Colegios asignados</Label>
              <div className="mt-2 space-y-2 max-h-48 overflow-y-auto border border-gray-300 rounded p-4 bg-white">
                {schools.length > 0 ? (
                  schools.map((school) => (
                    <label
                      key={school.id}
                      className="flex items-center space-x-3 cursor-pointer p-2 hover:bg-gray-50 rounded"
                    >
                      <input
                        type="checkbox"
                        checked={selectedSchools.includes(school.id)}
                        onChange={() => handleSchoolToggle(school.id)}
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                      <span className="text-sm font-medium">{school.name}</span>
                      <span className="text-xs text-gray-500">({school.rut})</span>
                    </label>
                  ))
                ) : (
                  <p className="text-sm text-gray-500 text-center py-4">
                    No hay colegios disponibles. Agrega colegios en el paso anterior.
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Botones en la parte inferior */}
        <div className="mt-auto mb-36 pt-8">
          <WizardNavigation
            showCancel
            showSubmit
            onCancel={onCancel}
            onSubmit={handleSubmit}
            submitLabel={isEditing ? "Actualizar" : "Agregar"}
            submitDisabled={isSubmitDisabled} // Agregar esta prop
          />
        </div>
      </form>
    </div>
  )
}
