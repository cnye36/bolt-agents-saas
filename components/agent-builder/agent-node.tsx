"use client"

import { memo } from 'react'
import { Handle, Position } from 'reactflow'
import { Brain } from 'lucide-react'
import { Card } from '../ui/card'
import { Badge } from '../ui/badge'

export const AgentNode = memo(({ data }: { data: { type: string } }) => {
  return (
    <Card className="p-4 min-w-[200px]">
      <Handle type="target" position={Position.Left} />
      <div className="flex items-center space-x-2">
        <Brain className="h-5 w-5" />
        <div>
          <h3 className="text-sm font-medium">{data.type} Agent</h3>
          <Badge variant="secondary" className="mt-1">
            {data.type}
          </Badge>
        </div>
      </div>
      <Handle type="source" position={Position.Right} />
    </Card>
  )
})

AgentNode.displayName = 'AgentNode'