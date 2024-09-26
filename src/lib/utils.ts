// src/lib/utils.ts
export function cn(...classes: string[]) {
    return classes.filter(Boolean).join(' ');
  }
  export const loadStudentData = async () => {
    const response = await fetch('/api/students');
    if (!response.ok) {
      throw new Error('Failed to load student data');
    }
    const data = await response.json();
    return data.students; // Accessing the 'students' array from the API response
  };
  