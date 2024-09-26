import { NextResponse } from 'next/server';
import fs from 'fs/promises';  // Use promises version of fs
import path from 'path';

export async function GET(request) {
  try {
    // Get the search params from the request URL
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    // Return an error if no ID is provided
    if (!id) {
      return NextResponse.json({ error: 'Certificate ID is required' }, { status: 400 });
    }

    // Construct the path to the students.json file
    const filePath = path.join(process.cwd(), 'src', 'lib', 'students.json');

    // Read the students.json file asynchronously
    const fileContents = await fs.readFile(filePath, 'utf8');
    const students = JSON.parse(fileContents);

    // Find the student by ID
    const student = students.find(s => s.id === id);

    // If student is found, return the student details
    if (student) {
      return NextResponse.json(student);
    } else {
      // Return a 404 response if no student is found
      return NextResponse.json({ error: 'Certificate not found' }, { status: 404 });
    }
  } catch (error) {
    console.error('Error verifying certificate:', error);
    // Return a 500 response if there is an error
    return NextResponse.json({ error: 'Failed to verify certificate' }, { status: 500 });
  }
}
