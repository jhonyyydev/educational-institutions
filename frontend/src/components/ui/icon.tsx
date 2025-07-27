import Image from "next/image"
import { cn } from "@/lib/utils"

interface IconProps {
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
  className?: string
  alt?: string
}

export function Icon({ name, size = 24, className, alt, ...props }: IconProps) {
  const iconPath = `/icons/${name}.svg`

  return (
    <Image
      src={iconPath || "/placeholder.svg"}
      alt={alt || name}
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
