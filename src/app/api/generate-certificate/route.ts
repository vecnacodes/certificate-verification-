import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import PDFDocument from 'pdfkit';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');

  if (!id) {
    return NextResponse.json({ error: 'Student ID is required' }, { status: 400 });
  }

  const dataPath = path.join(process.cwd(), 'src', 'lib', 'students.json');
  let students;
  try {
    const rawData = fs.readFileSync(dataPath, 'utf8');
    students = JSON.parse(rawData);
  } catch (error) {
    console.error('Error reading students data:', error);
    return NextResponse.json({ error: 'Error reading student data' }, { status: 500 });
  }

  const student = students.find((s: any) => s.id === id);

  if (!student) {
    return NextResponse.json({ error: 'Student not found' }, { status: 404 });
  }

  try {
    const doc = new PDFDocument({
      size: 'A4',
      layout: 'landscape',
      margins: { top: 50, bottom: 50, left: 50, right: 50 },
    });

    // Set up a buffer to collect PDF data
    const chunks: Buffer[] = [];
    doc.on('data', (chunk) => chunks.push(chunk));

    // When PDF is done being generated, resolve with the full buffer
    const pdfBuffer = await new Promise<Buffer>((resolve, reject) => {
      doc.on('end', () => {
        resolve(Buffer.concat(chunks));
      });

      doc.on('error', (err) => {
        reject(err);
      });

      // Add certificate content
      doc.fontSize(30).text('Certificate of Completion', { align: 'center' });
      doc.moveDown();
      doc.fontSize(20).text(`This is to certify that ${student.name}, { align: 'center' }`);
      doc.moveDown();
      doc.fontSize(20).text(`has successfully completed the course in ${student.course}, { align: 'center' }`);
      doc.moveDown();
      doc.fontSize(20).text(`with a grade of ${student.grade}, { align: 'center' }`);
      doc.moveDown();
      doc.fontSize(15).text(`Certificate ID: ${student.id}, { align: 'center' }`);

      // Finalize the PDF
      doc.end();
    });

    // Return the PDF buffer with appropriate headers
    return new NextResponse(pdfBuffer, {
      status: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition':`attachment; filename="certificate_${student.id}.pdf"`,
      },
    });
  } catch (error) {
    console.error('Error generating PDF:', error);
    return NextResponse.json({ error: 'Error generating certificate' }, { status: 500 });
  }
}