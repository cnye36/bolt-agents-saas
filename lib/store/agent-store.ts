import { create } from 'zustand'
import { AgentConfig, AgentType } from '@/lib/types'

interface AgentStore {
  agents: AgentConfig[]
  addAgent: (agent: AgentConfig) => void
  updateAgent: (id: string, agent: Partial<AgentConfig>) => void
  deleteAgent: (id: string) => void
}

export const useAgentStore = create<AgentStore>((set) => ({
  agents: [],
  addAgent: (agent) =>
    set((state) => ({
      agents: [...state.agents, agent],
    })),
  updateAgent: (id, updatedAgent) =>
    set((state) => ({
      agents: state.agents.map((agent) =>
        agent.id === id ? { ...agent, ...updatedAgent } : agent
      ),
    })),
  deleteAgent: (id) =>
    set((state) => ({
      agents: state.agents.filter((agent) => agent.id !== id),
    })),
}))