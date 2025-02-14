import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import PrivateRoute from "../components/PrivateRoute";
import LearnerViewCourse from "../components/LearnerViewCourse";
import EnrolledCourses from "../components/EnrolledCourses";
import CourseDisplay from "../components/CourseDsiplay";
import PaymentForm from "../components/PaymentForm";
import Support from "../components/Support";
import NavBar from "../components/NavBar"; // ✅ Import Learner NavBar
import CourseDisplayLocked from "../components/CourseDisplayLocked";

const LearnerRoutes = ({ user, handleLogout }) => {
  return (
    <>
      <NavBar user={user} onLogout={handleLogout} /> {/* ✅ Show only for learners */}
      <Routes>
        <Route path="/" element={<PrivateRoute element={<LearnerViewCourse learnerId={user.id} />} />} />
        <Route path="/course/:courseId" element={<CourseDisplayLocked />} />
        <Route path="/enrolled/:learnerId" element={<PrivateRoute element={<EnrolledCourses learnerId={user.id} />} />} />
        <Route path="/course-display/:courseId" element={<PrivateRoute element={<CourseDisplay />} />} />
        <Route path="/payment/:courseId" element={<PrivateRoute element={<PaymentForm learnerId={user.id} />} />} />
        <Route path="/support" element={<PrivateRoute element={<Support />} />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </>
  );
};

export default LearnerRoutes;
