"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowRight, Activity } from "lucide-react"
import Link from "next/link"

const mockWorkflows = [
  {
    id: "1",
    name: "Customer Support Bot",
    description: "Automated customer support workflow with multiple agents",
    agentCount: 3,
    lastUpdated: "2024-03-20"
  },
  {
    id: "2",
    name: "Content Generation Pipeline",
    description: "Multi-stage content creation and optimization workflow",
    agentCount: 4,
    lastUpdated: "2024-03-19"
  }
]

export function WorkflowList() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {mockWorkflows.map((workflow) => (
        <Card key={workflow.id} className="p-6">
          <div className="flex items-start justify-between">
            <div className="flex items-start space-x-4">
              <Activity className="h-6 w-6 text-primary mt-1" />
              <div>
                <h3 className="text-lg font-semibold">{workflow.name}</h3>
                <p className="text-muted-foreground mb-4">{workflow.description}</p>
                <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                  <span>{workflow.agentCount} agents</span>
                  <span>Updated {workflow.lastUpdated}</span>
                </div>
              </div>
            </div>
            <Button variant="ghost" asChild>
              <Link href={`/workflows/${workflow.id}`}>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </Card>
      ))}
    </div>
  )
}