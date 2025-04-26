import Image from "next/image"
import type { PackageData } from "@/types/package-types"

interface PackageLogoProps {
  packageData: PackageData
  size?: number
}

export function PackageLogo({ packageData, size = 40 }: PackageLogoProps) {
  const { name, logoUrl } = packageData
  const initials = name
    .split(" ")
    .map((word) => word[0])
    .join("")
    .slice(0, 2)
    .toUpperCase()

  if (logoUrl) {
    return (
      <div className="relative flex-shrink-0 rounded-md overflow-hidden" style={{ width: size, height: size }}>
        <Image
          src={logoUrl || "/placeholder.svg"}
          alt={`${name} logo`}
          width={size}
          height={size}
          className="object-contain"
          onError={(e) => {
            // Fallback to initials if image fails to load
            e.currentTarget.style.display = "none"
            e.currentTarget.parentElement!.classList.add("bg-muted")
            e.currentTarget.parentElement!.setAttribute("data-initials", initials)
          }}
        />
      </div>
    )
  }

  // Fallback to initials
  return (
    <div
      className="flex-shrink-0 flex items-center justify-center bg-muted rounded-md font-medium text-muted-foreground"
      style={{ width: size, height: size }}
    >
      {initials}
    </div>
  )
}
