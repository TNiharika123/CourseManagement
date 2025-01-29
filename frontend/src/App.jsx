import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import PaymentForm from "./components/PaymentForm";
import CourseForm from "./components/CourseForm";
import AIExamForm from "./components/AIExamForm";
import Support from "./components/Support";
import LearnerViewCourse from "./components/LearnerViewCourse";
import RegistrationPage from "./components/RegistrationPage";
import EnrolledCourses from "./components/EnrolledCourses";
import InstructorChangeCourse from "./components/InstructorChangeCourse";
import LoginPage from "./components/LoginPage";
import PrivateRoute from "./components/PrivateRoute";
import NavBar from "./components/NavBar";

const App = () => {
  const [learnerId, setLearnerId] = useState(null);

  useEffect(() => {
    const storedUserId = localStorage.getItem("userId");
    if (storedUserId) {
      setLearnerId(storedUserId);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("userId");
    setLearnerId(null);
  };

  return (
    <Router>
      {/* Always render NavBar and pass learnerId */}
      <NavBar learnerId={learnerId} onLogout={handleLogout} />

      <Routes>
        {/* Public routes */}
        <Route
          path="/login"
          element={<LoginPage setLearnerId={setLearnerId} />}
        />
        <Route
          path="/register"
          element={<RegistrationPage setLearnerId={setLearnerId} />}
        />

        {/* Protected routes */}
        <Route
          path="/"
          element={
            learnerId ? (
              <PrivateRoute
                element={<LearnerViewCourse learnerId={learnerId} />}
              />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route
          path="/enrolled/:learnerId"
          element={
            learnerId ? (
              <PrivateRoute
                element={<EnrolledCourses learnerId={learnerId} />}
              />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route
          path="/support"
          element={<PrivateRoute element={<Support />} />}
        />
        <Route
          path="/updateCourse"
          element={<PrivateRoute element={<InstructorChangeCourse />} />}
        />
        <Route
          path="/createCourse"
          element={<PrivateRoute element={<CourseForm />} />}
        />
        <Route
          path="/createAIExam"
          element={<PrivateRoute element={<AIExamForm />} />}
        />
        <Route
          path="/payment/:courseId"
          element={
            <PrivateRoute element={<PaymentForm learnerId={learnerId} />} />
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
