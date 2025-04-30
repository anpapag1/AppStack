"use client"

import { useState } from "react"
import { Copy, Download, RefreshCw, Terminal, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import type { OperatingSystem, PackageManager, PackageData } from "@/types/package-types"

interface CommandOutputProps {
  selectedOS: OperatingSystem
  selectedPackageManager: PackageManager
  selectedPackages: string[]
  packageData: PackageData[]
  autoYes: boolean
  setAutoYes: (value: boolean) => void
  clearSelections: () => void
}

export function CommandOutput({
  selectedOS,
  selectedPackageManager,
  selectedPackages,
  packageData,
  autoYes,
  setAutoYes,
  clearSelections,
}: CommandOutputProps) {
  const [copied, setCopied] = useState(false)

  // Generate installation command based on selected package manager
  const generateCommand = () => {
    if (selectedPackages.length === 0) return ""

    const selectedPackageNames = selectedPackages.map((id) => {
      const pkg = packageData.find((p) => p.id === id)
      return pkg?.packageNames?.[selectedOS]?.[selectedPackageManager] || pkg?.name.toLowerCase()
    })

    switch (selectedPackageManager) {
      case "chocolatey":
        return `choco install ${selectedPackageNames.join(" ")}${autoYes ? " -y" : ""}`
      case "winget":
        return `winget install ${selectedPackageNames.join(" ")} -h --accept-package-agreements`
      case "scoop":
        return `scoop install ${selectedPackageNames.join(" ")}`
      case "homebrew":
        return `brew install ${selectedPackageNames.join(" ")}`
      case "apt":
        return `sudo apt install ${selectedPackageNames.join(" ")}${autoYes ? " -y" : ""}`
      case "flatpak":
        return `flatpak install ${selectedPackageNames.join(" ")}${autoYes ? " -y" : ""}`
      case "yay":
        return `yay -S ${selectedPackageNames.join(" ")}${autoYes ? " --noconfirm" : ""}`
      default:
        return ""
    }
  }

  // Generate script content based on OS
  const generateScript = () => {
    const command = generateCommand()
    if (!command) return ""

    switch (selectedOS) {
      case "windows":
        return `@echo off
:: Check for admin privileges
NET SESSION >nul 2>&1
IF %ERRORLEVEL% NEQ 0 (
    echo Requesting administrative privileges...
    powershell -Command "Start-Process -FilePath '%~f0' -Verb RunAs"
    exit /b
)

echo Running with administrative privileges...
${command}
pause
`
      case "macos":
      case "linux":
        return `#!/bin/bash
${command}`
      default:
        return command
    }
  }

  // Get script file extension based on OS
  const getScriptExtension = () => {
    switch (selectedOS) {
      case "windows":
        return ".bat"
      case "macos":
      case "linux":
        return ".sh"
      default:
        return ".txt"
    }
  }

  // Copy command to clipboard
  const copyToClipboard = () => {
    navigator.clipboard.writeText(generateCommand())
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  // Download script file
  const downloadScript = () => {
    const script = generateScript()
    const blob = new Blob([script], { type: "text/plain" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `install-packages${getScriptExtension()}`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  // Don't render anything if no packages are selected
  if (selectedPackages.length === 0) {
    return null
  }

  return (
    <div className="sticky bottom-0 border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 w-full">
      <div className="container mx-auto px-4 py-4">
        <div className="flex flex-col gap-4">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <Terminal className="h-5 w-5" />
              <h2 className="font-semibold">Installation Command</h2>
              <Badge count={selectedPackages.length} />
            </div>

            <div className="flex flex-wrap items-center gap-4">
              <div className="flex items-center space-x-2">
                <Switch id="auto-yes" checked={autoYes} onCheckedChange={setAutoYes} />
                <Label htmlFor="auto-yes">Auto-yes</Label>
              </div>

              <Button variant="outline" size="sm" onClick={clearSelections} disabled={selectedPackages.length === 0}>
                <RefreshCw className="mr-2 h-4 w-4" />
                Clear
              </Button>

              <Button variant="outline" size="sm" onClick={copyToClipboard} disabled={selectedPackages.length === 0}>
                {copied ? (
                  <>
                    <Check className="mr-2 h-4 w-4" />
                    Copied
                  </>
                ) : (
                  <>
                    <Copy className="mr-2 h-4 w-4" />
                    Copy
                  </>
                )}
              </Button>

              <Button variant="outline" size="sm" onClick={downloadScript} disabled={selectedPackages.length === 0}>
                <Download className="mr-2 h-4 w-4" />
                Download
              </Button>
            </div>
          </div>

          <Tabs defaultValue="command">
            <TabsList className="grid w-full max-w-md grid-cols-2">
              <TabsTrigger value="command">Command</TabsTrigger>
              <TabsTrigger value="script">Script</TabsTrigger>
            </TabsList>
            <TabsContent value="command">
              <div className="relative">
                <ScrollArea
                  className={`w-full rounded-md border bg-muted p-4 font-mono text-sm ${selectedPackages.length > 0 ? "h-24" : "h-12"}`}
                >
                  {selectedPackages.length > 0 ? (
                    generateCommand()
                  ) : (
                    <span className="text-muted-foreground">Select packages to generate installation command</span>
                  )}
                </ScrollArea>
              </div>
            </TabsContent>
            <TabsContent value="script">
              <div className="relative">
                <ScrollArea
                  className={`w-full rounded-md border bg-muted p-4 font-mono text-sm whitespace-pre ${selectedPackages.length > 0 ? "h-24" : "h-12"}`}
                >
                  {selectedPackages.length > 0 ? (
                    generateScript()
                  ) : (
                    <span className="text-muted-foreground">Select packages to generate installation script</span>
                  )}
                </ScrollArea>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}

// Badge component for showing selected package count
function Badge({ count }: { count: number }) {
  if (count === 0) return null

  return (
    <span className="inline-flex items-center justify-center rounded-full bg-primary px-2.5 py-0.5 text-xs font-medium text-primary-foreground">
      {count}
    </span>
  )
}
