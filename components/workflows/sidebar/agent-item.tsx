"use client"

import { AgentConfig } from '@/lib/types'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Brain } from 'lucide-react'

interface AgentItemProps {
  agent: AgentConfig
  onDragStart: (event: React.DragEvent<HTMLDivElement>, agent: AgentConfig) => void
}

export function AgentItem({ agent, onDragStart }: AgentItemProps) {
  return (
    <Card
      key={agent.id}
      className="p-4 cursor-move"
      draggable
      onDragStart={(event) => onDragStart(event, agent)}
    >
      <div className="flex items-center space-x-3">
        <Brain className="h-5 w-5" />
        <div>
          <div className="flex items-center space-x-2">
            <h3 className="text-sm font-medium">{agent.name}</h3>
            <Badge variant={agent.status === 'active' ? 'default' : 'secondary'}>
              {agent.status}
            </Badge>
          </div>
          <p className="text-xs text-muted-foreground mt-1">
            {agent.type}
          </p>
        </div>
      </div>
    </Card>
  )
}