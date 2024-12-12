"use client"

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Brain, Layout, Settings, Activity, Users, LogOut } from 'lucide-react'
import { cn } from '@/lib/utils'
import { signOut } from "next-auth/react"
import { useRouter } from 'next/navigation'
import { useToast } from "@/hooks/use-toast"
import { getCurrentUser } from "@/lib/auth"

const Navigation = () => {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)
  const router = useRouter()
  const { toast } = useToast()

  const navigation = [
    { name: 'Dashboard', href: '/', icon: Layout },
    { name: 'Agents', href: '/agents', icon: Brain },
    { name: 'Workflows', href: '/workflows', icon: Activity },
    { name: 'Settings', href: '/settings', icon: Settings },
  ]

  const handleLogout = async () => {
    try {
      await signOut({ 
        redirect: false 
      })
      
      // Clear any client-side state or tokens if needed
      
      // Show a toast notification
      toast({
        title: "Logged Out",
        description: "You have been successfully logged out.",
        variant: "default"
      })

      // Redirect to login page
      router.push('/auth/login')
    } catch (error) {
      console.error("Logout error:", error)
      toast({
        title: "Logout Failed",
        description: "There was an error logging out. Please try again.",
        variant: "destructive"
      })
    }
  }

  return (
    <nav className="fixed top-0 z-50 w-full border-b bg-background">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <Brain className="h-8 w-8" />
              <span className="text-xl font-bold">AI-Automated Agents</span>
            </Link>
          </div>
          <div className="hidden md:block">
            <div className="flex items-center space-x-4">
              {navigation.map((item) => {
                const Icon = item.icon
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={cn(
                      'inline-flex items-center space-x-2 rounded-md px-3 py-2 text-sm font-medium transition-colors',
                      pathname === item.href
                        ? 'bg-primary text-primary-foreground'
                        : 'hover:bg-accent hover:text-accent-foreground'
                    )}
                  >
                    <Icon className="h-4 w-4" />
                    <span>{item.name}</span>
                  </Link>
                )
              })}
              <button
                onClick={handleLogout}
                className={cn(
                  'inline-flex items-center space-x-2 rounded-md px-3 py-2 text-sm font-medium transition-colors',
                  'hover:bg-destructive hover:text-destructive-foreground'
                )}
              >
                <LogOut className="h-4 w-4" />
                <span>Logout</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navigation