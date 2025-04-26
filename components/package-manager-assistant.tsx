"use client"

import { useState, useMemo } from "react"
import { Header } from "@/components/header"
import { PackageGrid } from "@/components/package-grid"
import { CommandOutput } from "@/components/command-output"
import { CategoryFilter } from "@/components/category-filter"
import { SearchBar } from "@/components/search-bar"
import { convertPackagesDBToPackageData } from "@/utils/package-converter"
import type { PackageManager, OperatingSystem } from "@/types/package-types"

export function PackageManagerAssistant() {
  const [selectedOS, setSelectedOS] = useState<OperatingSystem>("windows")
  const [selectedPackageManager, setSelectedPackageManager] = useState<PackageManager>("winget")
  const [selectedCategory, setSelectedCategory] = useState<string>("all")
  const [searchQuery, setSearchQuery] = useState<string>("")
  const [selectedPackages, setSelectedPackages] = useState<string[]>([])
  const [autoYes, setAutoYes] = useState<boolean>(true)

  const packageData = useMemo(() => convertPackagesDBToPackageData(), [])

  // Filter packages based on category and search query
  const filteredPackages = useMemo(() => {
    return packageData.filter((pkg) => {
      const matchesCategory = selectedCategory === "all" || pkg.categories.includes(selectedCategory)
      const matchesSearch =
        pkg.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        pkg.description.toLowerCase().includes(searchQuery.toLowerCase())
      const isAvailableForOS = pkg.availability[selectedOS]?.includes(selectedPackageManager)

      return matchesCategory && matchesSearch && isAvailableForOS
    })
  }, [selectedCategory, searchQuery, selectedOS, selectedPackageManager, packageData])

  // Toggle package selection
  const togglePackage = (packageId: string) => {
    setSelectedPackages((prev) =>
      prev.includes(packageId) ? prev.filter((id) => id !== packageId) : [...prev, packageId],
    )
  }

  // Clear all selections
  const clearSelections = () => {
    setSelectedPackages([])
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header
        selectedOS={selectedOS}
        setSelectedOS={setSelectedOS}
        selectedPackageManager={selectedPackageManager}
        setSelectedPackageManager={setSelectedPackageManager}
      />

      <div className="container mx-auto px-4 py-6 flex-1">
        <div className="flex flex-col md:flex-row gap-6">
          <div className="md:w-1/4">
            <CategoryFilter selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} />
          </div>

          <div className="md:w-3/4 flex flex-col gap-6">
            <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

            <PackageGrid
              packages={filteredPackages}
              selectedPackages={selectedPackages}
              togglePackage={togglePackage}
            />
          </div>
        </div>
      </div>

      <CommandOutput
        selectedOS={selectedOS}
        selectedPackageManager={selectedPackageManager}
        selectedPackages={selectedPackages}
        packageData={packageData}
        autoYes={autoYes}
        setAutoYes={setAutoYes}
        clearSelections={clearSelections}
      />
    </div>
  )
}
