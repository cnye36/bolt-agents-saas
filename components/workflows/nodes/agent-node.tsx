"use client"

import { memo } from 'react'
import { Handle, Position } from 'reactflow'
import { Brain } from 'lucide-react'
import { Card } from '../../ui/card'
import { Badge } from '../../ui/badge'
import { AgentConfig } from '@/lib/types'

interface AgentNodeProps {
  data: AgentConfig
}

export const AgentNode = memo(({ data }: AgentNodeProps) => {
  return (
    <Card className="p-4 min-w-[200px]">
      <Handle type="target" position={Position.Left} />
      <div className="flex items-center space-x-2">
        <Brain className="h-5 w-5" />
        <div>
          <div className="flex items-center space-x-2">
            <h3 className="text-sm font-medium">{data.name}</h3>
            <Badge variant={data.status === 'active' ? 'default' : 'secondary'}>
              {data.status}
            </Badge>
          </div>
          <p className="text-xs text-muted-foreground mt-1">
            {data.type}
          </p>
        </div>
      </div>
      <Handle type="source" position={Position.Right} />
    </Card>
  )
})

AgentNode.displayName = 'AgentNode'