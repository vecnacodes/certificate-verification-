'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';


interface Student {
  id: string;
  name: string;
  
}

export default function SearchStudent() {
  const [id, setId] = useState('');
  const [student, setStudent] = useState<Student | null>(null);
  const [error, setError] = useState('');

  const handleSearch = async () => {
    try {
      const response = await fetch(`/api/search?id=${id}`);
      if (response.ok) {
        const data: Student = await response.json();
        setStudent(data);
        setError('');
      } else {
        setStudent(null);
        setError('Student not found');
      }
    } catch (error) {
      console.error('Error searching for student:', error);
      setError('An error occurred while searching');
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex space-x-2">
        <Input
          type="text"
          value={id}
          onChange={(e) => setId(e.target.value)}
          placeholder="Enter student ID"
        />
        <Button onClick={handleSearch}>Search</Button>
      </div>
      {error && <p className="text-red-500">{error}</p>}
      {student && (
        <div>
          <h2 className="text-xl font-bold">{student.name}</h2>
          <p>ID: {student.id}</p>
        
          <Button onClick={() => window.open(`/api/generate-certificate?id=${student.id}`, '_blank')}>
            Download Certificate
          </Button>
        </div>
      )}
    </div>
  );
}