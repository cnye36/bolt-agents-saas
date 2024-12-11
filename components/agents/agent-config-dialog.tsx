"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Slider } from "@/components/ui/slider"
import { AgentConfig } from "@/lib/types"
import { useAgentStore } from "@/lib/store/agent-store"

interface AgentConfigDialogProps {
  agent?: AgentConfig
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function AgentConfigDialog({ agent, open, onOpenChange }: AgentConfigDialogProps) {
  const updateAgent = useAgentStore((state) => state.updateAgent)
  const [config, setConfig] = useState(agent || {
    name: "",
    description: "",
    type: "conversational",
    model: "gpt-4",
    temperature: 0.7,
    maxTokens: 1000,
    systemPrompt: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (agent) {
      updateAgent(agent.id, config)
    }
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>{agent ? "Edit Agent" : "Create New Agent"}</DialogTitle>
        </DialogHeader>
        <Tabs defaultValue="basic">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="basic">Basic</TabsTrigger>
            <TabsTrigger value="advanced">Advanced</TabsTrigger>
            <TabsTrigger value="auth">Authentication</TabsTrigger>
          </TabsList>
          <form onSubmit={handleSubmit}>
            <TabsContent value="basic" className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  value={config.name}
                  onChange={(e) => setConfig({ ...config, name: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={config.description}
                  onChange={(e) => setConfig({ ...config, description: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="systemPrompt">System Prompt</Label>
                <Textarea
                  id="systemPrompt"
                  value={config.systemPrompt}
                  onChange={(e) => setConfig({ ...config, systemPrompt: e.target.value })}
                />
              </div>
            </TabsContent>
            <TabsContent value="advanced" className="space-y-4">
              <div className="space-y-2">
                <Label>Temperature</Label>
                <Slider
                  value={[config.temperature]}
                  min={0}
                  max={1}
                  step={0.1}
                  onValueChange={([value]) => setConfig({ ...config, temperature: value })}
                />
              </div>
              <div className="space-y-2">
                <Label>Max Tokens</Label>
                <Slider
                  value={[config.maxTokens]}
                  min={100}
                  max={4000}
                  step={100}
                  onValueChange={([value]) => setConfig({ ...config, maxTokens: value })}
                />
              </div>
            </TabsContent>
            <TabsContent value="auth" className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="apiKey">API Key</Label>
                <Input
                  id="apiKey"
                  type="password"
                  value={config.authConfig?.apiKey || ""}
                  onChange={(e) => setConfig({
                    ...config,
                    authConfig: { ...config.authConfig, apiKey: e.target.value }
                  })}
                />
              </div>
            </TabsContent>
            <div className="flex justify-end space-x-2 mt-4">
              <Button variant="outline" onClick={() => onOpenChange(false)}>
                Cancel
              </Button>
              <Button type="submit">Save Changes</Button>
            </div>
          </form>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}