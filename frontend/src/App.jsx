import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import LearnerRoutes from "./routes/LearnerRoutes";
import InstructorRoutes from "./routes/InstructorRoutes";
import LearnerLogin from "./components/LearnerLogin";
import InstructorLogin from "./components/InstructorLogin";
import RegistrationPage from "./components/RegistrationPage";
import InstructorRegister from "./components/InstructorRegister";

const theme = createTheme({
  palette: {
    primary: { main: "#1976d2" },
    secondary: { main: "#d62613" },
    error: { main: "#f44336" },
    background: { default: "#fafafa" },
  },
  typography: { fontFamily: "Roboto, sans-serif", h6: { fontWeight: 600 } },
});

const App = () => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const storedUserId = localStorage.getItem("userId");
    const storedRole = localStorage.getItem("role");
    const storedAuthToken = localStorage.getItem("authToken");

    const checkTokenExpiry = () => {
      const token = localStorage.getItem("authToken");
      if (!token) return;
  
      const decoded = JSON.parse(atob(token.split(".")[1]));
      if (decoded.exp * 1000 < Date.now()) {
        alert("Session expired. Please log in again.");
        localStorage.clear();
        window.location.href = "/InstructorLogin";
      }
    };
  
    checkTokenExpiry();

    if (storedUserId && storedAuthToken && storedRole) {
      setUser({ id: storedUserId, role: storedRole });
    }
    setIsLoading(false);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("userId");
    localStorage.removeItem("role");
    setUser(null);
  };

  if (isLoading) return null;

  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={<LearnerLogin setUser={setUser} />} />
          <Route path="/register" element={<RegistrationPage setUser={setUser} />} />
          <Route path="/InstructorLogin" element={<InstructorLogin setUser={setUser} />} />
          <Route path="/InstructorRegister" element={<InstructorRegister  />} />

          {/* Conditional Routes Based on Role */}
          {user?.role === "learner" && <Route path="/*" element={<LearnerRoutes user={user} handleLogout={handleLogout} />} />}
          {user?.role === "instructor" && <Route path="/*" element={<InstructorRoutes user={user} handleLogout={handleLogout} />} />}

          {/* Default Route */}
          <Route path="*" element={<Navigate to={user ? "/" : "/login"} />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
};

export default App;




// import React, { useState, useEffect } from "react";
// import {
//   BrowserRouter as Router,
//   Routes,
//   Route,
//   Navigate,
// } from "react-router-dom";
// import PaymentForm from "./components/PaymentForm";
// import CourseForm from "./components/CourseForm";
// import AIExamForm from "./components/AIExamForm";
// import Support from "./components/Support";
// import LearnerViewCourse from "./components/LearnerViewCourse";
// import RegistrationPage from "./components/RegistrationPage";
// import EnrolledCourses from "./components/EnrolledCourses";
// import InstructorChangeCourse from "./components/InstructorChangeCourse";
// import LoginPage from "./components/LoginPage";
// import PrivateRoute from "./components/PrivateRoute";
// import NavBar from "./components/NavBar";
// import { createTheme, ThemeProvider } from '@mui/material/styles';


// const theme = createTheme({
//   palette: {
//     primary: {
//       main: '#1976d2',
//     },
//     secondary: {
//       main: '#f50057',
//     },
//     error: {
//       main: '#f44336',
//     },
//     background: {
//       default: '#fafafa',
//     },
//   },
//   typography: {
//     fontFamily: 'Roboto, sans-serif',
//     h6: {
//       fontWeight: 600,
//     },
//   },
// });

// const App = () => {
//   const [learnerId, setLearnerId] = useState(null);

//   useEffect(() => {
//     const storedUserId = localStorage.getItem("userId");
//     if (storedUserId) {
//       setLearnerId(storedUserId);
//     }
//   }, []);

//   const handleLogout = () => {
//     localStorage.removeItem("authToken");
//     localStorage.removeItem("userId");
//     setLearnerId(null);
//   };

//   return (
//     <ThemeProvider theme={theme}>
//     <Router>
//       {/* Conditionally render NavBar */}
//       {learnerId && <NavBar learnerId={learnerId} onLogout={handleLogout} />}

//       <Routes>
//         {/* Public routes */}
//         <Route
//           path="/login"
//           element={<LoginPage setLearnerId={setLearnerId} />}
//         />
//         <Route
//           path="/register"
//           element={<RegistrationPage setLearnerId={setLearnerId} />}
//         />

//         {/* Protected routes */}
//         <Route
//           path="/"
//           element={
//             learnerId ? (
//               <PrivateRoute
//                 element={<LearnerViewCourse learnerId={learnerId} />}
//               />
//             ) : (
//               <Navigate to="/login" />
//             )
//           }
//         />
//         <Route
//           path="/enrolled/:learnerId"
//           element={
//             learnerId ? (
//               <PrivateRoute
//                 element={<EnrolledCourses learnerId={learnerId} />}
//               />
//             ) : (
//               <Navigate to="/login" />
//             )
//           }
//         />
//         <Route
//           path="/support"
//           element={<PrivateRoute element={<Support />} />}
//         />
//         <Route
//           path="/updateCourse"
//           element={<PrivateRoute element={<InstructorChangeCourse />} />}
//         />
//         <Route
//           path="/createCourse"
//           element={<PrivateRoute element={<CourseForm />} />}
//         />
//         <Route
//           path="/createAIExam"
//           element={<PrivateRoute element={<AIExamForm />} />}
//         />
//         <Route
//           path="/payment/:courseId"
//           element={
//             <PrivateRoute element={<PaymentForm learnerId={learnerId} />} />
//           }
//         />
//       </Routes>
//     </Router>
//     </ThemeProvider>
//   );
// };

// export default App;


// import React, { useState, useEffect } from "react";
// import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
// import PaymentForm from "./components/PaymentForm";
// import CourseForm from "./components/CourseForm";
// import AIExamForm from "./components/AIExamForm";
// import Support from "./components/Support";
// import LearnerViewCourse from "./components/LearnerViewCourse";
// import RegistrationPage from "./components/RegistrationPage";
// import EnrolledCourses from "./components/EnrolledCourses";
// import InstructorChangeCourse from "./components/InstructorChangeCourse";
// import LearnerLogin from "./components/LearnerLogin";
// import PrivateRoute from "./components/PrivateRoute";
// import CourseDisplay from "./components/CourseDsiplay";
// import NavBar from "./components/NavBar";
// import { createTheme, ThemeProvider } from '@mui/material/styles';
// import InstructorRegister from "./components/InstructorRegister";
// import InstructorLogin from "./components/InstructorLogin";
// import AdminLogin from "./components/AdminLogin";
// import AdminRegister from "./components/AdminRegister";


// const theme = createTheme({
//   palette: {
//     primary: {
//       main: '#1976d2',
//     },
//     secondary: {
//       main: '#d62613',
//     },
//     error: {
//       main: '#f44336',
//     },
//     background: {
//       default: '#fafafa',
//     },
//   },
//   typography: {
//     fontFamily: 'Roboto, sans-serif',
//     h6: {
//       fontWeight: 600,
//     },
//   },
// });

// const App = () => {
//   const [learnerId, setLearnerId] = useState(null);
//   const [isLoading, setIsLoading] = useState(true);

//   // On initial render, check if the learnerId and authToken are stored in localStorage
//   useEffect(() => {
//     const storedUserId = localStorage.getItem("userId");
//     const storedAuthToken = localStorage.getItem("authToken");

//     // Only set learnerId if both userId and authToken exist
//     if (storedUserId && storedAuthToken) {
//       setLearnerId(storedUserId);
//     } setIsLoading(false);
//   }, []); // Empty dependency array ensures this runs once on component mount

//   const handleLogout = () => {
//     localStorage.removeItem("authToken");
//     localStorage.removeItem("userId");
//     setLearnerId(null); // Make sure the state is updated on logout
//   };

//   if (isLoading) {
//     return null; // or return a loading spinner
//   }

//   return (
//     <ThemeProvider theme={theme}>
//       <Router>
//         {/* Conditionally render NavBar */}
//         {learnerId && <NavBar learnerId={learnerId} onLogout={handleLogout} />}
//         {InstructorId && <InstructorNavBar InstructorId={InstructorId} onLogout={handleLogout}}
//         <Routes>
//           {/* Public routes */}
//           <Route path="/login" element={<LearnerLogin setLearnerId={setLearnerId} />} />
//           <Route path="/register" element={<RegistrationPage setLearnerId={setLearnerId} />} />
//           <Route path="/InstructorLogin" element={<InstructorLogin  />} />
//           <Route path="/InstructorRegister" element={<InstructorRegister  />} />
//           <Route path="/AdminLogin" element={<AdminLogin  />} />
//           <Route path="/AdminRegister" element={<AdminRegister  />} />

//           {/* Protected routes */}
//           <Route
//             path="/"
//             element={
//               learnerId ? (
//                 <PrivateRoute element={<LearnerViewCourse learnerId={learnerId} />} />
//               ) : (
//                 <Navigate to="/login" />
//               )
//             }
//           />
//           <Route
//             path="/enrolled/:learnerId"
//             element={
//               learnerId ? (
//                 <PrivateRoute element={<EnrolledCourses learnerId={learnerId} />} />
//               ) : (
//                 <Navigate to="/login" />
//               )
//             }
//           />
//           <Route
//             path="/course-display/:courseId" // Route for course display page
//             element={
//               learnerId ? (
//                 <PrivateRoute element={<CourseDisplay />} /> // Render CourseDisplay component
//               ) : (
//                 <Navigate to="/login" />
//               )
//             }
//           />
//           {/* <Route path="/course-display/:courseId" element={<CourseDisplay />} /> */}

//           <Route path="/support" element={<PrivateRoute element={<Support />} />} />
//           <Route path="/updateCourse" element={<PrivateRoute element={<InstructorChangeCourse />} />} />
//           <Route path="/createCourse" element={<PrivateRoute element={<CourseForm />} />} />
//           <Route path="/createAIExam" element={<PrivateRoute element={<AIExamForm />} />} />
//           <Route path="/payment/:courseId" element={<PrivateRoute element={<PaymentForm learnerId={learnerId} />} />} />
//         </Routes>
//       </Router>
//     </ThemeProvider>
//   );
// };

// export default App;

