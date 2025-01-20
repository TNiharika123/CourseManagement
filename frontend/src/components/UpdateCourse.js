import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { TextField, Button, Container, Typography } from "@mui/material";

const UpdateCourse = () => {
  const { courseId } = useParams();
  const [course, setCourse] = useState(null);
  const [title, setTitle] = useState("");
  const [pricing, setPricing] = useState("");

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/courses/${courseId}`);
        const data = await response.json();
        if (response.ok) {
          setCourse(data);
          setTitle(data.title);
          setPricing(data.pricing);
        } else {
          alert("Course not found");
        }
      } catch (error) {
        alert("Error fetching course data");
      }
    };

    fetchCourse();
  }, [courseId]);

  const handleUpdate = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/courses/${courseId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, pricing }),
      });

      if (response.ok) {
        alert("Course updated successfully");
        window.location.href = "/"; // Redirect to home page
      } else {
        alert("Failed to update course");
      }
    } catch (error) {
      alert("Error updating course");
    }
  };

  return (
    <Container>
      {course ? (
        <div>
          <Typography variant="h4">Update Course</Typography>
          <TextField
            label="Course Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            fullWidth
            style={{ marginBottom: "20px" }}
          />
          <TextField
            label="Price"
            value={pricing}
            onChange={(e) => setPricing(e.target.value)}
            fullWidth
            style={{ marginBottom: "20px" }}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handleUpdate}
            style={{ marginTop: "20px" }}
          >
            Update Course
          </Button>
        </div>
      ) : (
        <Typography variant="h6">Loading...</Typography>
      )}
    </Container>
  );
};

export default UpdateCourse;
