"use client"

import { useCallback } from 'react'
import ReactFlow, {
  Background,
  Controls,
  Panel,
  useNodesState,
  useEdgesState,
  addEdge,
} from 'reactflow'
import 'reactflow/dist/style.css'
import { AgentNode } from './agent-node'
import { Sidebar } from './sidebar'
import { Button } from '../ui/button'
import { Save } from 'lucide-react'

const nodeTypes = {
  agent: AgentNode,
}

export function AgentBuilder() {
  const [nodes, setNodes, onNodesChange] = useNodesState([])
  const [edges, setEdges, onEdgesChange] = useEdgesState([])

  const onConnect = useCallback((params: any) => {
    setEdges((eds) => addEdge(params, eds))
  }, [setEdges])

  const onDragOver = useCallback((event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault()
    event.dataTransfer.dropEffect = 'move'
  }, [])

  const onDrop = useCallback(
    (event: React.DragEvent<HTMLDivElement>) => {
      event.preventDefault()

      const type = event.dataTransfer.getData('application/reactflow')
      if (!type) return

      const position = {
        x: event.clientX - event.currentTarget.getBoundingClientRect().left,
        y: event.clientY - event.currentTarget.getBoundingClientRect().top,
      }

      const newNode = {
        id: `${type}-${nodes.length + 1}`,
        type: 'agent',
        position,
        data: { type },
      }

      setNodes((nds) => nds.concat(newNode))
    },
    [nodes, setNodes]
  )

  return (
    <div className="flex h-[calc(100vh-12rem)]">
      <Sidebar />
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
            <Button variant="secondary">
              <Save className="mr-2 h-4 w-4" />
              Save Workflow
            </Button>
          </Panel>
        </ReactFlow>
      </div>
    </div>
  )
}