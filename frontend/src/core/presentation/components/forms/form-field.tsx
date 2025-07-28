"use client"

import type React from "react"
import type { UseFormRegisterReturn } from "react-hook-form"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Loader2 } from "lucide-react"

interface FormFieldProps {
  label: string
  required?: boolean
  error?: string
  helpText?: string
  children: React.ReactNode
}

export function FormField({ label, required = false, error, helpText, children }: FormFieldProps) {
  return (
    <div>
      <Label className="text-sm font-medium text-gray-700 mb-2 block">
        {label}
        {required && "*"}
      </Label>
      {children}
      {error && <p className="text-sm text-red-600 mt-1">{error}</p>}
      {helpText && <p className="text-xs text-gray-500 mt-1">{helpText}</p>}
    </div>
  )
}

interface TextInputProps {
  placeholder?: string
  type?: string
  register?: UseFormRegisterReturn
  className?: string
}

export function TextInput({ placeholder, type = "text", register, className }: TextInputProps) {
  return (
    <Input
      type={type}
      placeholder={placeholder}
      {...register}
      className={`w-full h-10 px-3 border border-gray-300 rounded focus:border-blue-500 focus:ring-1 focus:ring-blue-500 ${className}`}
    />
  )
}

interface SelectInputProps {
  placeholder?: string
  value?: string
  onValueChange?: (value: string) => void
  disabled?: boolean
  options: Array<{ value: string; label: string }>
}

export function SelectInput({ placeholder, value, onValueChange, disabled, options }: SelectInputProps) {
  return (
    <Select value={value} onValueChange={onValueChange} disabled={disabled}>
      <SelectTrigger className="w-full h-10 border border-gray-300 rounded focus:border-blue-500">
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        {options.map((option) => (
          <SelectItem key={option.value} value={option.value}>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}

interface RutInputProps {
  placeholder?: string
  register?: UseFormRegisterReturn
  onBlur?: (value: string) => void
  validating?: boolean
}

export function RutInput({ placeholder, register, onBlur, validating }: RutInputProps) {
  return (
    <div className="relative">
      <Input
        placeholder={placeholder}
        {...register}
        className="w-full h-10 px-3 border border-gray-300 rounded focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
        onBlur={(e) => onBlur?.(e.target.value)}
      />
      {validating && (
        <div className="absolute right-3 top-3">
          <Loader2 className="w-4 h-4 animate-spin text-blue-500" />
        </div>
      )}
    </div>
  )
}
