import type { PackageData } from "@/types/package-types"

export const packageData: PackageData[] = [
  // Browsers
  {
    id: "firefox",
    name: "Firefox",
    description: "Fast, private and secure web browser",
    categories: ["browsers"],
    version: "123.0",
    logoUrl: "/logos/firefox.png",
    availability: {
      windows: ["chocolatey", "winget", "scoop"],
      macos: ["homebrew"],
      linux: ["apt", "flatpak", "yay"],
    },
    packageNames: {
      windows: {
        chocolatey: "firefox",
        winget: "Mozilla.Firefox",
        scoop: "firefox",
      },
      macos: {
        homebrew: "firefox",
      },
      linux: {
        apt: "firefox",
        flatpak: "org.mozilla.firefox",
        yay: "firefox",
      },
    },
  },
  {
    id: "chrome",
    name: "Google Chrome",
    description: "Fast and secure browser by Google",
    categories: ["browsers"],
    version: "122.0",
    logoUrl: "/logos/chrome.png",
    availability: {
      windows: ["chocolatey", "winget", "scoop"],
      macos: ["homebrew"],
      linux: ["apt", "flatpak", "yay"],
    },
    packageNames: {
      windows: {
        chocolatey: "googlechrome",
        winget: "Google.Chrome",
        scoop: "googlechrome",
      },
      macos: {
        homebrew: "google-chrome",
      },
      linux: {
        apt: "google-chrome-stable",
        flatpak: "com.google.Chrome",
        yay: "google-chrome",
      },
    },
  },
  {
    id: "brave",
    name: "Brave",
    description: "Privacy-focused browser with built-in ad blocker",
    categories: ["browsers", "security"],
    version: "1.51",
    logoUrl: "/logos/brave.png",
    availability: {
      windows: ["chocolatey", "winget", "scoop"],
      macos: ["homebrew"],
      linux: ["apt", "flatpak", "yay"],
    },
    packageNames: {
      windows: {
        chocolatey: "brave",
        winget: "Brave.Brave",
        scoop: "brave",
      },
      macos: {
        homebrew: "brave-browser",
      },
      linux: {
        apt: "brave-browser",
        flatpak: "com.brave.Browser",
        yay: "brave-bin",
      },
    },
  },
  {
    id: "edge",
    name: "Microsoft Edge",
    description: "Fast and secure browser by Microsoft",
    categories: ["browsers"],
    version: "122.0",
    logoUrl: "/logos/edge.png",
    availability: {
      windows: ["chocolatey", "winget"],
      macos: ["homebrew"],
      linux: ["apt", "yay"],
    },
    packageNames: {
      windows: {
        chocolatey: "microsoft-edge",
        winget: "Microsoft.Edge",
      },
      macos: {
        homebrew: "microsoft-edge",
      },
      linux: {
        apt: "microsoft-edge-stable",
        yay: "microsoft-edge-stable-bin",
      },
    },
  },

  // Communication
  {
    id: "discord",
    name: "Discord",
    description: "Voice, video and text chat platform",
    categories: ["communication"],
    version: "0.0.29",
    logoUrl: "/logos/discord.png",
    availability: {
      windows: ["chocolatey", "winget", "scoop"],
      macos: ["homebrew"],
      linux: ["apt", "flatpak", "yay"],
    },
  },
  {
    id: "slack",
    name: "Slack",
    description: "Business communication platform",
    categories: ["communication", "productivity"],
    version: "4.33.73",
    logoUrl: "/logos/slack.png",
    availability: {
      windows: ["chocolatey", "winget", "scoop"],
      macos: ["homebrew"],
      linux: ["apt", "flatpak", "yay"],
    },
  },
  {
    id: "zoom",
    name: "Zoom",
    description: "Video conferencing and messaging platform",
    categories: ["communication", "productivity"],
    version: "5.16.10",
    logoUrl: "/logos/zoom.png",
    availability: {
      windows: ["chocolatey", "winget"],
      macos: ["homebrew"],
      linux: ["apt", "flatpak", "yay"],
    },
  },
  {
    id: "teams",
    name: "Microsoft Teams",
    description: "Team collaboration and communication platform",
    categories: ["communication", "productivity"],
    version: "1.6.0",
    logoUrl: "/logos/teams.png",
    availability: {
      windows: ["chocolatey", "winget"],
      macos: ["homebrew"],
      linux: ["apt", "yay"],
    },
  },

  // Security
  {
    id: "bitwarden",
    name: "Bitwarden",
    description: "Open source password manager",
    categories: ["security", "utilities"],
    version: "2023.4.0",
    logoUrl: "/logos/bitwarden.png",
    availability: {
      windows: ["chocolatey", "winget", "scoop"],
      macos: ["homebrew"],
      linux: ["apt", "flatpak", "yay"],
    },
  },
  {
    id: "1password",
    name: "1Password",
    description: "Password manager and secure digital vault",
    categories: ["security", "utilities"],
    version: "8.10.16",
    logoUrl: "/logos/1password.png",
    availability: {
      windows: ["chocolatey", "winget"],
      macos: ["homebrew"],
      linux: ["apt", "flatpak", "yay"],
    },
  },
  {
    id: "malwarebytes",
    name: "Malwarebytes",
    description: "Anti-malware and internet security software",
    categories: ["security"],
    version: "4.5.14",
    logoUrl: "/logos/malwarebytes.png",
    availability: {
      windows: ["chocolatey", "winget"],
      macos: ["homebrew"],
      linux: [],
    },
  },

  // Development
  {
    id: "vscode",
    name: "Visual Studio Code",
    description: "Lightweight code editor with powerful features",
    categories: ["development"],
    version: "1.86.2",
    logoUrl: "/logos/vscode.png",
    availability: {
      windows: ["chocolatey", "winget", "scoop"],
      macos: ["homebrew"],
      linux: ["apt", "flatpak", "yay"],
    },
  },
  {
    id: "git",
    name: "Git",
    description: "Distributed version control system",
    categories: ["development"],
    version: "2.42.0",
    logoUrl: "/logos/git.png",
    availability: {
      windows: ["chocolatey", "winget", "scoop"],
      macos: ["homebrew"],
      linux: ["apt", "yay"],
    },
  },
  {
    id: "node",
    name: "Node.js",
    description: "JavaScript runtime environment",
    categories: ["development"],
    version: "20.10.0",
    logoUrl: "/logos/nodejs.png",
    availability: {
      windows: ["chocolatey", "winget", "scoop"],
      macos: ["homebrew"],
      linux: ["apt", "yay"],
    },
  },
  {
    id: "docker",
    name: "Docker Desktop",
    description: "Containerization platform",
    categories: ["development", "cloud"],
    version: "4.27.1",
    logoUrl: "/logos/docker.png",
    availability: {
      windows: ["chocolatey", "winget"],
      macos: ["homebrew"],
      linux: ["apt", "yay"],
    },
  },

  // Media
  {
    id: "vlc",
    name: "VLC Media Player",
    description: "Free and open source multimedia player",
    categories: ["media", "video"],
    version: "3.0.20",
    logoUrl: "/logos/vlc.png",
    availability: {
      windows: ["chocolatey", "winget", "scoop"],
      macos: ["homebrew"],
      linux: ["apt", "flatpak", "yay"],
    },
  },
  {
    id: "spotify",
    name: "Spotify",
    description: "Digital music streaming service",
    categories: ["media"],
    version: "1.2.26",
    logoUrl: "/logos/spotify.png",
    availability: {
      windows: ["chocolatey", "winget", "scoop"],
      macos: ["homebrew"],
      linux: ["apt", "flatpak", "yay"],
    },
  },
  {
    id: "audacity",
    name: "Audacity",
    description: "Free, open source audio editor",
    categories: ["media", "creative"],
    version: "3.4.2",
    logoUrl: "/logos/audacity.png",
    availability: {
      windows: ["chocolatey", "winget", "scoop"],
      macos: ["homebrew"],
      linux: ["apt", "flatpak", "yay"],
    },
  },

  // Utilities
  {
    id: "7zip",
    name: "7-Zip",
    description: "File archiver with high compression ratio",
    categories: ["utilities"],
    version: "23.01",
    logoUrl: "/logos/7zip.png",
    availability: {
      windows: ["chocolatey", "winget", "scoop"],
      macos: [],
      linux: ["apt", "yay"],
    },
  },
  {
    id: "notepadplusplus",
    name: "Notepad++",
    description: "Free source code editor and Notepad replacement",
    categories: ["utilities", "development"],
    version: "8.6.2",
    logoUrl: "/logos/notepadplusplus.png",
    availability: {
      windows: ["chocolatey", "winget", "scoop"],
      macos: [],
      linux: [],
    },
  },
  {
    id: "obs",
    name: "OBS Studio",
    description: "Free and open source software for video recording and live streaming",
    categories: ["utilities", "video"],
    version: "30.0.2",
    logoUrl: "/logos/obs.png",
    availability: {
      windows: ["chocolatey", "winget", "scoop"],
      macos: ["homebrew"],
      linux: ["apt", "flatpak", "yay"],
    },
  },
]
