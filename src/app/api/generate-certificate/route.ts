import { NextResponse } from 'next/server'
import fs from 'fs/promises'
import path from 'path'
import PDFDocument from 'pdfkit'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const id = searchParams.get('id')

  if (!id) {
    return NextResponse.json({ error: 'Certificate ID is required' }, { status: 400 })
  }

  try {
    const filePath = path.join(process.cwd(), 'src', 'lib', 'students.json')
    const data = await fs.readFile(filePath, 'utf-8')
    const students = JSON.parse(data)

    const student = students.find((s: any) => s.id === id)

    if (!student) {
      return NextResponse.json({ error: 'Certificate not found' }, { status: 404 })
    }

    const pdfBuffer = await generateCertificate(student)

    return new NextResponse(pdfBuffer, {
      status: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="certificate_${id}.pdf"`,
      },
    })
  } catch (error) {
    console.error('Error generating certificate:', error)
    return NextResponse.json({ error: 'Failed to generate certificate' }, { status: 500 })
  }
}

async function generateCertificate(student: any): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    const doc = new PDFDocument({
      layout: 'landscape',
      size: 'A4',
    })

    const chunks: Uint8Array[] = []
    doc.on('data', (chunk) => chunks.push(chunk))
    doc.on('end', () => resolve(Buffer.concat(chunks)))

    // Add content to the PDF
    doc
      .font('Helvetica-Bold')
      .fontSize(30)
      .text('Certificate of Completion', 0, 100, { align: 'center' })

    doc
      .font('Helvetica')
      .fontSize(20)
      .text(`This is to certify that`, 0, 180, { align: 'center' })

    doc
      .font('Helvetica-Bold')
      .fontSize(24)
      .text(student.name, 0, 220, { align: 'center' })

    doc
      .font('Helvetica')
      .fontSize(20)
      .text(`has successfully completed the internship in`, 0, 260, { align: 'center' })

    doc
      .font('Helvetica-Bold')
      .fontSize(24)
      .text(student.domain, 0, 300, { align: 'center' })

    doc
      .font('Helvetica')
      .fontSize(20)
      .text(`from ${student.startDate} to ${student.endDate}`, 0, 340, { align: 'center' })

    doc
      .font('Helvetica')
      .fontSize(14)
      .text(`Certificate ID: ${student.id}`, 0, 400, { align: 'center' })

    doc.end()
  })
}