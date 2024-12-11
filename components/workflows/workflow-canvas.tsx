"use client"

import { useCallback } from 'react'
import ReactFlow, {
  Background,
  Controls,
  Panel,
  useNodesState,
  useEdgesState,
  addEdge,
  Connection,
  Edge,
  Node,
} from 'reactflow'
import 'reactflow/dist/style.css'
import { WorkflowNode } from '@/lib/types'
import { WorkflowSidebar } from './workflow-sidebar'
import { AgentNode } from './nodes/agent-node'
import { Button } from '../ui/button'
import { Save } from 'lucide-react'
import { useToast } from '@/components/ui/toaster'

const nodeTypes = {
  agent: AgentNode,
}

export function WorkflowCanvas() {
  const [nodes, setNodes, onNodesChange] = useNodesState([])
  const [edges, setEdges, onEdgesChange] = useEdgesState([])
  const { toast } = useToast()

  const onConnect = useCallback(
    (params: Connection | Edge) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  )

  const onDragOver = useCallback((event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault()
    event.dataTransfer.dropEffect = 'move'
  }, [])

  const onDrop = useCallback(
    (event: React.DragEvent<HTMLDivElement>) => {
      event.preventDefault()

      const agentData = event.dataTransfer.getData('application/agent')
      if (!agentData) return

      const agent = JSON.parse(agentData)
      const position = {
        x: event.clientX - event.currentTarget.getBoundingClientRect().left,
        y: event.clientY - event.currentTarget.getBoundingClientRect().top,
      }

      const newNode: Node<WorkflowNode> = {
        id: `${agent.id}-${nodes.length + 1}`,
        type: 'agent',
        position,
        data: agent,
      }

      setNodes((nds) => nds.concat(newNode))
    },
    [nodes, setNodes]
  )

  const handleSaveWorkflow = () => {
    toast({
      title: "Workflow Saved",
      description: "Your workflow has been saved successfully.",
    })
  }

  return (
    <div className="flex h-[calc(100vh-12rem)]">
      <WorkflowSidebar />
      <div className="flex-1 border rounded-lg">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onDragOver={onDragOver}
          onDrop={onDrop}
          nodeTypes={nodeTypes}
          fitView
        >
          <Background />
          <Controls />
          <Panel position="top-right">
            <Button variant="secondary" onClick={handleSaveWorkflow}>
              <Save className="mr-2 h-4 w-4" />
              Save Workflow
            </Button>
          </Panel>
        </ReactFlow>
      </div>
    </div>
  )
}