import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button, Card, CardContent, Typography, Grid, CircularProgress, Box } from "@mui/material";

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


  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
        <CircularProgress size={60} />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ padding: 3, textAlign: "center" }}>
        <Typography variant="h6" color="error">
          Error: {error}
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ padding: 4 }}>
      <Typography variant="h4" align="center" sx={{ marginBottom: 4, fontWeight: "bold" }}>
        Learner View: Buy Courses
      </Typography>

      <Grid container spacing={3}>
        {courses.length === 0 ? (
          <Typography variant="h6" align="center" sx={{ width: "100%" }}>
            No courses available
          </Typography>
        ) : (
          courses.map((course) => (
            <Grid item xs={12} sm={6} md={4} key={course._id}>
              <Card
                variant="outlined"
                sx={{
                  borderRadius: 3,
                  boxShadow: 3,
                  transition: "transform 0.3s ease, box-shadow 0.3s ease",
                  "&:hover": {
                    transform: "scale(1.05)",
                    boxShadow: 6,
                  },
                }}
              >
                <CardContent>
                  <Typography variant="h6" sx={{ fontWeight: "bold", marginBottom: 2 }}>
                    {course.title}
                  </Typography>
                  <Typography variant="body2" sx={{ marginBottom: 1 }}>
                    <strong>Price:</strong> ₹{course.pricing || "N/A"}
                  </Typography>
                  <Typography variant="body2" sx={{ marginBottom: 2 }}>
                    <strong>Description:</strong> {course.description || "No description available"}
                  </Typography>
                  <Button
                    variant="contained"
                    color="primary"
                    component={Link}
                    to={`/payment/${course._id}`}
                    sx={{
                      padding: "10px 20px",
                      borderRadius: 3,
                      fontSize: "1rem",
                      "&:hover": { backgroundColor: "primary.dark" },
                    }}
                  >
                    Enroll Now
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))
        )}
      </Grid>
    </Box>
  );
};

export default HomePage;
