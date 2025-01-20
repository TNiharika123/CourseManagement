import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button, Card, CardContent, Typography, Grid, CircularProgress } from "@mui/material";

const HomePage = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch courses from the API when the component is mounted
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/courses'); // Replace with your API endpoint
        if (!response.ok) {
          throw new Error('Failed to fetch courses');
        }
        const data = await response.json();
        setCourses(data); // Assuming the API returns an array of courses
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []); // Empty dependency array to run this effect only once

  // Delete course handler
  const deleteCourse = async (courseId) => {
    try {
      const response = await fetch(`http://localhost:5000/api/courses/${courseId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setCourses(courses.filter(course => course._id !== courseId));
        alert("Course deleted successfully");
      } else {
        alert("Failed to delete the course");
      }
    } catch (error) {
      console.error("Error deleting course:", error);
      alert("Error deleting the course");
    }
  };

  if (loading) {
    return (
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
        <CircularProgress />
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ padding: "20px", textAlign: "center" }}>
        <Typography variant="h6" color="error">
          Error: {error}
        </Typography>
      </div>
    );
  }

  return (
    <Grid container spacing={2} style={{ padding: "20px" }}>
      {courses.length === 0 ? (
        <Typography variant="h6" align="center" style={{ width: "100%" }}>
          No courses available
        </Typography>
      ) : (
        courses.map((course) => (
          <Grid item xs={12} sm={6} md={4} key={course._id}>
            <Card variant="outlined">
              <CardContent>
                <Typography variant="h6">{course.title}</Typography>
                <Typography variant="body2">Price: ₹{course.pricing || "N/A"}</Typography>
                <Button
                  variant="contained"
                  color="primary"
                  component={Link}
                  to={`/payment/${course._id}`}
                  style={{ marginTop: "10px" }}
                >
                  Enroll Now
                </Button>
                {/* Delete Button */}
                <Button
                  variant="contained"
                  color="secondary"
                  style={{ marginTop: "10px", marginLeft: "10px" }}
                  onClick={() => deleteCourse(course._id)}
                >
                  Delete
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))
      )}
    </Grid>
  );
};

export default HomePage;
