'use client'

import React, { useState, useRef } from 'react'
import { motion } from 'framer-motion'
import { Search, Download } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { saveAs } from 'file-saver'

// Mock student data for 10 students
const studentData: { [key: string]: Student } = {
  "12345": { name: "John Doe", id: "12345", startDate: "2023-01-01", endDate: "2023-06-30", domain: "Web Development" },
  "67890": { name: "Jane Smith", id: "67890", startDate: "2023-02-15", endDate: "2023-08-15", domain: "Data Science" },
  "13579": { name: "Alice Johnson", id: "13579", startDate: "2023-03-01", endDate: "2023-09-01", domain: "Machine Learning" },
  "24680": { name: "Bob Williams", id: "24680", startDate: "2023-04-01", endDate: "2023-10-01", domain: "Mobile App Development" },
  "98765": { name: "Charlie Brown", id: "98765", startDate: "2023-05-01", endDate: "2023-11-01", domain: "Cybersecurity" },
  "54321": { name: "Diana Miller", id: "54321", startDate: "2023-06-01", endDate: "2023-12-01", domain: "Cloud Computing" },
  "11223": { name: "Ethan Davis", id: "11223", startDate: "2023-07-01", endDate: "2024-01-01", domain: "Artificial Intelligence" },
  "44556": { name: "Fiona Wilson", id: "44556", startDate: "2023-08-01", endDate: "2024-02-01", domain: "Blockchain" },
  "77889": { name: "George Taylor", id: "77889", startDate: "2023-09-01", endDate: "2024-03-01", domain: "IoT Development" },
  "10101": { name: "Hannah Anderson", id: "10101", startDate: "2023-10-01", endDate: "2024-04-01", domain: "DevOps" }
}

interface Student {
  name: string;
  id: string;
  startDate: string;
  endDate: string;
  domain: string;
}

export default function CertificateVerification() {
  const [searchId, setSearchId] = useState('')
  const [student, setStudent] = useState<Student | null>(null)
  const [isSearching, setIsSearching] = useState(false)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const handleSearch = () => {
    setIsSearching(true)
    // Simulate API call
    setTimeout(() => {
      const foundStudent = studentData[searchId] || null
      setStudent(foundStudent)
      setIsSearching(false)
    }, 1000)
  }

  const handleDownload = () => {
    if (!student) return

    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Set canvas size
    canvas.width = 800
    canvas.height = 600

    // Draw certificate background
    ctx.fillStyle = '#f0f0f0'
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    // Draw border
    ctx.strokeStyle = '#000000'
    ctx.lineWidth = 10
    ctx.strokeRect(10, 10, canvas.width - 20, canvas.height - 20)

    // Draw title
    ctx.font = 'bold 40px Arial'
    ctx.fillStyle = '#000000'
    ctx.textAlign = 'center'
    ctx.fillText('Certificate of Completion', canvas.width / 2, 80)

    // Draw student name
    ctx.font = 'bold 30px Arial'
    ctx.fillText(student.name, canvas.width / 2, 180)

    // Draw course details
    ctx.font = '20px Arial'
    ctx.fillText(`has successfully completed the course in ${student.domain}`, canvas.width / 2, 240)
    ctx.fillText(`from ${student.startDate} to ${student.endDate}`, canvas.width / 2, 280)

    // Draw ID
    ctx.font = '16px Arial'
    ctx.fillText(`Certificate ID: ${student.id}`, canvas.width / 2, 540)

    // Convert canvas to blob and download
    canvas.toBlob((blob) => {
      if (blob) {
        saveAs(blob, `${student.name.replace(' ', '_')}_Certificate.png`)
      }
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 to-indigo-200 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center text-primary">Certificate Verification</CardTitle>
          <CardDescription className="text-center">Enter your unique ID to verify your certificate</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex space-x-2 mb-4">
            <Input
              type="text"
              placeholder="Enter your ID"
              value={searchId}
              onChange={(e) => setSearchId(e.target.value)}
              className="flex-grow"
            />
            <Button onClick={handleSearch} disabled={isSearching}>
              {isSearching ? (
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                >
                  <Search className="h-4 w-4" />
                </motion.div>
              ) : (
                <Search className="h-4 w-4" />
              )}
            </Button>
          </div>
          {student && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mt-4"
            >
              <h3 className="font-semibold text-lg mb-2">Student Information</h3>
              <p><strong>Name:</strong> {student.name}</p>
              <p><strong>ID:</strong> {student.id}</p>
              <p><strong>Start Date:</strong> {student.startDate}</p>
              <p><strong>End Date:</strong> {student.endDate}</p>
              <p><strong>Domain:</strong> {student.domain}</p>
            </motion.div>
          )}
        </CardContent>
        {student && (
          <CardFooter>
            <Button onClick={handleDownload} className="w-full">
              <Download className="mr-2 h-4 w-4" />
              Download Certificate
            </Button>
          </CardFooter>
        )}
      </Card>
      <canvas ref={canvasRef} className="hidden" />
    </div>
  )
}