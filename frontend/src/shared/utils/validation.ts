import { z } from "zod"

// Validación simple de RUT chileno - solo formato
export const validateRUT = (rut: string): boolean => {
  if (!rut) return false

  // Limpiar el RUT: remover espacios
  const cleanRUT = rut.trim()

  // Verificar formato: 8 o 9 dígitos, guión, 1 dígito o K
  const rutRegex = /^\d{7,8}-[\dkK]$/

  return rutRegex.test(cleanRUT)
}

// Esquemas de validación con Zod
export const loginSchema = z.object({
  email: z.string().email("Email inválido").min(1, "Email es requerido"),
  password: z.string().min(6, "La contraseña debe tener al menos 6 caracteres"),
})

export const institutionStepSchema = z.object({
  name: z.string().min(1, "Nombre es requerido"),
  rut: z.string().refine(validateRUT, "Formato de RUT inválido. Use: 12345678-9"),
  region_id: z.number().min(1, "Región es requerida"),
  commune_id: z.number().min(1, "Comuna es requerida"),
  address: z.string().min(1, "Dirección es requerida"),
  phone: z.string().optional(),
  start_date: z.string().min(1, "Fecha de inicio es requerida"),
})

export const schoolSchema = z.object({
  name: z.string().min(1, "Nombre es requerido"),
  rut: z.string().refine(validateRUT, "Formato de RUT inválido. Use: 12345678-9"),
  region_id: z.number().min(1, "Región es requerida"),
  commune_id: z.number().min(1, "Comuna es requerida"),
  address: z.string().min(1, "Dirección es requerida"),
  phone: z.string().optional(),
})

export const userSchema = z.object({
  first_name: z.string().min(1, "Nombre es requerido"),
  last_name: z.string().min(1, "Apellido es requerido"),
  rut: z.string().refine(validateRUT, "Formato de RUT inválido. Use: 12345678-9"),
  phone: z.string().optional(),
  email: z.string().email("Email inválido"),
  assigned_schools: z.array(z.string()).min(0),
})

export type LoginFormData = z.infer<typeof loginSchema>
export type InstitutionFormData = z.infer<typeof institutionStepSchema>
export type SchoolFormData = z.infer<typeof schoolSchema>
export type UserFormData = z.infer<typeof userSchema>
