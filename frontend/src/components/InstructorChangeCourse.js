import React, { useEffect, useState } from "react";
import {
  Button, Card, CardContent, Typography, Grid, CircularProgress, Dialog, DialogActions,
  DialogContent, DialogTitle, TextField, DialogContentText, Alert
} from "@mui/material";

const InstructorChangeCourse = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [updatedData, setUpdatedData] = useState({
    title: "",
    pricing: "",
    category: "",
    level: "",
    primaryLanguage: "",
    subtitle: "",
    description: "",  // Ensure description is part of the state
  });

  // Fetch courses
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/courses");
        if (!response.ok) {
          throw new Error("Failed to fetch courses");
        }
        const data = await response.json();
        setCourses(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  // Delete course
  const deleteCourse = async () => {
    if (!selectedCourse) return;

    try {
      const response = await fetch(`http://localhost:5000/api/courses/${selectedCourse._id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setCourses(courses.filter(course => course._id !== selectedCourse._id));
        alert("Course deleted successfully");
      } else {
        alert("Failed to delete the course");
      }
    } catch (error) {
      console.error("Error deleting course:", error);
      alert("Error deleting the course");
    } finally {
      setOpenDeleteDialog(false);  // Close delete dialog
    }
  };

  // Open update dialog
  const handleOpenUpdate = (course) => {
    setSelectedCourse(course);
    setUpdatedData({
      title: course.title || "",
      pricing: course.pricing || "",
      category: course.category || "",
      level: course.level || "",
      description: course.description || "",  // Ensure description is passed
      primaryLanguage: course.primaryLanguage || "",
      subtitle: course.subtitle || "",
    });
    setOpenDialog(true);
  };

  // Close update dialog
  const handleCloseUpdate = () => {
    setOpenDialog(false);
    setSelectedCourse(null);
  };

  // Update course
  const handleUpdateCourse = async () => {
    if (!selectedCourse?._id) {
      alert("Invalid course selected");
      return;
    }

    try {
      const response = await fetch(`http://localhost:5000/api/courses/${selectedCourse._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        alert(errorData.message || "Failed to update course");
        return;
      }

      const updatedCourse = await response.json();
      setCourses(courses.map(course => (course._id === updatedCourse._id ? updatedCourse : course)));
      alert("Course updated successfully");
      handleCloseUpdate();
    } catch (error) {
      console.error("Error updating course:", error);
      alert("Error updating the course");
    }
  };

  if (loading) {
    return <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}><CircularProgress /></div>;
  }

  if (error) {
    return <div style={{ padding: "20px", textAlign: "center" }}><Typography variant="h6" color="error">Error: {error}</Typography></div>;
  }

  return (
    <div style={{ padding: "20px" }}>
      <Typography variant="h4" align="center" gutterBottom>
        Instructor View: Manage Courses
      </Typography>
      <Grid container spacing={2}>
        {courses.length === 0 ? (
          <Typography variant="h6" align="center" style={{ width: "100%" }}>No courses available</Typography>
        ) : (
          courses.map(course => (
            <Grid item xs={12} sm={6} md={4} key={course._id}>
              <Card variant="outlined">
                <CardContent>
                  <Typography variant="h6">{course.title}</Typography>
                  <Typography variant="body2">Price: ₹{course.pricing || "N/A"}</Typography>
                  <Typography variant="body2">Category: {course.category || "N/A"}</Typography>
                  <Typography variant="body2">Level: {course.level || "N/A"}</Typography>
                  <Typography variant="body2">Language: {course.primaryLanguage || "N/A"}</Typography>
                  <Typography variant="body2">Description: {course.description || "N/A"}</Typography>
                  <Typography variant="body2">Subtitle: {course.subtitle || "N/A"}</Typography>
                  <Button variant="contained" color="primary" onClick={() => handleOpenUpdate(course)} style={{ marginRight: "10px" }}>Update</Button>
                  <Button variant="contained" color="secondary" onClick={() => setSelectedCourse(course) & setOpenDeleteDialog(true)}>Delete</Button>
                </CardContent>
              </Card>
            </Grid>
          ))
        )}
      </Grid>

      {/* Update Course Dialog */}
      <Dialog open={openDialog} onClose={handleCloseUpdate}>
        <DialogTitle>Update Course</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            label="Course Title"
            value={updatedData.title}
            onChange={(e) => setUpdatedData({ ...updatedData, title: e.target.value })}
            margin="dense"
          />
          <TextField
            fullWidth
            label="Pricing"
            type="number"
            value={updatedData.pricing}
            onChange={(e) => setUpdatedData({ ...updatedData, pricing: e.target.value })}
            margin="dense"
          />
          <TextField
            fullWidth
            label="Category"
            value={updatedData.category}
            onChange={(e) => setUpdatedData({ ...updatedData, category: e.target.value })}
            margin="dense"
          />
          <TextField
            fullWidth
            label="Level"
            value={updatedData.level}
            onChange={(e) => setUpdatedData({ ...updatedData, level: e.target.value })}
            margin="dense"
          />
          <TextField
            fullWidth
            label="Primary Language"
            value={updatedData.primaryLanguage}
            onChange={(e) => setUpdatedData({ ...updatedData, primaryLanguage: e.target.value })}
            margin="dense"
          />
          <TextField
            fullWidth
            label="Description"
            value={updatedData.description}
            onChange={(e) => setUpdatedData({ ...updatedData, description: e.target.value })}
            margin="dense"
          />

          <TextField
            fullWidth
            label="Subtitle"
            value={updatedData.subtitle}
            onChange={(e) => setUpdatedData({ ...updatedData, subtitle: e.target.value })}
            margin="dense"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseUpdate} color="secondary">Cancel</Button>
          <Button onClick={handleUpdateCourse} color="primary">Update</Button>
        </DialogActions>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={openDeleteDialog} onClose={() => setOpenDeleteDialog(false)}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this course? This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDeleteDialog(false)} color="secondary">Cancel</Button>
          <Button onClick={deleteCourse} color="error">Delete</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default InstructorChangeCourse;
