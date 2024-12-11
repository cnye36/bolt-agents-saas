"use client"

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { CreateWorkflowDialog } from "@/components/workflows/create-workflow-dialog"
import { WorkflowCanvas } from '@/components/workflows/workflow-canvas'

export default function WorkflowsPage() {
  const [showCreateDialog, setShowCreateDialog] = useState(false)

  return (
    <div className="container mx-auto px-4 pt-20">
      <div className="py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">Workflows</h1>
            <p className="text-muted-foreground">
              Design and manage your AI agent workflows
            </p>
          </div>
          <Button onClick={() => setShowCreateDialog(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Create Workflow
          </Button>
        </div>

        <WorkflowCanvas />

        <CreateWorkflowDialog 
          open={showCreateDialog} 
          onOpenChange={setShowCreateDialog}
        />
      </div>
    </div>
  )
}