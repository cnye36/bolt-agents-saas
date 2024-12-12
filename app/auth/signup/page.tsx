'use client'

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { bcrypt } from "@/lib/db"  // Use centralized bcrypt

export default function SignUpPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  })
  const [error, setError] = useState('')
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    // Basic validation
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match")
      return
    }

    try {
      const hashedPassword = await bcrypt.hash(formData.password, 10)

      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: hashedPassword  // Send hashed password
        })
      })

      if (response.ok) {
        router.push('/auth/login')
      } else {
        const errorData = await response.json()
        setError(errorData.message || "Signup failed")
      }
    } catch (err) {
      setError("An error occurred during signup")
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  return (
    <div className="container mx-auto max-w-md py-20">
      <h1 className="text-3xl font-bold mb-6 text-center">Sign Up</h1>
      {error && (
        <div className="text-red-500 text-center mb-4">
          {error}
        </div>
      )}
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input 
          type="text" 
          name="name"
          placeholder="Full Name" 
          value={formData.name}
          onChange={handleChange}
          required 
        />
        <Input 
          type="email" 
          name="email"
          placeholder="Email" 
          value={formData.email}
          onChange={handleChange}
          required 
        />
        <Input 
          type="password" 
          name="password"
          placeholder="Password" 
          value={formData.password}
          onChange={handleChange}
          required 
        />
        <Input 
          type="password" 
          name="confirmPassword"
          placeholder="Confirm Password" 
          value={formData.confirmPassword}
          onChange={handleChange}
          required 
        />
        <Button type="submit" className="w-full">
          Create Account
        </Button>
        <div className="text-center">
          <Link href="/auth/login" className="text-sm text-muted-foreground hover:underline">
            Already have an account? Log In
          </Link>
        </div>
      </form>
    </div>
  )
} 