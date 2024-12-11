"use client"

import { useAgentStore } from '@/lib/store/agent-store'
import { ScrollArea } from '@/components/ui/scroll-area'
import { AgentItem } from './sidebar/agent-item'
import { AgentConfig } from '@/lib/types'

export function WorkflowSidebar() {
  const agents = useAgentStore((state) => state.agents)

  const onDragStart = (event: React.DragEvent<HTMLDivElement>, agent: AgentConfig) => {
    event.dataTransfer.setData('application/agent', JSON.stringify(agent))
    event.dataTransfer.effectAllowed = 'move'
  }

  return (
    <div className="w-64 mr-4">
      <div className="mb-4">
        <h2 className="text-lg font-semibold">Available Agents</h2>
        <p className="text-sm text-muted-foreground">
          Drag agents to the canvas to create your workflow
        </p>
      </div>
      <ScrollArea className="h-full">
        <div className="space-y-3 pr-4">
          {agents.map((agent) => (
            <AgentItem 
              key={agent.id}
              agent={agent}
              onDragStart={onDragStart}
            />
          ))}
        </div>
      </ScrollArea>
    </div>
  )
}