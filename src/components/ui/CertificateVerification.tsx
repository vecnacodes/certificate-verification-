"use client";
import React, { useState } from 'react'
import { motion } from 'framer-motion'; 
import { Search } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { useStudentContext } from "@/components/ui/Studentcontext"; // Import useStudentContext hook
type Student = {
  name: string;
  id: string;
  startDate: string;
  endDate: string;
  domain: string;
};


export default function CertificateVerification() {
  const { students } = useStudentContext(); // Access the global student state
  const [searchId, setSearchId] = useState('')
  const [student, setStudent] = useState<Student | null>(null)
  const [isSearching, setIsSearching] = useState(false)

  const handleSearch = () => {
    setIsSearching(true)
    // Simulate API call
    setTimeout(() => {
      // Find student by ID from the global state
      setStudent(students.find(student => student.id === searchId) || null)
      setIsSearching(false)
    }, 1000)
  }

  const handleDownload = () => {
    // In a real app, this would generate and download the certificate
    alert("Downloading certificate...")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 to-indigo-200 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center text-primary">Certificate Verification</CardTitle>
          <CardDescription className="text-center">Enter your unique ID to verify your certificate</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex space-x-2">
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
              Download Certificate
            </Button>
          </CardFooter>
        )}
      </Card>
    </div>
  )
}
