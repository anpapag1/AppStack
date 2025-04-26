"use client"

import { useEffect } from "react"
import { Check, ChevronDown, Monitor, Apple, LaptopIcon as Linux } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import type { OperatingSystem, PackageManager } from "@/types/package-types"

interface OsSelectorProps {
  selectedOS: OperatingSystem
  setSelectedOS: (os: OperatingSystem) => void
  selectedPackageManager: PackageManager
  setSelectedPackageManager: (pm: PackageManager) => void
}

export function OsSelector({
  selectedOS,
  setSelectedOS,
  selectedPackageManager,
  setSelectedPackageManager,
}: OsSelectorProps) {
  // Define package managers for each OS
  const packageManagers = {
    windows: ["winget", "chocolatey", "scoop"],
    macos: ["homebrew"],
    linux: ["apt", "flatpak", "yay"],
  }

  // Update package manager when OS changes
  useEffect(() => {
    setSelectedPackageManager(packageManagers[selectedOS][0] as PackageManager)
  }, [selectedOS, setSelectedPackageManager])

  // Get OS display name
  const getOSDisplayName = (os: OperatingSystem) => {
    switch (os) {
      case "windows":
        return "Windows"
      case "macos":
        return "macOS"
      case "linux":
        return "Linux"
    }
  }

  // Get package manager display name
  const getPackageManagerDisplayName = (pm: PackageManager) => {
    switch (pm) {
      case "chocolatey":
        return "Chocolatey"
      case "winget":
        return "Winget"
      case "scoop":
        return "Scoop"
      case "homebrew":
        return "Homebrew"
      case "apt":
        return "APT"
      case "flatpak":
        return "Flatpak"
      case "yay":
        return "YAY"
    }
  }

  // Get OS icon
  const getOSIcon = (os: OperatingSystem) => {
    switch (os) {
      case "windows":
        return <Monitor className="mr-2 h-4 w-4" />
      case "macos":
        return <Apple className="mr-2 h-4 w-4" />
      case "linux":
        return <Linux className="mr-2 h-4 w-4" />
    }
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="flex items-center gap-2">
          {getOSIcon(selectedOS)}
          <span>{getOSDisplayName(selectedOS)}</span>
          <span className="hidden md:inline"> - {getPackageManagerDisplayName(selectedPackageManager)}</span>
          <ChevronDown className="ml-2 h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>Operating System</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          {(["windows", "macos", "linux"] as OperatingSystem[]).map((os) => (
            <DropdownMenuSub key={os}>
              <DropdownMenuSubTrigger>
                {getOSIcon(os)}
                <span>{getOSDisplayName(os)}</span>
                {selectedOS === os && <Check className="ml-auto h-4 w-4" />}
              </DropdownMenuSubTrigger>
              <DropdownMenuPortal>
                <DropdownMenuSubContent>
                  {packageManagers[os].map((pm) => (
                    <DropdownMenuItem
                      key={pm}
                      onClick={() => {
                        setSelectedOS(os)
                        setSelectedPackageManager(pm as PackageManager)
                      }}
                    >
                      <span>{getPackageManagerDisplayName(pm as PackageManager)}</span>
                      {selectedOS === os && selectedPackageManager === pm && <Check className="ml-auto h-4 w-4" />}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuSubContent>
              </DropdownMenuPortal>
            </DropdownMenuSub>
          ))}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
