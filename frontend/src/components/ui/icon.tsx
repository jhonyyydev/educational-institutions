import type React from "react"
import { cn } from "@/lib/utils"

interface IconProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  name:
    | "logo-cuadrado"
    | "logo-rectangulo"
    | "school"
    | "account-circle"
    | "logout"
    | "home"
    | "image"
    | "group"
    | "person"
  size?: number
}

export function Icon({ name, size = 24, className, ...props }: IconProps) {
  const iconPath = `/icons/${name}.svg`

  return (
    <img
      src={iconPath || "/placeholder.svg"}
      alt={name}
      width={size}
      height={size}
      className={cn("inline-block", className)}
      {...props}
    />
  )
}

// Componente específico para el logo
interface LogoProps {
  variant?: "cuadrado" | "rectangulo"
  size?: number
  className?: string
}

export function Logo({ variant = "cuadrado", size = 48, className }: LogoProps) {
  return <Icon name={variant === "cuadrado" ? "logo-cuadrado" : "logo-rectangulo"} size={size} className={className} />
}
