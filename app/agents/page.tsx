"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { AgentCard } from "@/components/agents/agent-card"
import { AgentConfigDialog } from "@/components/agents/agent-config-dialog"
import { useAgentStore } from "@/lib/store/agent-store"
import { useToast } from "@/hooks/use-toast"

export default function AgentsPage() {
  const [showCreateDialog, setShowCreateDialog] = useState(false)
  const agents = useAgentStore((state) => state.agents)
  const deleteAgent = useAgentStore((state) => state.deleteAgent)
  const { toast } = useToast()

  const handleTestAgent = (id: string) => {
    toast({
      title: "Testing Agent",
      description: "Agent test functionality coming soon.",
    })
  }

  return (
    <div className="container mx-auto px-4 pt-20">
      <div className="py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">AI Agents</h1>
            <p className="text-muted-foreground">
              Create and manage your AI agents
            </p>
          </div>
          <Button onClick={() => setShowCreateDialog(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Create Agent
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {agents.map((agent) => (
            <AgentCard
              key={agent.id}
              agent={agent}
              onDelete={deleteAgent}
              onTest={handleTestAgent}
            />
          ))}
        </div>

        <AgentConfigDialog
          open={showCreateDialog}
          onOpenChange={setShowCreateDialog}
        />
      </div>
    </div>
  )
}