import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Grid, Card, CardContent, Typography, Button, CircularProgress, Box } from '@mui/material';

const EnrolledCourses = ({ learnerId }) => {
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (learnerId) {
      const fetchEnrolledCourses = async () => {
        try {
          const response = await axios.get(`http://localhost:5000/api/learners/enrolled/${learnerId}`);
          setEnrolledCourses(response.data);
        } catch (error) {
          setError('Error fetching enrolled courses');
        } finally {
          setLoading(false);
        }
      };

      fetchEnrolledCourses();
    } else {
      setLoading(false); // Handle case where learnerId is null
    }
  }, [learnerId]);

  // Show loading spinner while fetching
  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress size={60} />
      </Box>
    );
  }

  // If there's no learnerId, display a message
  if (!learnerId) {
    return (
      <Box sx={{ padding: 2, textAlign: 'center' }}>
        <Typography variant="h6" color="error">
          No learner ID found. Please log in again.
        </Typography>
      </Box>
    );
  }

  // If there's an error fetching courses, display the error message
  if (error) {
    return (
      <Box sx={{ padding: 2, textAlign: 'center' }}>
        <Typography variant="h6" color="error">
          {error}
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h4" align="center" sx={{ marginBottom: 4, fontWeight: 'bold' }}>
        Enrolled Courses
      </Typography>
      <Grid container spacing={3}>
        {enrolledCourses.length === 0 ? (
          <Typography variant="h6" align="center" sx={{ width: '100%' }}>
            No courses enrolled yet.
          </Typography>
        ) : (
          enrolledCourses.map((course) => (
            <Grid item xs={12} sm={6} md={4} key={course._id}>
              <Card
                variant="outlined"
                sx={{
                  borderRadius: 2,
                  boxShadow: 2,
                  '&:hover': { boxShadow: 6 },
                  transition: 'box-shadow 0.3s ease',
                }}
              >
                <CardContent>
                  <Typography variant="h6" sx={{ fontWeight: 'bold', fontSize: '1.2rem' }}>
                    {course.title}
                  </Typography>
                  <Box sx={{ mt: 1 }}>
                    <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                      Category:
                    </Typography>
                    <Typography variant="body2" sx={{ fontSize: '1rem', marginBottom: 1 }}>
                      {course.category || 'N/A'}
                    </Typography>
                    <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                      Level:
                    </Typography>
                    <Typography variant="body2" sx={{ fontSize: '1rem', marginBottom: 1 }}>
                      {course.level || 'N/A'}
                    </Typography>
                    <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                      Description:
                    </Typography>
                    <Typography variant="body2" sx={{ fontSize: '1rem', marginBottom: 2 }}>
                      {course.description || 'No description available'}
                    </Typography>
                    <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                      Language:
                    </Typography>
                    <Typography variant="body2" sx={{ fontSize: '1rem', marginBottom: 1 }}>
                      {course.primaryLanguage || 'N/A'}
                    </Typography>
                    <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                      Price:
                    </Typography>
                    <Typography variant="body2" sx={{ fontSize: '1rem', marginBottom: 2 }}>
                      ₹{course.pricing || 'N/A'}
                    </Typography>
                  </Box>
                  <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    sx={{
                      marginTop: 2,
                      '&:hover': { backgroundColor: 'primary.dark' },
                      padding: 1.5,
                    }}
                    onClick={() => alert(`Redirecting to Course ${course.title}`)} // Replace with real course logic
                  >
                    Open Course
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

export default EnrolledCourses;
