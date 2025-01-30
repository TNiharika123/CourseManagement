import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, Form, Button, ListGroup, Card, Alert, Row, Col } from "react-bootstrap";

const Support = () => {
  const [category, setCategory] = useState("Technical Issue");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [relatedCourse, setRelatedCourse] = useState("");
  const [courses, setCourses] = useState([]);
  const [file, setFile] = useState(null);
  const [supportRequests, setSupportRequests] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

  const learnerId = localStorage.getItem("userId"); // Get learner ID from localStorage

  // Fetch enrolled courses & support requests when component loads
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch enrolled courses
        const coursesResponse = await axios.get(`http://localhost:5000/api/learners/enrolled/${learnerId}`);
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

      // Submit support request
      const response = await axios.post("http://localhost:5000/api/support/create", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (response.status === 200) {
        setSubject("");
        setMessage("");
        setRelatedCourse("");
        setFile(null);
        alert("Support request submitted successfully!");
      }
    } catch (error) {
      console.error("Error submitting support request:", error);
      alert("Failed to submit request. Please try again.");
    }
  };

  return (
    <Container>
      <h2 className="mt-4">Course Management Support</h2>

      {/* Support request form */}
      <Form onSubmit={handleSubmit} className="p-4 border rounded shadow-sm">
        <Row className="mb-3">
          <Col md={6}>
            <Form.Label>Issue Category <span style={{ color: "red" }}>*</span></Form.Label>
            <Form.Select value={category} onChange={(e) => setCategory(e.target.value)} required>
              <option>Technical Issue</option>
              <option>Payment Issue</option>
              <option>Course Content Issue</option>
              <option>Account Related</option>
              <option>Other</option>
            </Form.Select>
          </Col>
          <Col md={6}>
            <Form.Label>Related Course <span style={{ color: "red" }}>*</span></Form.Label>
            <Form.Select value={relatedCourse} onChange={(e) => setRelatedCourse(e.target.value)} required>
              <option value="">Select a course</option>
              {courses.map((course) => (
                <option key={course._id} value={course._id}>
                  {course.title}
                </option>
              ))}
            </Form.Select>
          </Col>
        </Row>

        <Form.Group className="mb-3">
          <Form.Label>Subject (Max 100 characters) <span style={{ color: "red" }}>*</span></Form.Label>
          <Form.Control
            type="text"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            maxLength={100}
            required
            placeholder="Enter subject"
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Message (Max 500 characters) <span style={{ color: "red" }}>*</span></Form.Label>
          <Form.Control
            as="textarea"
            rows={4}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            maxLength={500}
            required
            placeholder="Describe your issue"
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Attach a Screenshot (Optional)</Form.Label>
          <Form.Control
            type="file"
            onChange={(e) => setFile(e.target.files[0])}
            accept="image/*"
          />
        </Form.Group>

        <Button variant="primary" type="submit" className="w-100">
          Submit Request
        </Button>
      </Form>

      {/* Error message */}
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
                  <Card.Text><strong>Course Name:</strong> {courses.find(course => course._id === request.relatedCourse)?.title || "N/A"}</Card.Text>
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
