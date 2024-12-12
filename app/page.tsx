import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Brain, Workflow, Settings, ChevronRight, LogIn, UserPlus } from "lucide-react"
import Link from "next/link"
import { getServerSession } from "next-auth"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import { redirect } from "next/navigation"

export default async function Home() {
  const session = await getServerSession(authOptions)

  // If user is already logged in, redirect to dashboard or agents page
  if (session) {
    redirect("/agents")
  }

  const features = [
    {
      title: "Agent Builder",
      description: "Create custom AI agents with our intuitive drag-and-drop interface",
      icon: Brain,
      href: "/agents"
    },
    {
      title: "Workflow Designer",
      description: "Design complex multi-agent workflows visually",
      icon: Workflow,
      href: "/workflows"
    },
    {
      title: "Management Dashboard",
      description: "Monitor and optimize your AI agents' performance",
      icon: Settings,
      href: "/settings"
    }
  ]

  return (
    <div className="container mx-auto px-4 pt-20">
      <section className="py-12 text-center">
        <h1 className="text-4xl font-bold tracking-tight sm:text-6xl mb-6">
          Build AI Agents Without Code
        </h1>
        <p className="text-xl text-muted-foreground mb-8">
          Create, connect, and deploy AI agents visually. No coding required.
        </p>
        <div className="flex justify-center gap-4">
          <Button asChild size="lg">
            <Link href="/auth/signup">
              Sign Up
              <UserPlus className="ml-2 h-4 w-4" />
            </Link>
          </Button>
          <Button variant="outline" size="lg" asChild>
            <Link href="/auth/login">
              Log In
              <LogIn className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </section>

      <section className="py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {features.map((feature) => {
            const Icon = feature.icon
            return (
              <Card key={feature.title} className="p-6 hover:shadow-lg transition-shadow">
                <div className="mb-4">
                  <Icon className="h-12 w-12 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground mb-4">{feature.description}</p>
                <Button variant="ghost" className="cursor-default">
                  <span>Requires Login</span>
                </Button>
              </Card>
            )
          })}
        </div>
      </section>
    </div>
  )
}