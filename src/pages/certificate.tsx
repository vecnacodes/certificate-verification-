import React from 'react';
import PDFGenerator from '@/components/ui/pdfUtils'; // Adjust the path if needed

const student = {
  name: "John Doe",
  id: "12345",
  startDate: "2023-01-01",
  endDate: "2023-06-30",
  domain: "Web Development"
};

const CertificatePage: React.FC = () => {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Certificate Page</h1>
      <PDFGenerator student={student} />
    </div>
  );
};

export default CertificatePage;
