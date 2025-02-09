import React, { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import PrivateRoute from "../components/PrivateRoute";
import InstructorChangeCourse from "../components/InstructorChangeCourse";
import CourseForm from "../components/CourseForm";
import AIExamForm from "../components/AIExamForm";
import InstructorNavBar from "../components/InstructorNavBar";
import TrackLearnersForInstructor from "../components/TrackLearnersForInstructors";
import InstructorSupport from "../components/InstructorSupport";
import InstructorCourseManagement from "../components/InstructorCourseManagement";

const InstructorRoutes = ({ user, handleLogout }) => {
  const [open, setOpen] = useState(true);

  return (
    <InstructorNavBar user={user} onLogout={handleLogout} open={open} setOpen={setOpen}>
      <Routes>
        <Route path="/updateCourse" element={<PrivateRoute element={<InstructorChangeCourse sidebarOpen={open} />} />} />
        <Route path="/createCourse" element={<PrivateRoute element={<CourseForm sidebarOpen={open} />} />} />
        <Route path="/createAIExam" element={<PrivateRoute element={<AIExamForm sidebarOpen={open} />} />} />
        <Route path="*" element={<Navigate to="/updateCourse" />} />
        <Route path="/trackLearners" element={<PrivateRoute element={<TrackLearnersForInstructor sidebarOpen={open}/>} />} />
        <Route path="/instructor/course/:courseId" element={<PrivateRoute element={<InstructorCourseManagement sidebarOpen={open}/>} />} />

        <Route path="/support" element={<PrivateRoute element={<InstructorSupport />} />} />


      </Routes>
    </InstructorNavBar>
  );
};

export default InstructorRoutes;
