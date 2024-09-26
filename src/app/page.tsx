'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface Student {
  id: string;
  name: string;
  course: string;
  grade: string;
}

export default function Home() {
  const [id, setId] = useState('');
  const [student, setStudent] = useState<Student | null>(null);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [downloadError, setDownloadError] = useState('');
  const [isDownloading, setIsDownloading] = useState(false);

  const handleSearch = async () => {
    setIsLoading(true);
    setError('');
    setStudent(null);

    try {
      const response = await fetch(`/api/search?id=${id}`);
      if (response.ok) {
        const data: Student = await response.json();
        setStudent(data);
      } else {
        const errorData = await response.json();
        setError(errorData.error || 'Student not found');
      }
    } catch (error) {
      console.error('Error searching for student:', error);
      setError('An error occurred while searching');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDownload = async () => {
    if (student) {
      setDownloadError('');
      setIsDownloading(true);
      try {
        const response = await fetch(`/api/generate-certificate?id=${student.id}`);
        if (response.ok) {
          const blob = await response.blob();
          const url = window.URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.style.display = 'none';
          a.href = url;
          a.download = `certificate_${student.id}.pdf`;
          document.body.appendChild(a);
          a.click();
          window.URL.revokeObjectURL(url);
        } else {
          const errorText = await response.text();
          throw new Error(`Failed to generate certificate: ${errorText}`);
        }
      } catch (error) {
        console.error('Error downloading certificate:', error);
        setDownloadError(`Failed to download certificate: ${error instanceof Error ? error.message : 'Unknown error'}`);
      } finally {
        setIsDownloading(false);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-white flex flex-col items-center justify-center p-4">
      <Card className="w-full max-w-2xl shadow-lg">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold text-blue-600">Certificate Verification</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="flex space-x-2">
              <Input
                type="text"
                value={id}
                onChange={(e) => setId(e.target.value)}
                placeholder="Enter student ID"
                className="flex-grow"
              />
              <Button onClick={handleSearch} disabled={isLoading}>
                {isLoading ? 'Searching...' : 'Search'}
              </Button>
            </div>
            {error && <p className="text-red-500 text-center">{error}</p>}
            {student && (
              <div className="bg-white p-6 rounded-lg shadow-md space-y-4">
                <h2 className="text-2xl font-bold text-center text-blue-700">{student.name}</h2>
                <div className="grid grid-cols-2 gap-4 text-gray-700">
                  <p><span className="font-semibold">ID:</span> {student.id}</p>
                  <p><span className="font-semibold">Course:</span> {student.course}</p>
                  <p><span className="font-semibold">Grade:</span> {student.grade}</p>
                </div>
                <div className="flex justify-center mt-4">
                  <Button onClick={handleDownload} disabled={isDownloading} className="bg-green-500 hover:bg-green-600">
                    {isDownloading ? 'Generating...' : 'Download Certificate'}
                  </Button>
                </div>
              </div>
            )}
            {downloadError && <p className="text-red-500 text-center mt-2">{downloadError}</p>}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}