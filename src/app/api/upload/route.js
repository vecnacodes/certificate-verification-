import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

export async function POST(request) {
  try {
    const { students } = await request.json();

    if (!students || !Array.isArray(students)) {
      return NextResponse.json({ error: 'Invalid data format: students must be an array' }, { status: 400 });
    }

    if (students.length === 0) {
      return NextResponse.json({ error: 'No student data provided' }, { status: 400 });
    }

    // Validate student data
    const requiredFields = ['name', 'id', 'startDate', 'endDate', 'domain'];
    const invalidStudents = students.filter(student => 
      !requiredFields.every(field => student.hasOwnProperty(field) && student[field] !== '')
    );

    if (invalidStudents.length > 0) {
      return NextResponse.json({ 
        error: `Invalid student data: missing required fields`,
        invalidStudents
      }, { status: 400 });
    }

    const filePath = path.join(process.cwd(), 'src', 'lib', 'students.json');
    await fs.writeFile(filePath, JSON.stringify(students, null, 2));

    return NextResponse.json({ message: 'File uploaded successfully', students });
  } catch (error) {
    console.error('Error processing data:', error);
    return NextResponse.json({ error: `Error processing data: ${error.message}` }, { status: 500 });
  }
}