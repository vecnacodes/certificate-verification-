'use client';

import React, { useRef } from 'react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

// Define the Student interface
interface Student {
  name: string;
  domain: string;
  startDate: string;
  endDate: string;
}

export default function CertificateTemplate({ student }: { student: Student }) {
  const certificateRef = useRef<HTMLDivElement>(null);

  const downloadCertificate = () => {
    if (certificateRef.current) {
      html2canvas(certificateRef.current)
        .then((canvas) => {
          const imgData = canvas.toDataURL('image/png');
          const pdf = new jsPDF('l', 'mm', 'a4');
          const imgProps = pdf.getImageProperties(imgData);
          const pdfWidth = pdf.internal.pageSize.getWidth();
          const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
          pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
          pdf.save(`${student.name}_certificate.pdf`);
        })
        .catch((error) => {
          console.error('Error generating certificate:', error);
        });
    }
  };

  return (
    <div className="mt-8">
      <div
        ref={certificateRef}
        className="bg-gray-100 p-8 rounded-lg border-4 border-indigo-600"
      >
        <h2 className="text-3xl font-bold text-center mb-4">
          Certificate of Completion
        </h2>
        <p className="text-center text-xl mb-8">This is to certify that</p>
        <p className="text-center text-2xl font-bold mb-4">{student.name}</p>
        <p className="text-center text-xl mb-8">
          has successfully completed the internship in {student.domain}
        </p>
        <p className="text-center">
          From {student.startDate} to {student.endDate}
        </p>
      </div>
      <button
        onClick={downloadCertificate}
        className="mt-4 bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-colors"
        aria-label="Download Certificate"
      >
        Download Certificate
      </button>
    </div>
  );
}
