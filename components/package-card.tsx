"use client"

import { Check } from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { PackageData } from "@/types/package-types"
import { cn } from "@/lib/utils"
import { PackageLogo } from "@/components/package-logo"

interface PackageCardProps {
  packageData: PackageData
  isSelected: boolean
  onToggle: () => void
}

export function PackageCard({ packageData, isSelected, onToggle }: PackageCardProps) {
  return (
    <Card
      className={cn("cursor-pointer transition-all hover:shadow-md", isSelected && "ring-2 ring-primary")}
      onClick={onToggle}
    >
      <CardHeader className="pb-2 flex flex-row items-start gap-3">
        <PackageLogo packageData={packageData} />
        <div className="flex-1">
          <div className="flex justify-between items-start">
            <CardTitle className="text-lg">{packageData.name}</CardTitle>
            <div
              className={cn(
                "w-5 h-5 rounded-full border flex items-center justify-center",
                isSelected ? "bg-primary border-primary" : "border-input",
              )}
            >
              {isSelected && <Check className="h-3 w-3 text-primary-foreground" />}
            </div>
          </div>
          <CardDescription>{packageData.description}</CardDescription>
        </div>
      </CardHeader>
      <CardContent className="pb-2">
        <div className="flex flex-wrap gap-1">
          {packageData.categories.slice(0, 3).map((category) => (
            <Badge key={category} variant="secondary" className="text-xs">
              {category}
            </Badge>
          ))}
        </div>
      </CardContent>
      <CardFooter className="text-xs text-muted-foreground">
        {packageData.version && `v${packageData.version}`}
      </CardFooter>
    </Card>
  )
}
