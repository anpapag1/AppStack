import { ModeToggle } from "@/components/mode-toggle"
import { OsSelector } from "@/components/os-selector"
import type { OperatingSystem, PackageManager } from "@/types/package-types"
import { Package } from "lucide-react"

interface HeaderProps {
  selectedOS: OperatingSystem
  setSelectedOS: (os: OperatingSystem) => void
  selectedPackageManager: PackageManager
  setSelectedPackageManager: (pm: PackageManager) => void
}

export function Header({ selectedOS, setSelectedOS, selectedPackageManager, setSelectedPackageManager }: HeaderProps) {
  return (
    <header className="sticky top-0 z-10 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-2">
          <Package className="h-6 w-6" />
          <h1 className="text-xl font-bold">AppStack</h1>
        </div>

        <div className="flex items-center gap-4">
          <OsSelector
            selectedOS={selectedOS}
            setSelectedOS={setSelectedOS}
            selectedPackageManager={selectedPackageManager}
            setSelectedPackageManager={setSelectedPackageManager}
          />
          <ModeToggle />
        </div>
      </div>
    </header>
  )
}
