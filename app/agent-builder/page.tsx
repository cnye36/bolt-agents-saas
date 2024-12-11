"use client"

import { AgentBuilder } from "@/components/agent-builder/agent-builder"

export default function AgentBuilderPage() {
  return (
    <div className="container mx-auto px-4 pt-20">
      <div className="py-8">
        <h1 className="text-3xl font-bold mb-4">Agent Builder</h1>
        <p className="text-muted-foreground mb-8">
          Create and customize your AI agents using our visual builder.
        </p>
        <AgentBuilder />
      </div>
    </div>
  )
}