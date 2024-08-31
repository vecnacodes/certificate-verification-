import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'Certificate ID is required' }, { status: 400 });
    }

    const filePath = path.join(process.cwd(), 'src', 'lib', 'students.json');
    const fileContents = fs.readFileSync(filePath, 'utf8');
    const students = JSON.parse(fileContents);

    const student = students.find(s => s.id === id);

    if (student) {
      return NextResponse.json(student);
    } else {
      return NextResponse.json({ error: 'Certificate not found' }, { status: 404 });
    }
  } catch (error) {
    console.error('Error verifying certificate:', error);
    return NextResponse.json({ error: 'Failed to verify certificate' }, { status: 500 });
  }
}