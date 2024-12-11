export interface AgentConfig {
  id: string
  name: string
  type: AgentType
  description: string
  model: string
  temperature: number
  maxTokens: number
  systemPrompt: string
  apiEndpoint?: string
  authConfig?: {
    apiKey?: string
    authType: 'none' | 'apiKey' | 'oauth'
  }
  status: 'active' | 'inactive' | 'error'
  createdAt: Date
  updatedAt: Date
}

export enum AgentType {
  Conversational = 'conversational',
  QuestionAnswering = 'question-answering',
  Summarization = 'summarization',
  Custom = 'custom',
}

export interface WorkflowNode {
  id: string
  type: string
  position: { x: number; y: number }
  data: AgentConfig
}

export interface WorkflowEdge {
  id: string
  source: string
  target: string
}

export interface Workflow {
  id: string
  name: string
  description: string
  nodes: WorkflowNode[]
  edges: WorkflowEdge[]
  createdAt: Date
  updatedAt: Date
}