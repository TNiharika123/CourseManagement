import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, Form, Button, ListGroup, Card } from "react-bootstrap";

const Support = () => {
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [supportRequests, setSupportRequests] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");  // To show error messages if any

  const learnerId = "678e11356957185ac51ac40c"; // Replace with actual learner ID

  // Fetch support requests when the component loads
  useEffect(() => {
    const fetchSupportRequests = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/support?learnerId=${learnerId}`);
        setSupportRequests(response.data);
      } catch (error) {
        console.error("Error fetching support requests:", error);
        setErrorMessage("Failed to fetch support requests. Please try again later.");
      }
    };

    fetchSupportRequests();
  }, [learnerId]);

  // Handle support request creation
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/support/create", { learnerId, subject, message });
      setSubject("");
      setMessage("");
      alert("Support request created successfully!");
    } catch (error) {
      console.error("Error creating support request:", error);
      alert("Failed to create support request. Please try again.");
    }
  };

  return (
    <Container>
      <h2 className="mt-4">Create Support Request</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label>Subject</Form.Label>
          <Form.Control
            type="text"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Message</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
          />
        </Form.Group>
        <Button variant="primary" type="submit" className="mt-2">
          Submit Request
        </Button>
      </Form>

      {/* Display error message if any */}
      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}

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
                  <Card.Text>{request.message}</Card.Text>
                  <Card.Text>Status: {request.status}</Card.Text>
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
