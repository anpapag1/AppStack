"use client"

import { PackageCard } from "@/components/package-card"
import type { PackageData } from "@/types/package-types"

interface PackageGridProps {
  packages: PackageData[]
  selectedPackages: string[]
  togglePackage: (packageId: string) => void
}

export function PackageGrid({ packages, selectedPackages, togglePackage }: PackageGridProps) {
  if (packages.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-8 text-center">
        <h3 className="text-lg font-medium">No packages found</h3>
        <p className="text-muted-foreground">Try adjusting your search or filter criteria</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {packages.map((pkg) => (
        <PackageCard
          key={pkg.id}
          packageData={pkg}
          isSelected={selectedPackages.includes(pkg.id)}
          onToggle={() => togglePackage(pkg.id)}
        />
      ))}
    </div>
  )
}
