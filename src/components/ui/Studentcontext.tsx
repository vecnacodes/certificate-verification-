"use client";
import React, { createContext, useContext, useState, ReactNode } from 'react';
// Define the Student type
type Student = {
  name: string;
  id: string;
  startDate: string;
  endDate: string;
  domain: string;
};

// Define the shape of the context
interface StudentContextType {
  students: Student[];
  setStudents: React.Dispatch<React.SetStateAction<Student[]>>;
}

// Create the context with an empty default value
const StudentContext = createContext<StudentContextType | undefined>(undefined);

// Create a provider component
export const StudentProvider = ({ children }: { children: ReactNode }) => {
  const [students, setStudents] = useState<Student[]>([]);

  return (
    <StudentContext.Provider value={{ students, setStudents }}>
      {children}
    </StudentContext.Provider>
  );
};

// Custom hook to use the StudentContext
export const useStudentContext = () => {
  const context = useContext(StudentContext);
  if (!context) {
    throw new Error('useStudentContext must be used within a StudentProvider');
  }
  return context;
};
