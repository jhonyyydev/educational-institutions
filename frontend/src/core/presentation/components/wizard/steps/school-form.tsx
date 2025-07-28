"use client"

import { useEffect, useState } from "react"
import { FormField, TextInput, SelectInput, RutInput } from "../../forms/form-field"
import { WizardNavigation } from "../wizar-navigation"
import type { Region, Commune } from "@/shared/types/location.types"

interface SchoolFormProps {
  form: any
  regions: Region[]
  getCommunes: (regionId: number) => Commune[]
  isEditing: boolean
  onSubmit: (data: any) => void
  onCancel: () => void
  onRutValidation: (rut: string) => void
  validatingRut: boolean
}

export function SchoolForm({
  form,
  regions,
  getCommunes,
  isEditing,
  onSubmit,
  onCancel,
  onRutValidation,
  validatingRut,
}: SchoolFormProps) {
  const [selectedRegion, setSelectedRegion] = useState<number>(0)
  const [selectedCommune, setSelectedCommune] = useState<number>(0)

  useEffect(() => {
    const regionId = form.getValues("region_id")
    const communeId = form.getValues("commune_id")
    if (regionId) {
      setSelectedRegion(regionId)
    }
    if (communeId) {
      setSelectedCommune(communeId)
    }
  }, [form])

  const regionOptions = regions.map((region) => ({
    value: region.id.toString(),
    label: region.name,
  }))

  const communeOptions = getCommunes(selectedRegion).map((commune) => ({
    value: commune.id.toString(),
    label: commune.name,
  }))

  const handleSubmit = () => {
    form.handleSubmit(onSubmit)()
  }

  return (
    <div className="w-full min-h-screen flex flex-col">
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex-1 flex flex-col">
        <div className="flex-1 space-y-6">
          {/* Primera fila: Nombre y RUT */}
          <div className="grid grid-cols-2 gap-6">
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

          {/* Segunda fila: Región, Comuna y Dirección */}
          <div className="grid grid-cols-3 gap-6">
            <FormField label="Región" required error={form.formState.errors.region_id?.message}>
              <SelectInput
                placeholder="Seleccionar región"
                value={selectedRegion > 0 ? selectedRegion.toString() : ""}
                options={regionOptions}
                onValueChange={(value) => {
                  const regionId = Number.parseInt(value)
                  setSelectedRegion(regionId)
                  setSelectedCommune(0)
                  form.setValue("region_id", regionId)
                  form.setValue("commune_id", 0)
                  form.clearErrors("region_id")
                }}
              />
            </FormField>

            <FormField label="Comuna" required error={form.formState.errors.commune_id?.message}>
              <SelectInput
                placeholder="Seleccionar comuna"
                value={selectedCommune > 0 ? selectedCommune.toString() : ""}
                options={communeOptions}
                disabled={!selectedRegion}
                onValueChange={(value) => {
                  const communeId = Number.parseInt(value)
                  setSelectedCommune(communeId)
                  form.setValue("commune_id", communeId)
                  form.clearErrors("commune_id")
                }}
              />
            </FormField>

            <FormField label="Dirección" required error={form.formState.errors.address?.message}>
              <TextInput placeholder="Dirección completa" register={form.register("address")} />
            </FormField>
          </div>

          {/* Tercera fila: Teléfono */}
          <div className="grid grid-cols-3 gap-6">
            <FormField label="Teléfono">
              <TextInput placeholder="+56 9 1234 5678" register={form.register("phone")} />
            </FormField>

            {/* Espacios vacíos para mantener la estructura */}
            <div></div>
            <div></div>
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
          />
        </div>
      </form>
    </div>
  )
}
