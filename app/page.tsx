import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Brain, Workflow, Settings, ChevronRight } from "lucide-react"
import Link from "next/link"

export default function Home() {
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
<<<<<<< HEAD
            <Link href="/agents">
=======
            <Link href="/agent-builder">
>>>>>>> 1ebf29029c12e6e1a521db30347a2da2a2c55876
              Get Started
              <ChevronRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
          <Button variant="outline" size="lg" asChild>
            <Link href="/documentation">
              Documentation
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
                <Button variant="ghost" asChild>
                  <Link href={feature.href}>
                    Learn more
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </Card>
            )
          })}
        </div>
      </section>
    </div>
  )
}