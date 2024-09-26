import { NextRequest, NextResponse } from 'next/server';
import type { Student } from '@/components/ui/Student'; // Adjust the path as needed

export async function POST(request: NextRequest) {
  try {
    const student: Student = await request.json();

    // Process student data
    return NextResponse.json({ message: 'Student data received', student });
  } catch (error) {
    console.error('Error occurred:', error); // Logging the error

    // Handle the unknown error
    if (error instanceof Error) {
      return NextResponse.json({ message: `Error: ${error.message}` }, { status: 500 });
    }

    return NextResponse.json({ message: 'An unknown error occurred' }, { status: 500 });
  }
}

