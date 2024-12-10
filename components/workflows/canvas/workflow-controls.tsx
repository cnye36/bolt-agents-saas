"use client"

import { Panel } from 'reactflow'
import { Button } from '@/components/ui/button'
import { Save } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'

export function WorkflowControls() {
  const { toast } = useToast()

  const handleSaveWorkflow = () => {
    toast({
      title: "Workflow Saved",
      description: "Your workflow has been saved successfully.",
    })
  }

  return (
    <Panel position="top-right">
      <Button variant="secondary" onClick={handleSaveWorkflow}>
        <Save className="mr-2 h-4 w-4" />
        Save Workflow
      </Button>
    </Panel>
  )
}