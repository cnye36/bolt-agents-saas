"use client"

import { Card } from '../ui/card'
import { ScrollArea } from '../ui/scroll-area'
import { Brain, MessageSquare, FileText, Settings } from 'lucide-react'
import { AgentType } from '@/lib/types'

const agentTypes = [
  {
    type: AgentType.Conversational,
    icon: MessageSquare,
    description: 'Engage in natural conversations',
  },
  {
    type: AgentType.QuestionAnswering,
    icon: Brain,
    description: 'Answer questions from given context',
  },
  {
    type: AgentType.Summarization,
    icon: FileText,
    description: 'Summarize text content',
  },
  {
    type: AgentType.Custom,
    icon: Settings,
    description: 'Create a custom agent',
  },
]

export function Sidebar() {
  const onDragStart = (event: React.DragEvent<HTMLDivElement>, nodeType: string) => {
    event.dataTransfer.setData('application/reactflow', nodeType)
    event.dataTransfer.effectAllowed = 'move'
  }

  return (
    <div className="w-64 mr-4">
      <div className="mb-4">
        <h2 className="text-lg font-semibold">Agent Types</h2>
        <p className="text-sm text-muted-foreground">
          Drag and drop agents onto the canvas
        </p>
      </div>
      <ScrollArea className="h-full">
        <div className="space-y-3 pr-4">
          {agentTypes.map((agent) => {
            const Icon = agent.icon
            return (
              <Card
                key={agent.type}
                className="p-4 cursor-move"
                draggable
                onDragStart={(event) => onDragStart(event, agent.type)}
              >
                <div className="flex items-center space-x-3">
                  <Icon className="h-5 w-5" />
                  <div>
                    <h3 className="text-sm font-medium">{agent.type}</h3>
                    <p className="text-xs text-muted-foreground">
                      {agent.description}
                    </p>
                  </div>
                </div>
              </Card>
            )
          })}
        </div>
      </ScrollArea>
    </div>
  )
}