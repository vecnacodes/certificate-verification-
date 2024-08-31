// src/components/ui/pdfUtils.ts
import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';
import { Student } from './Student'; // Adjust the path if needed

export const generateAndDownloadPDF = async (student: Student) => {
  if (!student) return;

  // Create a new PDF document
  const pdfDoc = await PDFDocument.create();
  const page = pdfDoc.addPage([600, 400]);
  const { width, height } = page.getSize();

  // Set up the font and color
  const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const fontSize = 24;
  const color = rgb(0, 0, 0);

  // Add text to the PDF
  page.drawText(`Certificate of Completion`, {
    x: 50,
    y: height - 100,
    size: fontSize,
    font,
    color
  });

  page.drawText(`Name: ${student.name}`, {
    x: 50,
    y: height - 150,
    size: 18,
    font,
    color
  });

  page.drawText(`ID: ${student.id}`, {
    x: 50,
    y: height - 180,
    size: 18,
    font,
    color
  });

  page.drawText(`Start Date: ${student.startDate}`, {
    x: 50,
    y: height - 210,
    size: 18,
    font,
    color
  });

  page.drawText(`End Date: ${student.endDate}`, {
    x: 50,
    y: height - 240,
    size: 18,
    font,
    color
  });

  page.drawText(`Domain: ${student.domain}`, {
    x: 50,
    y: height - 270,
    size: 18,
    font,
    color
  });

  // Serialize the document to bytes
  const pdfBytes = await pdfDoc.save();

  // Create a Blob and trigger download
  const blob = new Blob([pdfBytes], { type: 'application/pdf' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = 'certificate.pdf';
  link.click();

  // Clean up
  URL.revokeObjectURL(url);
};
