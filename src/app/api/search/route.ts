import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');

  const dataPath = path.join(process.cwd(), 'src', 'lib', 'students.json');
  const rawData = fs.readFileSync(dataPath, 'utf8');
  const students = JSON.parse(rawData);

  const student = students.find((s: any) => s.id === id);

  if (student) {
    return NextResponse.json(student);
  } else {
    return NextResponse.json({ error: 'Student not found' }, { status: 404 });
  }
}