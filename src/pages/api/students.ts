import type { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs/promises';
import path from 'path';

// API handler to serve student data
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    // Define the path to the students.json file
    const filePath = path.join(process.cwd(), 'data', 'students.json');

    // Read the students.json file
    const fileContents = await fs.readFile(filePath, 'utf-8');

    // Parse the JSON data
    const studentData = JSON.parse(fileContents);

    // Send the student data in the response
    res.status(200).json(studentData);
  } catch (error) {
    console.error('Error reading file:', error);
    res.status(500).json({ message: 'Failed to load student data' });
  }
}
