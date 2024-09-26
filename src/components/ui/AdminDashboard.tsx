"use client";
import { Student } from './Student';
import { useState } from 'react';
import { Button } from './button';
import { Input } from './input';
import { Card, CardContent, CardHeader, CardTitle } from './card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './table';
import * as XLSX from 'xlsx';
import { useStudentContext } from '@/components/ui/Studentcontext';

const readExcelFile = (file: File): Promise<Student[]> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = new Uint8Array(e.target?.result as ArrayBuffer);
        const workbook = XLSX.read(data, { type: 'array' });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const jsonData = XLSX.utils.sheet_to_json(worksheet);

        const students = jsonData.map((row: any) => ({
          name: String(row.name || ''),
          id: String(row.id || ''),
          startDate: String(row.startDate || ''),
          endDate: String(row.endDate || ''),
          domain: String(row.domain || '')
        }));

        resolve(students);
      } catch (error) {
        reject(error);
      }
    };
    reader.onerror = (error) => reject(error);
    reader.readAsArrayBuffer(file);
  });
};

export default function AdminDashboard() {
  const { students, setStudents } = useStudentContext(); 
  const [file, setFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) return;

    setIsLoading(true);
    setError(null);

    try {
      const data = await readExcelFile(file);
      console.log('Parsed Excel data:', data);

      
      setStudents(data);

      console.log('Upload successful');
    } catch (error) {
      console.error('Error uploading file:', error);
      setError('An error occurred while uploading the file');
    }

    setIsLoading(false);
  };

  return (
    <Card className="w-full max-w-4xl">
      <CardHeader>
        <CardTitle>Upload Student Data</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="mb-6">
          <div className="mb-4">
            <Input type="file" accept=".xlsx,.xls" onChange={handleFileChange} required />
          </div>
          <Button type="submit" disabled={isLoading}>
            {isLoading ? 'Uploading...' : 'Upload'}
          </Button>
        </form>

        {error && <p className="text-red-500 mb-4">{error}</p>}

        {students.length > 0 && (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>ID</TableHead>
                <TableHead>Start Date</TableHead>
                <TableHead>End Date</TableHead>
                <TableHead>Domain</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {students.map((student, index) => (
                <TableRow key={index}>
                  <TableCell>{student.name}</TableCell>
                  <TableCell>{student.id}</TableCell>
                  <TableCell>{student.startDate}</TableCell>
                  <TableCell>{student.endDate}</TableCell>
                  <TableCell>{student.domain}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  );
}
