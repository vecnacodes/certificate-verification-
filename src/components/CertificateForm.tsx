'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'

type VerificationResult = {
  id: string
  name: string
  startDate: string
  endDate: string
  domain: string
} | null

export default function CertificateVerificationForm() {
  const [certificateId, setCertificateId] = useState('')
  const [verificationResult, setVerificationResult] = useState<VerificationResult>(null)
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setVerificationResult(null)
    setIsLoading(true)

    try {
      const response = await fetch(`/api/verify?id=${certificateId}`)
      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Failed to verify certificate')
      }
      const data = await response.json()
      setVerificationResult(data)
    } catch (error) {
      console.error('Error verifying certificate:', error)
      setError('An error occurred while verifying the certificate')
    } finally {
      setIsLoading(false)
    }
  }

  const handleDownload = async () => {
    if (!verificationResult) return

    try {
      const response = await fetch(`/api/generate-certificate?id=${verificationResult.id}`)
      
      if (!response.ok) {
        throw new Error('Failed to generate certificate')
      }

      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.style.display = 'none'
      a.href = url
      a.download = `certificate_${verificationResult.id}.pdf`
      document.body.appendChild(a)
      a.click()
      window.URL.revokeObjectURL(url)
    } catch (error) {
      console.error('Error generating certificate:', error)
      setError('An error occurred while generating the certificate')
    }
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Verify Certificate</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <Input
              type="text"
              placeholder="Enter Certificate ID"
              value={certificateId}
              onChange={(e) => setCertificateId(e.target.value)}
              required
            />
          </div>
          <Button type="submit" disabled={isLoading}>
            {isLoading ? 'Verifying...' : 'Verify'}
          </Button>
        </form>
      </CardContent>
      {verificationResult && (
        <CardFooter className="flex flex-col items-start">
          <div className="space-y-2 mb-4">
            <p><strong>Name:</strong> {verificationResult.name}</p>
            <p><strong>Domain:</strong> {verificationResult.domain}</p>
            <p><strong>Start Date:</strong> {verificationResult.startDate}</p>
            <p><strong>End Date:</strong> {verificationResult.endDate}</p>
          </div>
          <Button onClick={handleDownload}>Download Certificate</Button>
        </CardFooter>
      )}
      {error && (
        <CardFooter>
          <p className="text-red-500">{error}</p>
        </CardFooter>
      )}
    </Card>
  )
}
