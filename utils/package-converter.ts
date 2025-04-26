import { packagesDB } from "@/data/packages-db"
import type { PackageData, PackageManager } from "@/types/package-types"

export function convertPackagesDBToPackageData(): PackageData[] {
  const result: PackageData[] = []

  // Iterate through each category in packagesDB
  Object.entries(packagesDB).forEach(([categoryName, packages]) => {
    // Iterate through each package in the category
    Object.entries(packages).forEach(([packageName, packageInfo]) => {
      const availability: Record<string, PackageManager[]> = {
        windows: [],
        macos: [],
        linux: [],
      }

      const packageNames: Record<string, Record<string, string>> = {
        windows: {},
        macos: {},
        linux: {},
      }

      // Check availability for Windows package managers
      if (packageInfo.chocolatey) {
        availability.windows.push("chocolatey" as PackageManager)
        packageNames.windows.chocolatey = packageInfo.chocolatey
      }
      if (packageInfo.winget) {
        availability.windows.push("winget" as PackageManager)
        packageNames.windows.winget = packageInfo.winget
      }
      if (packageInfo.scoop) {
        availability.windows.push("scoop" as PackageManager)
        packageNames.windows.scoop = packageInfo.scoop
      }

      // Check availability for macOS package managers
      if (packageInfo.homebrew) {
        availability.macos.push("homebrew" as PackageManager)
        packageNames.macos.homebrew = packageInfo.homebrew
      }

      // Check availability for Linux package managers
      if (packageInfo.apt) {
        availability.linux.push("apt" as PackageManager)
        packageNames.linux.apt = packageInfo.apt
      }
      if (packageInfo.flatpak) {
        availability.linux.push("flatpak" as PackageManager)
        packageNames.linux.flatpak = packageInfo.flatpak
      }
      if (packageInfo.yay) {
        availability.linux.push("yay" as PackageManager)
        packageNames.linux.yay = packageInfo.yay
      }

      // Create the package data object
      const pkg: PackageData = {
        id: packageName.toLowerCase().replace(/\s+/g, "-"),
        name: packageName,
        description: packageInfo.description,
        categories: [categoryName],
        logoUrl: packageInfo.icon,
        availability: {
          windows: availability.windows.length > 0 ? availability.windows : undefined,
          macos: availability.macos.length > 0 ? availability.macos : undefined,
          linux: availability.linux.length > 0 ? availability.linux : undefined,
        },
        packageNames: {
          windows: Object.keys(packageNames.windows).length > 0 ? packageNames.windows : undefined,
          macos: Object.keys(packageNames.macos).length > 0 ? packageNames.macos : undefined,
          linux: Object.keys(packageNames.linux).length > 0 ? packageNames.linux : undefined,
        },
      }

      result.push(pkg)
    })
  })

  return result
}
