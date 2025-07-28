"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { institutionStepSchema, schoolSchema, userSchema } from "@/shared/utils/validation"
import type { InstitutionFormData, SchoolFormData, UserFormData } from "@/shared/utils/validation"

export type InstitutionStepData = InstitutionFormData
export type SchoolData = SchoolFormData & { id: string }
export type UserData = UserFormData & { id: string }

export function useInstitutionWizard() {
  const [currentStep, setCurrentStep] = useState(1)
  const [institutionData, setInstitutionData] = useState<InstitutionStepData>({
    name: "",
    rut: "",
    region_id: 0,
    commune_id: 0,
    address: "",
    phone: "",
    start_date: "",
  })
  const [schools, setSchools] = useState<SchoolData[]>([])
  const [users, setUsers] = useState<UserData[]>([])

  const institutionForm = useForm<InstitutionStepData>({
    resolver: zodResolver(institutionStepSchema),
    defaultValues: institutionData,
  })

  const schoolForm = useForm<SchoolFormData>({
    resolver: zodResolver(schoolSchema),
    defaultValues: {
      name: "",
      rut: "",
      region_id: 0,
      commune_id: 0,
      address: "",
      phone: "",
    },
  })

  const userForm = useForm<UserFormData>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      first_name: "",
      last_name: "",
      rut: "",
      phone: "",
      email: "",
      assigned_schools: [],
    },
  })

  const goToStep = (step: number) => {
    if (step === 1) {
      setCurrentStep(step)
      return
    }

    if (currentStep === 1) {
      institutionForm.handleSubmit((data) => {
        setInstitutionData(data)
        setCurrentStep(step)
      })()
    } else {
      setCurrentStep(step)
    }
  }

  const nextStep = () => {
    if (currentStep < 4) {
      goToStep(currentStep + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  return {
    currentStep,
    institutionData,
    schools,
    users,
    institutionForm,
    schoolForm,
    userForm,
    setInstitutionData,
    setSchools,
    setUsers,
    goToStep,
    nextStep,
    prevStep,
  }
}
