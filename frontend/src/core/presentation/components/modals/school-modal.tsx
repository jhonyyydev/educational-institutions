"use client"

import { useState } from "react"
import type { UseFormReturn } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { X } from "lucide-react"
import { FormField, TextInput, SelectInput, RutInput } from "../forms/form-field"
import type { Region, Commune } from "@/shared/types/location.types"
import type { SchoolFormData } from "@/shared/utils/validation"

interface SchoolModalProps {
  form: UseFormReturn<SchoolFormData>
  regions: Region[]
  getCommunes: (regionId: number) => Commune[]
  isEditing: boolean
  onSubmit: (data: SchoolFormData) => void
  onClose: () => void
  onRutValidation: (rut: string) => void
  validatingRut: boolean
}

export function SchoolModal({
  form,
  regions,
  getCommunes,
  isEditing,
  onSubmit,
  onClose,
  onRutValidation,
  validatingRut,
}: SchoolModalProps) {
  const [selectedRegion, setSelectedRegion] = useState<number>(0)

  const regionOptions = regions.map((region) => ({
    value: region.id.toString(),
    label: region.name,
  }))

  const communeOptions = getCommunes(selectedRegion).map((commune) => ({
    value: commune.id.toString(),
    label: commune.name,
  }))

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">{isEditing ? "Editar Colegio" : "Agregar Colegio"}</h2>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="w-4 h-4" />
          </Button>
        </div>

        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <FormField label="Nombre" required error={form.formState.errors.name?.message}>
              <TextInput placeholder="Nombre del colegio" register={form.register("name")} />
            </FormField>

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
          </div>

          <div className="grid grid-cols-2 gap-4">
            <FormField label="Región" required error={form.formState.errors.region_id?.message}>
              <SelectInput
                placeholder="Seleccionar región"
                options={regionOptions}
                onValueChange={(value) => {
                  const regionId = Number.parseInt(value)
                  setSelectedRegion(regionId)
                  form.setValue("region_id", regionId)
                  form.setValue("commune_id", 0)
                }}
              />
            </FormField>

            <FormField label="Comuna" required error={form.formState.errors.commune_id?.message}>
              <SelectInput
                placeholder="Seleccionar comuna"
                options={communeOptions}
                disabled={!selectedRegion}
                onValueChange={(value) => form.setValue("commune_id", Number.parseInt(value))}
              />
            </FormField>
          </div>

          <FormField label="Dirección" required error={form.formState.errors.address?.message}>
            <TextInput placeholder="Dirección completa" register={form.register("address")} />
          </FormField>

          <FormField label="Teléfono">
            <TextInput placeholder="+56 9 1234 5678" register={form.register("phone")} />
          </FormField>

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
