"use client"

import { create } from 'zustand'
import { Workflow } from '@/lib/types'

interface WorkflowStore {
  workflows: Workflow[]
  activeWorkflow: Workflow | null
  addWorkflow: (workflow: Workflow) => void
  updateWorkflow: (id: string, workflow: Partial<Workflow>) => void
  deleteWorkflow: (id: string) => void
  setActiveWorkflow: (workflow: Workflow | null) => void
}

export const useWorkflowStore = create<WorkflowStore>((set) => ({
  workflows: [],
  activeWorkflow: null,
  addWorkflow: (workflow) =>
    set((state) => ({
      workflows: [...state.workflows, workflow],
    })),
  updateWorkflow: (id, updatedWorkflow) =>
    set((state) => ({
      workflows: state.workflows.map((workflow) =>
        workflow.id === id ? { ...workflow, ...updatedWorkflow } : workflow
      ),
    })),
  deleteWorkflow: (id) =>
    set((state) => ({
      workflows: state.workflows.filter((workflow) => workflow.id !== id),
    })),
  setActiveWorkflow: (workflow) =>
    set(() => ({
      activeWorkflow: workflow,
    })),
}))