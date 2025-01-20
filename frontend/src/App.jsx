import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./components/Homepage"; // Your LMS home page
import PaymentForm from "./components/PaymentForm";
import CourseForm from "./components/CourseForm";
import AIExamForm from "./components/AIExamForm"; // Import AI Exam Form
import Support from "./components/Support"; // Import Support Component

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/createCourse" element={<CourseForm />} />
        <Route path="/createAIExam" element={<AIExamForm />} /> {/* New Route for AI Exam */}
        <Route path="/payment/:courseId" element={<PaymentForm />} />
        <Route path="/support" element={<Support />} /> {/* New Route for Support */}
      </Routes>
    </Router>
  );
}

export default App;
