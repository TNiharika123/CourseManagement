// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { Container, Form, Button, ListGroup, Card, Alert, Row, Col } from "react-bootstrap";

// const Support = () => {
//   const [category, setCategory] = useState("Technical Issue");
//   const [subject, setSubject] = useState("");
//   const [message, setMessage] = useState("");
//   const [relatedCourse, setRelatedCourse] = useState("");
//   const [courses, setCourses] = useState([]);
//   const [file, setFile] = useState(null);
//   const [supportRequests, setSupportRequests] = useState([]);
//   const [errorMessage, setErrorMessage] = useState("");

//   const learnerId = localStorage.getItem("userId"); // Get learner ID from localStorage

//   // Fetch enrolled courses & support requests when component loads
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         // Fetch enrolled courses
//         const coursesResponse = await axios.get(`http://localhost:5000/api/learners/enrolled/${learnerId}`);
//         setCourses(coursesResponse.data);

//         // Fetch support requests
//         const supportResponse = await axios.get(`http://localhost:5000/api/support?learnerId=${learnerId}`);
//         setSupportRequests(supportResponse.data);
//       } catch (error) {
//         console.error("Error fetching data:", error);
//         setErrorMessage("Failed to fetch data. Please try again later.");
//       }
//     };

//     fetchData();
//   }, [learnerId]);

//   // Handle support request submission
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (subject.length > 100) {
//       alert("Subject should not exceed 100 characters.");
//       return;
//     }
//     if (message.length > 500) {
//       alert("Message should not exceed 500 characters.");
//       return;
//     }

//     try {
//       const formData = new FormData();
//       formData.append("learnerId", learnerId);
//       formData.append("category", category);
//       formData.append("subject", subject);
//       formData.append("message", message);
//       formData.append("relatedCourse", relatedCourse);
//       if (file) formData.append("file", file);

//       // Submit support request
//       const response = await axios.post("http://localhost:5000/api/support/create", formData, {
//         headers: { "Content-Type": "multipart/form-data" },
//       });

//       if (response.status === 200) {
//         setSubject("");
//         setMessage("");
//         setRelatedCourse("");
//         setFile(null);
//         alert("Support request submitted successfully!");
//       }
//     } catch (error) {
//       console.error("Error submitting support request:", error);
//       alert("Failed to submit request. Please try again.");
//     }
//   };

//   return (
//     <Container>
//       <h2 className="mt-4 mb-4 text-center" style={{ color: "#1976d2" }}>Course Management Support</h2>

//       {/* Support request form */}
//       <Form onSubmit={handleSubmit} className="p-4 border rounded shadow-sm mb-4">
//         <Row className="mb-3">
//           <Col md={6}>
//             <Form.Label>Issue Category <span style={{ color: "red" }}>*</span></Form.Label>
//             <Form.Select value={category} onChange={(e) => setCategory(e.target.value)} required>
//               <option>Technical Issue</option>
//               <option>Payment Issue</option>
//               <option>Course Content Issue</option>
//               <option>Account Related</option>
//               <option>Other</option>
//             </Form.Select>
//           </Col>
//           <Col md={6}>
//             <Form.Label>Related Course <span style={{ color: "red" }}>*</span></Form.Label>
//             <Form.Select value={relatedCourse} onChange={(e) => setRelatedCourse(e.target.value)} required>
//               <option value="">Select a course</option>
//               {courses.map((course) => (
//                 <option key={course._id} value={course._id}>
//                   {course.title}
//                 </option>
//               ))}
//             </Form.Select>
//           </Col>
//         </Row>

//         <Form.Group className="mb-3">
//           <Form.Label>Subject (Max 100 characters) <span style={{ color: "red" }}>*</span></Form.Label>
//           <Form.Control
//             type="text"
//             value={subject}
//             onChange={(e) => setSubject(e.target.value)}
//             maxLength={100}
//             required
//             placeholder="Enter subject"
//           />
//         </Form.Group>

//         <Form.Group className="mb-3">
//           <Form.Label>Message (Max 500 characters) <span style={{ color: "red" }}>*</span></Form.Label>
//           <Form.Control
//             as="textarea"
//             rows={4}
//             value={message}
//             onChange={(e) => setMessage(e.target.value)}
//             maxLength={500}
//             required
//             placeholder="Describe your issue"
//           />
//         </Form.Group>

//         <Form.Group className="mb-3">
//           <Form.Label>Attach a Screenshot (Optional)</Form.Label>
//           <Form.Control
//             type="file"
//             onChange={(e) => setFile(e.target.files[0])}
//             accept="image/*"
//           />
//         </Form.Group>

//         <Button variant="primary" type="submit" className="w-100">
//           Submit Request
//         </Button>
//       </Form>

//       {/* Error message */}
//       {errorMessage && <Alert variant="danger" className="mt-3">{errorMessage}</Alert>}

//       {/* List of support requests */}
//       <h3 className="mt-4 mb-4" style={{ color: "#1976d2" }}>Your Support Requests</h3>
//       <ListGroup>
//         {supportRequests.length === 0 ? (
//           <p>No support requests found.</p>
//         ) : (
//           supportRequests.map((request) => (
//             <ListGroup.Item key={request._id}>
//               <Card>
//                 <Card.Body>
//                   <Card.Title>{request.subject}</Card.Title>
//                   <Card.Text><strong>Category:</strong> {request.category}</Card.Text>
//                   <Card.Text>{request.message}</Card.Text>
//                   <Card.Text><strong>Course Name:</strong> {courses.find(course => course._id === request.relatedCourse)?.title || "N/A"}</Card.Text>
//                   <Card.Text><strong>Status:</strong> {request.status}</Card.Text>
//                 </Card.Body>
//               </Card>
//             </ListGroup.Item>
//           ))
//         )}
//       </ListGroup>
//     </Container>
//   );
// };

// export default Support;

import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Container, Grid, Card, CardContent, Typography, TextField,
  Button, MenuItem, CircularProgress, Alert, Box
} from "@mui/material";
import { fetchEnrolledCourses } from "../api/api";  // Adjust based on your folder structure


const Support = () => {
  const [category, setCategory] = useState("Technical Issue");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [relatedCourse, setRelatedCourse] = useState("");
  const [courses, setCourses] = useState([]);
  const [file, setFile] = useState(null);
  const [supportRequests, setSupportRequests] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(true);

  const learnerId = localStorage.getItem("userId");
  const userType = localStorage.getItem("role"); // ✅ Get user role (Learner/Instructor)

  // ✅ Fetch existing support requests
  useEffect(() => {
    fetchEnrolledCourses();
    fetchSupportRequests();
  }, [learnerId]);


  // ✅ Fetch Enrolled Courses
  const fetchEnrolledCourses = async () => {
    try {
      if (!learnerId) throw new Error("User ID missing. Please log in.");
      const response = await axios.get(`http://localhost:5000/api/learners/enrolled/${learnerId}`);
      setCourses(response.data); // ✅ Full Course Data
    } catch (error) {
      setErrorMessage("Failed to fetch enrolled courses.");
    }
  };

  const fetchSupportRequests = async () => {
    try {
      if (!learnerId) throw new Error("Learner ID missing. Please log in.");

      const response = await axios.get(`http://localhost:5000/api/support?userId=${learnerId}&userType=Learner`);
      setSupportRequests(response.data);
    } catch (error) {
      setErrorMessage("Failed to fetch support requests. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  // ✅ Handle support request submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (subject.length > 100 || message.length > 500) {
      setErrorMessage("Subject should be max 100 characters & message max 500.");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("userId", learnerId);
      formData.append("userType", "Learner");
      formData.append("category", category);
      formData.append("subject", subject);
      formData.append("message", message);
      formData.append("relatedCourse", relatedCourse ? relatedCourse : "");
      if (file) formData.append("file", file);

      const response = await axios.post("http://localhost:5000/api/support/create", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (response.status === 201) {
        setSubject("");
        setMessage("");
        setRelatedCourse(""); // ✅ Reset the state
        setFile(null);
        alert("Support request submitted successfully!");
        fetchSupportRequests(); // ✅ Refresh the list after submission
      }
    } catch (error) {
      setErrorMessage("Failed to submit request. Please try again.");
    }
  };


  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Typography variant="h4" align="center" fontWeight="bold" color="primary" gutterBottom>
        Support & Help Center
      </Typography>

      {/* Form Section */}
      <Card sx={{ p: 3, mb: 4, boxShadow: 3 }}>
        <Typography variant="h6" fontWeight="bold" gutterBottom>
          Submit a Support Request
        </Typography>

        {errorMessage && <Alert severity="error" sx={{ mb: 2 }}>{errorMessage}</Alert>}

        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <TextField
                select
                label="Issue Category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                fullWidth
                required
              >
                {["Technical Issue", "Payment Issue", "Course Content Issue", "Account Related", "Other"].map((option) => (
                  <MenuItem key={option} value={option}>{option}</MenuItem>
                ))}
              </TextField>
            </Grid>

            {/* Related Course Dropdown */}
            <Grid item xs={12} md={6}>
              <TextField
                select
                label="Related Course"
                value={relatedCourse}
                onChange={(e) => setRelatedCourse(e.target.value)}
                fullWidth
                required
              >
                <MenuItem value="">Select a Course</MenuItem>
                {courses.length > 0 ? (
                  courses.map((course) => (
                    <MenuItem key={course._id} value={course._id}>
                      {course.title}
                    </MenuItem>
                  ))
                ) : (
                  <MenuItem disabled>No courses available</MenuItem>
                )}
              </TextField>
            </Grid>

            <Grid item xs={12}>
              <TextField
                label="Subject (Max 100 characters)"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                fullWidth
                required
                inputProps={{ maxLength: 100 }}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                label="Message (Max 500 characters)"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                multiline
                rows={4}
                fullWidth
                required
                inputProps={{ maxLength: 500 }}
              />
            </Grid>

            <Grid item xs={12}>
              <Button variant="contained" component="label">
                Attach Screenshot (Optional)
                <input type="file" hidden onChange={(e) => setFile(e.target.files[0])} accept="image/*" />
              </Button>
              {file && <Typography sx={{ mt: 1 }}>{file.name}</Typography>}
            </Grid>

            <Grid item xs={12}>
              <Button variant="contained" color="primary" type="submit" fullWidth sx={{ py: 1.5 }}>
                Submit Request
              </Button>
            </Grid>
          </Grid>
        </form>
      </Card>

      {/* Loading Indicator */}
      {loading && (
        <Box display="flex" justifyContent="center">
          <CircularProgress />
        </Box>
      )}

      {/* Support Requests Section */}
      {!loading && (
        <Box>
          <Typography variant="h5" fontWeight="bold" color="primary" gutterBottom>
            Your Support Requests
          </Typography>

          {supportRequests.length === 0 ? (
            <Typography>No support requests found.</Typography>
          ) : (
            <Grid container spacing={2}>
              {supportRequests.map((request) => (
                <Grid item xs={12} key={request._id}>
                  <Card sx={{ boxShadow: 2, borderLeft: "5px solid #1976d2" }}>
                    <CardContent>
                      <Typography variant="h6" fontWeight="bold">{request.subject}</Typography>
                      <Typography variant="body2" color="textSecondary"><strong>Category:</strong> {request.category}</Typography>
                      <Typography variant="body2" sx={{ my: 1 }}>{request.message}</Typography>
                      <Typography variant="body2" color="textSecondary">
                        <strong>Course:</strong> {request.relatedCourse?.title || "N/A"}
                      </Typography>

                      <Typography variant="body2" color="textSecondary">
                        <strong>Status:</strong> {request.status}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          )}
        </Box>
      )}
    </Container>
  );
};

export default Support;

