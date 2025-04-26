export type OperatingSystem = "windows" | "macos" | "linux"
export type PackageManager = "winget" | "chocolatey" | "scoop" | "homebrew" | "apt" | "flatpak" | "yay"

export interface PackageData {
  id: string
  name: string
  description: string
  categories: string[]
  version?: string
  logoUrl?: string
  availability: {
    [key in OperatingSystem]?: PackageManager[]
  }
  packageNames?: {
    [key in OperatingSystem]?: {
      [key in PackageManager]?: string
    }
  }
}
