"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { LoadingSpinner } from "@/components/ui/loading-spinner"
import { useAuth } from "@/core/presentation/contexts/auth-context"
import { useRegions } from "@/core/presentation/hooks/use-regions"
import { useCreateInstitution } from "@/core/presentation/hooks/use-institutions"
import { useErrorHandler } from "@/core/presentation/hooks/use-error-handler"
import { useRutValidation } from "@/core/presentation/hooks/use-rut-validation"
import { useInstitutionWizard } from "@/core/presentation/hooks/use-institutions-wizar"
import { WizardTabs } from "@/core/presentation/components/wizard/wizar-tabs"
import { InstitutionStep } from "@/core/presentation/components/wizard/steps/institution-step"
import { SchoolsStep } from "@/core/presentation/components/wizard/steps/schools-step"
import { UsersStep } from "@/core/presentation/components/wizard/steps/user-step"
import { SummaryStep } from "@/core/presentation/components/wizard/steps/summary-step"
import type {
  CreateInstitutionDTO,
  CreateSchoolDTO,
  CreateUserDTO,
  UserSchoolAssignmentDTO,
} from "@/shared/types/institution.types"
import type { SchoolFormData, UserFormData } from "@/shared/utils/validation"

type SchoolData = SchoolFormData & { id: string }
type UserData = UserFormData & { id: string }

export default function NewInstitutionPage() {
  const router = useRouter()
  const { user, isAuthenticated, isLoading: authLoading } = useAuth()
  const { data: regionsData, isLoading: regionsLoading } = useRegions()
  const { mutate: createInstitution, isPending: isCreating } = useCreateInstitution()
  const { handleError, handleSuccess } = useErrorHandler()
  const { validateSchoolRut, validateUserRut, validatingSchoolRut, validatingUserRut } = useRutValidation()

  const {
    currentStep,
    institutionData,
    schools,
    users,
    institutionForm,
    schoolForm,
    userForm,
    setSchools,
    setUsers,
    goToStep,
    nextStep,
    prevStep,
  } = useInstitutionWizard()

  // Estados para formularios
  const [showSchoolForm, setShowSchoolForm] = useState(false)
  const [showUserForm, setShowUserForm] = useState(false)
  const [editingSchool, setEditingSchool] = useState<SchoolData | null>(null)
  const [editingUser, setEditingUser] = useState<UserData | null>(null)

  // Redirigir si no está autenticado
  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      router.push("/login")
    }
  }, [isAuthenticated, authLoading, router])

  // Sincronizar datos del formulario
  useEffect(() => {
    institutionForm.reset(institutionData)
  }, [institutionData, institutionForm])

  // Obtener comunas de la región seleccionada
  const getCommunes = (regionId: number) => {
    if (!regionsData?.data) return []
    const region = regionsData.data.find((r) => r.id === regionId)
    return region?.communes || []
  }

  // Validación de RUT
  const handleSchoolRutValidation = async (rut: string) => {
    if (!rut || rut.length < 8) return
    
    try {
      const isValid = await validateSchoolRut(rut)
      
      // Si isValid es FALSE, significa que el RUT YA EXISTE
      if (isValid === false) {
        schoolForm.setError("rut", { 
          type: "manual",
          message: "Este RUT ya está registrado" 
        })
      } else {
        // Si isValid es TRUE, el RUT está disponible
        schoolForm.clearErrors("rut")
      }
    } catch (error) {
      console.error("Error validating school RUT:", error)
      // En caso de error, limpiar para no bloquear
      schoolForm.clearErrors("rut")
    }
  }

  const handleUserRutValidation = async (rut: string) => {
    if (!rut || rut.length < 8) return
    
    try {
      const isValid = await validateUserRut(rut)
      
      // Si isValid es FALSE, significa que el RUT YA EXISTE
      if (isValid === false) {
        userForm.setError("rut", { 
          type: "manual",
          message: "Este RUT ya está registrado" 
        })
      } else {
        // Si isValid es TRUE, el RUT está disponible
        userForm.clearErrors("rut")
      }
    } catch (error) {
      console.error("Error validating user RUT:", error)
      // En caso de error, limpiar para no bloquear
      userForm.clearErrors("rut")
    }
  }

  // Manejo de colegios
  const handleAddSchool = () => {
    setEditingSchool(null)
    schoolForm.reset({ name: "", rut: "", region_id: 0, commune_id: 0, address: "", phone: "" })
    setShowSchoolForm(true)
  }

  const handleEditSchool = (school: SchoolData) => {
    setEditingSchool(school)
    schoolForm.reset(school)
    setShowSchoolForm(true)
  }

  const handleSubmitSchool = (data: SchoolFormData) => {
    const newSchool = { ...data, id: Date.now().toString() }
    if (editingSchool) {
      setSchools(schools.map((s) => (s.id === editingSchool.id ? { ...newSchool, id: editingSchool.id } : s)))
    } else {
      setSchools([...schools, newSchool])
    }
    setShowSchoolForm(false)
    setEditingSchool(null)
  }

  const handleCancelSchoolForm = () => {
    setShowSchoolForm(false)
    setEditingSchool(null)
    schoolForm.reset({ name: "", rut: "", region_id: 0, commune_id: 0, address: "", phone: "" })
  }

  const handleDeleteSchool = (schoolId: string) => {
    setSchools(schools.filter((s) => s.id !== schoolId))
    setUsers(
      users.map((user) => ({ ...user, assigned_schools: user.assigned_schools.filter((id) => id !== schoolId) })),
    )
  }

  // Manejo de usuarios
  const handleAddUser = () => {
    setEditingUser(null)
    userForm.reset({ first_name: "", last_name: "", rut: "", phone: "", email: "", assigned_schools: [] })
    setShowUserForm(true)
  }

  const handleEditUser = (user: UserData) => {
    setEditingUser(user)
    userForm.reset(user)
    setShowUserForm(true)
  }

  const handleSubmitUser = (data: UserFormData) => {
    const newUser = { ...data, id: Date.now().toString() }
    if (editingUser) {
      setUsers(users.map((u) => (u.id === editingUser.id ? { ...newUser, id: editingUser.id } : u)))
    } else {
      setUsers([...users, newUser])
    }
    setShowUserForm(false)
    setEditingUser(null)
  }

  const handleCancelUserForm = () => {
    setShowUserForm(false)
    setEditingUser(null)
    userForm.reset({ first_name: "", last_name: "", rut: "", phone: "", email: "", assigned_schools: [] })
  }

  const handleDeleteUser = (userId: string) => {
    setUsers(users.filter((u) => u.id !== userId))
  }

  // Construcción del payload final
  const buildPayload = (): CreateInstitutionDTO => {
    const schoolsPayload: CreateSchoolDTO[] = schools.map((school) => ({
      name: school.name,
      rut: school.rut,
      commune_id: school.commune_id,
      address: school.address,
      phone: school.phone || null,
    }))

    const usersPayload: CreateUserDTO[] = users.map((user) => ({
      first_name: user.first_name,
      last_name: user.last_name,
      rut: user.rut,
      phone: user.phone || null,
      email: user.email,
      password: "Password123!",
      password_confirmation: "Password123!",
      role: "docente",
    }))

    const assignmentsPayload: UserSchoolAssignmentDTO[] = []
    users.forEach((user) => {
      user.assigned_schools.forEach((schoolId) => {
        const school = schools.find((s) => s.id === schoolId)
        if (school) {
          assignmentsPayload.push({
            user_rut: user.rut,
            school_rut: school.rut,
          })
        }
      })
    })

    return {
      name: institutionData.name,
      rut: institutionData.rut,
      commune_id: institutionData.commune_id,
      address: institutionData.address,
      phone: institutionData.phone || null,
      start_date: institutionData.start_date,
      responsible_id: user?.id || 1,
      schools: schoolsPayload,
      users: usersPayload,
      user_school_assignments: assignmentsPayload,
    }
  }

  // Envío final
  const handleSubmit = () => {
    const payload = buildPayload()
    createInstitution(payload, {
      onSuccess: (response) => {
        handleSuccess(response.message)
        router.push("/dashboard")
      },
      onError: (error) => {
        handleError(error)
      },
    })
  }

  if (authLoading || regionsLoading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-64">
          <LoadingSpinner size="lg" />
        </div>
      </DashboardLayout>
    )
  }

  if (!isAuthenticated) {
    return null
  }

  return (
    <DashboardLayout>
      <div className="flex-1 flex flex-col h-screen" style={{ backgroundColor: "#f5f5f5" }}>
        <WizardTabs currentStep={currentStep} onStepClick={goToStep} />

        <div className="flex-1 p-8 overflow-hidden">
          {currentStep === 1 && (
            <InstitutionStep
              form={institutionForm}
              regions={regionsData?.data || []}
              getCommunes={getCommunes}
              institutionData={institutionData}
              onNext={nextStep}
              onCancel={() => router.push("/dashboard")}
            />
          )}

          {currentStep === 2 && (
            <SchoolsStep
              schools={schools}
              regions={regionsData?.data || []}
              getCommunes={getCommunes}
              schoolForm={schoolForm}
              showingForm={showSchoolForm}
              isEditing={!!editingSchool}
              onAddSchool={handleAddSchool}
              onEditSchool={handleEditSchool}
              onDeleteSchool={handleDeleteSchool}
              onSubmitSchool={handleSubmitSchool}
              onCancelForm={handleCancelSchoolForm}
              onNext={nextStep}
              onPrev={prevStep}
              onRutValidation={handleSchoolRutValidation}
              validatingRut={validatingSchoolRut}
            />
          )}

          {currentStep === 3 && (
            <UsersStep
              users={users}
              schools={schools}
              userForm={userForm}
              showingForm={showUserForm}
              isEditing={!!editingUser}
              onAddUser={handleAddUser}
              onEditUser={handleEditUser}
              onDeleteUser={handleDeleteUser}
              onSubmitUser={handleSubmitUser}
              onCancelForm={handleCancelUserForm}
              onNext={nextStep}
              onPrev={prevStep}
              onRutValidation={handleUserRutValidation}
              validatingRut={validatingUserRut}
            />
          )}

          {currentStep === 4 && (
            <SummaryStep
              institutionData={institutionData}
              schools={schools}
              users={users}
              regions={regionsData?.data || []}
              onSubmit={handleSubmit}
              onPrev={prevStep}
              isLoading={isCreating}
            />
          )}
        </div>
      </div>
    </DashboardLayout>
  )
}
