"use client"

import { Card } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Settings as SettingsIcon, Key, Database, Bell } from "lucide-react"

export default function SettingsPage() {
  const settingsSections = [
    {
      title: "General Settings",
      description: "Manage your account preferences and settings",
      icon: SettingsIcon,
      href: "/settings/general"
    },
    {
      title: "API Keys",
      description: "Configure API keys for various services",
      icon: Key,
      href: "/settings/api-keys"
    },
    {
      title: "Database",
      description: "Manage your workflow and agent data",
      icon: Database,
      href: "/settings/database"
    },
    {
      title: "Notifications",
      description: "Configure notification preferences",
      icon: Bell,
      href: "/settings/notifications"
    }
  ]

  return (
    <div className="container mx-auto px-4 pt-20">
      <div className="py-8">
        <h1 className="text-3xl font-bold mb-2">Settings</h1>
        <p className="text-muted-foreground mb-8">
          Manage your account and application settings
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {settingsSections.map((section) => {
            const Icon = section.icon
            return (
              <Card key={section.title} className="p-6">
                <div className="flex items-start space-x-4">
                  <Icon className="h-6 w-6 text-primary" />
                  <div>
                    <h3 className="text-lg font-semibold">{section.title}</h3>
                    <p className="text-muted-foreground">{section.description}</p>
                  </div>
                </div>
              </Card>
            )
          })}
        </div>
      </div>
    </div>
  )
}