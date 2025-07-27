import { z } from "zod"

// Validación de RUT chileno
export const validateRUT = (rut: string): boolean => {
  if (!rut) return false

  const cleanRUT = rut.replace(/[^0-9kK]/g, "")
  if (cleanRUT.length < 8 || cleanRUT.length > 9) return false

  const body = cleanRUT.slice(0, -1)
  const dv = cleanRUT.slice(-1).toUpperCase()

  let sum = 0
  let multiplier = 2

  for (let i = body.length - 1; i >= 0; i--) {
    sum += Number.parseInt(body[i]) * multiplier
    multiplier = multiplier === 7 ? 2 : multiplier + 1
  }

  const remainder = sum % 11
  const calculatedDV = remainder < 2 ? remainder.toString() : remainder === 10 ? "K" : (11 - remainder).toString()

  return dv === calculatedDV
}

// Esquemas de validación con Zod
export const loginSchema = z.object({
  email: z.string().email("Email inválido").min(1, "Email es requerido"),
  password: z.string().min(6, "La contraseña debe tener al menos 6 caracteres"),
})

export const institutionSchema = z.object({
  name: z.string().min(1, "Nombre es requerido"),
  rut: z.string().refine(validateRUT, "RUT inválido"),
  commune_id: z.number().min(1, "Comuna es requerida"),
  address: z.string().min(1, "Dirección es requerida"),
  phone: z.string().nullable(),
  start_date: z.string().min(1, "Fecha de inicio es requerida"),
  responsible_id: z.number().min(1, "Responsable es requerido"),
})

export type LoginFormData = z.infer<typeof loginSchema>
export type InstitutionFormData = z.infer<typeof institutionSchema>
