import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./components/Homepage"; // Your LMS home page
import PaymentForm from "./components/PaymentForm";
import CourseForm from "./components/CourseForm";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/createCourse" element={<CourseForm />} />
        <Route path="/payment/:courseId" element={<PaymentForm />} /> 
        
      </Routes>
    </Router>
  );
}

export default App;
