"use client"

import { AgentConfig } from "@/lib/types"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Brain, Edit, Trash2, PlayCircle } from "lucide-react"
import { useState } from "react"
import { AgentConfigDialog } from "./agent-config-dialog"

interface AgentCardProps {
  agent: AgentConfig
  onDelete: (id: string) => void
  onTest: (id: string) => void
}

export function AgentCard({ agent, onDelete, onTest }: AgentCardProps) {
  const [showConfig, setShowConfig] = useState(false)

  return (
    <>
      <Card className="p-6">
        <div className="flex items-start justify-between">
          <div className="flex items-start space-x-4">
            <Brain className="h-6 w-6 text-primary mt-1" />
            <div>
              <div className="flex items-center space-x-2">
                <h3 className="text-lg font-semibold">{agent.name}</h3>
                <Badge variant={agent.status === 'active' ? 'default' : 'destructive'}>
                  {agent.status}
                </Badge>
              </div>
              <p className="text-muted-foreground mt-1">{agent.description}</p>
              <div className="flex items-center space-x-4 mt-4">
                <span className="text-sm text-muted-foreground">Type: {agent.type}</span>
                <span className="text-sm text-muted-foreground">Model: {agent.model}</span>
              </div>
            </div>
          </div>
          <div className="flex space-x-2">
            <Button variant="ghost" size="icon" onClick={() => onTest(agent.id)}>
              <PlayCircle className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" onClick={() => setShowConfig(true)}>
              <Edit className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" onClick={() => onDelete(agent.id)}>
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </Card>
      <AgentConfigDialog
        agent={agent}
        open={showConfig}
        onOpenChange={setShowConfig}
      />
    </>
  )
}