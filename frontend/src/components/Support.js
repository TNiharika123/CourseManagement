// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { Container, Form, Button, ListGroup, Card } from "react-bootstrap";

// const Support = () => {
//   const [subject, setSubject] = useState("");
//   const [message, setMessage] = useState("");
//   const [supportRequests, setSupportRequests] = useState([]);
//   const [errorMessage, setErrorMessage] = useState("");  // To show error messages if any

//   const learnerId = "678e11356957185ac51ac40c"; // Replace with actual learner ID

//   // Fetch support requests when the component loads
//   useEffect(() => {
//     const fetchSupportRequests = async () => {
//       try {
//         const response = await axios.get(`http://localhost:5000/api/support?learnerId=${learnerId}`);
//         setSupportRequests(response.data);
//       } catch (error) {
//         console.error("Error fetching support requests:", error);
//         setErrorMessage("Failed to fetch support requests. Please try again later.");
//       }
//     };

//     fetchSupportRequests();
//   }, [learnerId]);

//   // Handle support request creation
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       await axios.post("http://localhost:5000/api/support/create", { learnerId, subject, message });
//       setSubject("");
//       setMessage("");
//       alert("Support request created successfully!");
//     } catch (error) {
//       console.error("Error creating support request:", error);
//       alert("Failed to create support request. Please try again.");
//     }
//   };

//   return (
//     <Container>
//       <h2 className="mt-4">Create Support Request</h2>
//       <Form onSubmit={handleSubmit}>
//         <Form.Group>
//           <Form.Label>Subject</Form.Label>
//           <Form.Control
//             type="text"
//             value={subject}
//             onChange={(e) => setSubject(e.target.value)}
//             required
//           />
//         </Form.Group>
//         <Form.Group>
//           <Form.Label>Message</Form.Label>
//           <Form.Control
//             as="textarea"
//             rows={3}
//             value={message}
//             onChange={(e) => setMessage(e.target.value)}
//             required
//           />
//         </Form.Group>
//         <Button variant="primary" type="submit" className="mt-2">
//           Submit Request
//         </Button>
//       </Form>

//       {/* Display error message if any */}
//       {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}

//       <h3 className="mt-4">Your Support Requests</h3>
//       <ListGroup>
//         {supportRequests.length === 0 ? (
//           <p>No support requests found.</p>
//         ) : (
//           supportRequests.map((request) => (
//             <ListGroup.Item key={request._id}>
//               <Card>
//                 <Card.Body>
//                   <Card.Title>{request.subject}</Card.Title>
//                   <Card.Text>{request.message}</Card.Text>
//                   <Card.Text>Status: {request.status}</Card.Text>
//                 </Card.Body>
//               </Card>
//             </ListGroup.Item>
//           ))
//         )}
//       </ListGroup>
//     </Container>
//   );
// };
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, Form, Button, ListGroup, Card, Alert } from "react-bootstrap";

const Support = () => {
  const [category, setCategory] = useState("Technical Issue");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [relatedCourse, setRelatedCourse] = useState("");
  const [courses, setCourses] = useState([]);
  const [file, setFile] = useState(null);
  const [supportRequests, setSupportRequests] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

  const learnerId = "678e11356957185ac51ac40c"; // Replace with actual learner ID

  // Fetch enrolled courses & support requests when component loads
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch enrolled courses
        const coursesResponse = await axios.get(`http://localhost:5000/api/courses/enrolled?learnerId=${learnerId}`);
        setCourses(coursesResponse.data);

        // Fetch support requests
        const supportResponse = await axios.get(`http://localhost:5000/api/support?learnerId=${learnerId}`);
        setSupportRequests(supportResponse.data);
      } catch (error) {
        console.error("Error fetching data:", error);
        setErrorMessage("Failed to fetch data. Please try again later.");
      }
    };

    fetchData();
  }, [learnerId]);

  // Handle support request submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (subject.length > 100) {
      alert("Subject should not exceed 100 characters.");
      return;
    }
    if (message.length > 500) {
      alert("Message should not exceed 500 characters.");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("learnerId", learnerId);
      formData.append("category", category);
      formData.append("subject", subject);
      formData.append("message", message);
      formData.append("relatedCourse", relatedCourse);
      if (file) formData.append("file", file);

      await axios.post("http://localhost:5000/api/support/create", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      // Reset form fields after submission
      setSubject("");
      setMessage("");
      setRelatedCourse("");
      setFile(null);

      alert("Support request submitted successfully!");
    } catch (error) {
      console.error("Error submitting support request:", error);
      alert("Failed to submit request. Please try again.");
    }
  };

  return (
    <Container>
      <h2 className="mt-4">Course Management Support</h2>

      <Form onSubmit={handleSubmit} className="p-3 border rounded shadow-sm">
        {/* Category Dropdown */}
        <Form.Group className="mb-3">
          <Form.Label>Issue Category</Form.Label>
          <Form.Select value={category} onChange={(e) => setCategory(e.target.value)}>
            <option>Technical Issue</option>
            <option>Payment Issue</option>
            <option>Course Content Issue</option>
            <option>Account Related</option>
            <option>Other</option>
          </Form.Select>
        </Form.Group>

        {/* Related Course Dropdown */}
        <Form.Group className="mb-3">
          <Form.Label>Related Course</Form.Label>
          <Form.Select value={relatedCourse} onChange={(e) => setRelatedCourse(e.target.value)} required>
            <option value="">Select a course</option>
            {courses.map((course) => (
              <option key={course._id} value={course._id}>
                {course.title}
              </option>
            ))}
          </Form.Select>
        </Form.Group>

        {/* Subject Field */}
        <Form.Group className="mb-3">
          <Form.Label>Subject (Max 100 characters)</Form.Label>
          <Form.Control
            type="text"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            maxLength={100}
            required
          />
        </Form.Group>

        {/* Message Field */}
        <Form.Group className="mb-3">
          <Form.Label>Message (Max 500 characters)</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            maxLength={500}
            required
          />
        </Form.Group>

        {/* File Upload */}
        <Form.Group className="mb-3">
          <Form.Label>Attach a Screenshot (Optional)</Form.Label>
          <Form.Control type="file" onChange={(e) => setFile(e.target.files[0])} />
        </Form.Group>

        <Button variant="primary" type="submit">
          Submit Request
        </Button>
      </Form>

      {/* Error Message */}
      {errorMessage && <Alert variant="danger" className="mt-3">{errorMessage}</Alert>}

      <h3 className="mt-4">Your Support Requests</h3>
      <ListGroup>
        {supportRequests.length === 0 ? (
          <p>No support requests found.</p>
        ) : (
          supportRequests.map((request) => (
            <ListGroup.Item key={request._id}>
              <Card>
                <Card.Body>
                  <Card.Title>{request.subject}</Card.Title>
                  <Card.Text><strong>Category:</strong> {request.category}</Card.Text>
                  <Card.Text>{request.message}</Card.Text>
                  <Card.Text><strong>Course:</strong> {request.relatedCourse || "N/A"}</Card.Text>
                  <Card.Text><strong>Status:</strong> {request.status}</Card.Text>
                </Card.Body>
              </Card>
            </ListGroup.Item>
          ))
        )}
      </ListGroup>
    </Container>
  );
};

export default Support;


// ----------------------------------------



// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { Card, Button, Form, Alert, Badge } from "react-bootstrap";

// const Support = () => {
//   const [formData, setFormData] = useState({
//     subject: "",
//     category: "general",
//     courseId: "",
//     priority: "medium",
//     message: ""
//   });
//   const [supportRequests, setSupportRequests] = useState([]);
//   const [error, setError] = useState("");

//   const learnerId = "678e11356957185ac51ac40c";

//   useEffect(() => {
//     const fetchSupportRequests = async () => {
//       try {
//         const response = await axios.get(`/api/support?learnerId=${learnerId}`);
//         setSupportRequests(response.data);
//       } catch (error) {
//         setError("Unable to load support requests");
//       }
//     };
//     fetchSupportRequests();
//   }, [learnerId]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({
//       ...prev,
//       [name]: value
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       await axios.post("/api/support/create", {
//         ...formData,
//         learnerId
//       });
//       setFormData({
//         subject: "",
//         category: "general",
//         courseId: "",
//         priority: "medium",
//         message: ""
//       });
//       alert("Support request submitted successfully");
//     } catch (error) {
//       setError("Failed to submit support request");
//     }
//   };

//   return (
//     <Card className="p-3 shadow-sm">
//       <h3 className="mb-3 text-center">Support Request</h3>
      
//       {error && <Alert variant="danger">{error}</Alert>}
      
//       <Form onSubmit={handleSubmit}>
//         <Form.Group className="mb-2">
//           <Form.Label className="small">Subject</Form.Label>
//           <Form.Control
//             size="sm"
//             type="text"
//             name="subject"
//             value={formData.subject}
//             onChange={handleChange}
//             required
//             placeholder="Issue summary"
//           />
//         </Form.Group>

//         <Form.Group className="mb-2">
//           <Form.Label className="small">Course</Form.Label>
//           <Form.Control
//             size="sm"
//             type="text"
//             name="courseId"
//             value={formData.courseId}
//             onChange={handleChange}
//             placeholder="Course code"
//           />
//         </Form.Group>

//         <div className="d-flex gap-2 mb-2">
//           <Form.Group className="flex-grow-1">
//             <Form.Label className="small">Category</Form.Label>
//             <Form.Select
//               size="sm"
//               name="category"
//               value={formData.category}
//               onChange={handleChange}
//             >
//               <option value="general">General</option>
//               <option value="assignment">Assignment</option>
//               <option value="technical">Technical</option>
//               <option value="grade">Grade</option>
//             </Form.Select>
//           </Form.Group>

//           <Form.Group className="flex-grow-1">
//             <Form.Label className="small">Priority</Form.Label>
//             <Form.Select
//               size="sm"
//               name="priority"
//               value={formData.priority}
//               onChange={handleChange}
//             >
//               <option value="low">Low</option>
//               <option value="medium">Medium</option>
//               <option value="high">High</option>
//             </Form.Select>
//           </Form.Group>
//         </div>

//         <Form.Group className="mb-2">
//           <Form.Label className="small">Message</Form.Label>
//           <Form.Control
//             size="sm"
//             as="textarea"
//             name="message"
//             rows={3}
//             value={formData.message}
//             onChange={handleChange}
//             required
//             placeholder="Describe your issue"
//           />
//         </Form.Group>

//         <Button variant="primary" type="submit" className="w-100 btn-sm">
//           Submit Request
//         </Button>
//       </Form>

//       <div className="mt-3">
//         <h4 className="mb-2">Previous Requests</h4>
//         {supportRequests.length === 0 ? (
//           <Alert variant="info" className="py-2 px-3">No previous requests</Alert>
//         ) : (
//           supportRequests.map((request) => (
//             <Card key={request._id} className="mb-2">
//               <Card.Body className="py-2 px-3">
//                 <div className="d-flex justify-content-between align-items-center">
//                   <Card.Title className="mb-0 h6">{request.subject}</Card.Title>
//                   <Badge 
//                     bg={
//                       request.status === 'resolved' ? 'success' : 
//                       request.status === 'in-progress' ? 'warning' : 'secondary'
//                     }
//                     className="small"
//                   >
//                     {request.status}
//                   </Badge>
//                 </div>
//                 <Card.Text className="small text-muted mt-1">
//                   {request.message}
//                 </Card.Text>
//               </Card.Body>
//             </Card>
//           ))
//         )}
//       </div>
//     </Card>
//   );
// };

// export default Support;


// // -------------------------------------

// import React, { useState } from 'react';
// import { Send, User, Mail, MessageCircle } from 'lucide-react';

// const Support = () => {
//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     subject: '',
//     message: ''
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prevState => ({
//       ...prevState,
//       [name]: value
//     }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     console.log('Form submitted:', formData);
//     setFormData({
//       name: '',
//       email: '',
//       subject: '',
//       message: ''
//     });
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
//       <div className="w-full max-w-md bg-white shadow-md rounded-xl p-8">
//         <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">Support Request</h2>
        
//         <form onSubmit={handleSubmit} className="space-y-6">
//           <div className="relative">
//             <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">Name</label>
//             <div className="flex items-center">
//               <User className="absolute left-3 text-gray-400" size={20} />
//               <input
//                 id="name"
//                 type="text"
//                 name="name"
//                 value={formData.name}
//                 onChange={handleChange}
//                 required
//                 className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 placeholder="Enter your full name"
//               />
//             </div>
//           </div>

//           <div className="relative">
//             <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">Email</label>
//             <div className="flex items-center">
//               <Mail className="absolute left-3 text-gray-400" size={20} />
//               <input
//                 id="email"
//                 type="email"
//                 name="email"
//                 value={formData.email}
//                 onChange={handleChange}
//                 required
//                 className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 placeholder="your.email@example.com"
//               />
//             </div>
//           </div>

//           <div className="relative">
//             <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">Support Topic</label>
//             <div className="flex items-center">
//               <MessageCircle className="absolute left-3 text-gray-400" size={20} />
//               <select
//                 id="subject"
//                 name="subject"
//                 value={formData.subject}
//                 onChange={handleChange}
//                 required
//                 className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//               >
//                 <option value="">Select a Topic</option>
//                 <option value="course">Course Content</option>
//                 <option value="technical">Technical Support</option>
//                 <option value="billing">Billing Inquiry</option>
//                 <option value="other">Other</option>
//               </select>
//             </div>
//           </div>

//           <div>
//             <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">Message</label>
//             <textarea
//               id="message"
//               name="message"
//               value={formData.message}
//               onChange={handleChange}
//               required
//               rows="4"
//               className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//               placeholder="Describe your issue in detail"
//             />
//           </div>

//           <button
//             type="submit"
//             className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors duration-300 flex items-center justify-center"
//           >
//             <Send className="mr-2" size={20} /> 
//             Submit Request
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default Support;