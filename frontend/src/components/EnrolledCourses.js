import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Grid, Card, CardContent, Typography, Button, CircularProgress } from '@mui/material';

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
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </div>
    );
  }

  // If there's no learnerId, display a message
  if (!learnerId) {
    return (
      <div style={{ padding: '20px', textAlign: 'center' }}>
        <Typography variant="h6" color="error">
          No learner ID found. Please log in again.
        </Typography>
      </div>
    );
  }

  // If there's an error fetching courses, display the error message
  if (error) {
    return (
      <div style={{ padding: '20px', textAlign: 'center' }}>
        <Typography variant="h6" color="error">
          {error}
        </Typography>
      </div>
    );
  }

  return (
    <div style={{ padding: '20px' }}>
      <Typography variant="h4" align="center" style={{ marginBottom: '20px', fontWeight: 'bold' }}>
        Enrolled Courses
      </Typography>
      <Grid container spacing={2}>
        {enrolledCourses.length === 0 ? (
          <Typography variant="h6" align="center" style={{ width: '100%' }}>
            No courses enrolled yet.
          </Typography>
        ) : (
          enrolledCourses.map((course) => (
            <Grid item xs={12} sm={6} md={4} key={course._id}>
              <Card variant="outlined">
                <CardContent>
                  <Typography variant="h6" style={{ fontWeight: 'bold', fontSize: '1.2rem' }}>
                    {course.title}
                  </Typography>
                  <Typography variant="body2" style={{ fontWeight: 'bold' }}>
                    Category:
                  </Typography>
                  <Typography variant="body2" style={{ fontSize: '1rem', marginBottom: '10px' }}>
                    {course.category || 'N/A'}
                  </Typography>
                  <Typography variant="body2" style={{ fontWeight: 'bold' }}>
                    Level:
                  </Typography>
                  <Typography variant="body2" style={{ fontSize: '1rem', marginBottom: '10px' }}>
                    {course.level || 'N/A'}
                  </Typography>
                  <Typography variant="body2" style={{ fontWeight: 'bold' }}>
                    Description:
                  </Typography>
                  <Typography variant="body2" style={{ fontSize: '1rem', marginBottom: '10px' }}>
                    {course.description || 'No description available'}
                  </Typography>
                  <Typography variant="body2" style={{ fontWeight: 'bold' }}>
                    Language:
                  </Typography>
                  <Typography variant="body2" style={{ fontSize: '1rem', marginBottom: '10px' }}>
                    {course.primaryLanguage || 'N/A'}
                  </Typography>
                  <Typography variant="body2" style={{ fontWeight: 'bold' }}>
                    Price:
                  </Typography>
                  <Typography variant="body2" style={{ fontSize: '1rem', marginBottom: '10px' }}>
                    ₹{course.pricing || 'N/A'}
                  </Typography>
                  <Button
                    variant="contained"
                    color="primary"
                    style={{ marginTop: '10px' }}
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
    </div>
  );
};

export default EnrolledCourses;
