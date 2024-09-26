"use client";

import React, { useEffect, useState } from "react";
import { useStudentContext } from "@/components/ui/Studentcontext"; // Adjust the import path as necessary

const StudentPage = () => {
  const { students } = useStudentContext();
  const [student, setStudent] = useState<any>(null); // Adjust type as needed
  const [id, setId] = useState<string>(""); // or get ID from URL params

  useEffect(() => {
    // Assuming you get ID from URL params or other sources
    const fetchStudent = async () => {
      // Replace this with your logic to get student data by ID
      const foundStudent = students.find((s) => s.id === id);
      setStudent(foundStudent || null);
    };

    fetchStudent();
  }, [id, students]);

  if (!student) {
    return <p>Student not found</p>;
  }

  return (
    <div className="student-details">
      <h1>Student Details</h1>
      <p>Name: {student.name}</p>
      <p>ID: {student.id}</p>
      <p>Start Date: {student.startDate}</p>
      <p>End Date: {student.endDate}</p>
      <p>Domain: {student.domain}</p>
    </div>
  );
};

export default StudentPage;
