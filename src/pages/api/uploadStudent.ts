import type { NextApiRequest, NextApiResponse } from 'next';
import students from '../../lib/students.json'; // Adjust the path as needed

interface Student {
  name: string;
  id: string;
  startDate: string;
  endDate: string;
  domain: string;
}

// Helper function to simulate saving data
const saveStudentData = (data: Student[]) => {
  // Simulate saving data, you can integrate with a database or any other storage
  console.log('Saving student data:', data);
  // For now, we just return a success message
  return { message: 'Student data successfully saved!' };
};

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      // Parse incoming student data
      const studentData: Student[] = req.body;

      // Validate the incoming data (basic example)
      if (!Array.isArray(studentData) || studentData.length === 0) {
        return res.status(400).json({ message: 'Invalid data format. Expected an array of students.' });
      }

      // Save the student data (e.g., to a database or file)
      const result = saveStudentData(studentData);

      // Respond with success message
      res.status(200).json(result);
    } catch (error) {
      console.error('Error occurred:', error);
      res.status(500).json({ message: 'An error occurred while processing the request.' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
