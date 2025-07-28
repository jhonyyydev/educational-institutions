"use client"

import { Button } from "@/components/ui/button"
import { WizardNavigation } from "../wizar-navigation"
import { Trash2, Edit } from "lucide-react"
import { UserForm } from "./user-form"
import type { UserData, SchoolData } from "@/core/presentation/hooks/use-institutions-wizar"
import type { UseFormReturn } from "react-hook-form"

interface UsersStepProps {
  users: UserData[]
  schools: SchoolData[]
  userForm: UseFormReturn<any>
  showingForm: boolean
  isEditing: boolean
  onAddUser: () => void
  onEditUser: (user: UserData) => void
  onDeleteUser: (userId: string) => void
  onSubmitUser: (data: any) => void
  onCancelForm: () => void
  onNext: () => void
  onPrev: () => void
  onRutValidation: (rut: string) => void
  validatingRut: boolean
}

export function UsersStep({
  users,
  schools,
  userForm,
  showingForm,
  isEditing,
  onAddUser,
  onEditUser,
  onDeleteUser,
  onSubmitUser,
  onCancelForm,
  onNext,
  onPrev,
  onRutValidation,
  validatingRut,
}: UsersStepProps) {
  const getAssignedSchoolNames = (assignedSchools: string[]) => {
    return assignedSchools
      .map((schoolId) => schools.find((s) => s.id === schoolId)?.name)
      .filter(Boolean)
      .join(", ")
  }

  if (showingForm) {
    return (
      <UserForm
        form={userForm}
        schools={schools}
        isEditing={isEditing}
        onSubmit={onSubmitUser}
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
            onClick={onAddUser}
            className="px-4 py-2 text-white rounded text-sm"
            style={{ backgroundColor: "#f97316" }}
          >
            + Agregar usuario
          </Button>
        </div>

        {/* Tabla */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          {users.length > 0 ? (
            <table className="w-full">
              <thead style={{ backgroundColor: "#e5e5e5" }}>
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-700 border-r border-gray-300">ID</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-700 border-r border-gray-300">
                    Usuario
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-700 border-r border-gray-300">
                    RUT
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-700 border-r border-gray-300">
                    Correo
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-700 border-r border-gray-300">
                    Colegio asignado
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user, index) => (
                  <tr key={user.id} className="border-t border-gray-200">
                    <td className="px-4 py-3 text-sm text-gray-900 border-r border-gray-200">{index + 1}</td>
                    <td className="px-4 py-3 text-sm text-gray-900 border-r border-gray-200">
                      {`${user.first_name} ${user.last_name}`}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-900 border-r border-gray-200">{user.rut}</td>
                    <td className="px-4 py-3 text-sm text-gray-900 border-r border-gray-200">{user.email}</td>
                    <td className="px-4 py-3 text-sm text-gray-900 border-r border-gray-200">
                      {getAssignedSchoolNames(user.assigned_schools)}
                    </td>
                    <td className="px-4 py-3 text-sm">
                      <div className="flex gap-2">
                        <button onClick={() => onEditUser(user)} className="p-1 text-gray-600 hover:text-blue-600">
                          <Edit className="w-4 h-4" />
                        </button>
                        <button onClick={() => onDeleteUser(user.id)} className="p-1 text-gray-600 hover:text-red-600">
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
              No hay usuarios agregados. Haz clic en "Agregar usuario" para comenzar.
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
