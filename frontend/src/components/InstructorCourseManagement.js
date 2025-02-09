import React, { useState, useEffect } from "react";
import { 
  Box, Grid, Card, CardContent, Typography, Button, TextField, Dialog, 
  DialogContent, DialogTitle, DialogActions, IconButton, CircularProgress, 
  CardMedia, Divider, Checkbox, FormControlLabel 
} from "@mui/material";
import { AddCircle, Close, Save } from "@mui/icons-material";
import { useParams } from "react-router-dom";

const InstructorCourseManagement = () => {
  const { courseId } = useParams();
  const [courseDetails, setCourseDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [updatedCourse, setUpdatedCourse] = useState({});
  const [showLessonDialog, setShowLessonDialog] = useState(false);

  const [newLesson, setNewLesson] = useState({
    title: "",
    videoUrl: "",
    freePreview: false
  });

  useEffect(() => {
    const fetchCourseData = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/courses/${courseId}`);
        if (!response.ok) throw new Error("Failed to fetch course data");

        const data = await response.json();
        setCourseDetails(data);
        setUpdatedCourse(data); // ✅ Pre-fill form with existing data
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchCourseData();
  }, [courseId]);

  const handleChange = (event) => {
    setUpdatedCourse({ ...updatedCourse, [event.target.name]: event.target.value });
  };

  const handleSaveChanges = async () => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      alert("Authorization token is missing! Please login again.");
      return;
    }

    try {
      const response = await fetch(`http://localhost:5000/api/courses/${courseId}`, {
        method: "PUT",
        headers: { 
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(updatedCourse),
      });
      if (!response.ok) throw new Error("Failed to update course");

      alert("Course updated successfully!");
      setEditMode(false);
      setCourseDetails(updatedCourse);
    } catch (error) {
      alert(error.message);
    }
  };

  const handleAddLesson = () => {
    setUpdatedCourse({ 
      ...updatedCourse, 
      curriculum: [...(updatedCourse.curriculum || []), newLesson] 
    });
    setNewLesson({ title: "", videoUrl: "", freePreview: false });
    setShowLessonDialog(false);
  };

  if (loading) {
    return <Box display="flex" justifyContent="center" alignItems="center" height="100vh"><CircularProgress /></Box>;
  }

  if (error) {
    return <Typography color="error" align="center">{error}</Typography>;
  }

  return (
    <Box sx={{ maxWidth: 1200, margin: "auto", padding: 3, backgroundColor: "#f9f9f9" }}>
      <Card sx={{ mb: 4, backgroundColor: "#263238", color: "white", borderRadius: 2 }}>
        <CardContent>
          <Typography variant="h4" fontWeight="bold">
            {editMode ? "Edit Course" : courseDetails.title}
          </Typography>
          <Typography variant="h6">
            {editMode ? "Update the details below" : courseDetails.subtitle}
          </Typography>
          <Typography variant="body2" sx={{ mt: 1 }}>Created by {courseDetails.instructorName}</Typography>
        </CardContent>
      </Card>

      <Grid container spacing={4}>
        {/* 🔹 Course Details */}
        <Grid item xs={12} md={8}>
          <Card sx={{ mb: 3 }}>
            <CardContent>
              <Typography variant="h5" fontWeight="bold">Course Details</Typography>
              <Divider sx={{ my: 1 }} />
              <TextField 
                label="Course Title" name="title" fullWidth sx={{ mb: 2 }} 
                value={updatedCourse.title} onChange={handleChange} 
                disabled={!editMode} 
              />
              <TextField 
                label="Subtitle" name="subtitle" fullWidth sx={{ mb: 2 }} 
                value={updatedCourse.subtitle} onChange={handleChange} 
                disabled={!editMode}
              />
              <TextField 
                label="Description" name="description" multiline rows={4} fullWidth sx={{ mb: 2 }} 
                value={updatedCourse.description} onChange={handleChange} 
                disabled={!editMode}
              />
            </CardContent>
          </Card>

          {/* 🔹 Curriculum (Now Always Visible) */}
          <Card sx={{ mb: 3 }}>
            <CardContent>
              <Typography variant="h5" fontWeight="bold">Course Curriculum</Typography>
              <Divider sx={{ my: 1 }} />
              {updatedCourse.curriculum?.length > 0 ? (
                updatedCourse.curriculum.map((lesson, index) => (
                  <Box key={index} display="flex" alignItems="center" sx={{
                    p: 2,
                    borderBottom: "1px solid #ddd",
                    "&:hover": { backgroundColor: "#e0f7fa" },
                  }}>
                    <Typography variant="body2" sx={{ flex: 1 }}>
                      {lesson.title} {lesson.freePreview && "(Free Preview)"}
                    </Typography>
                  </Box>
                ))
              ) : (
                <Typography>No lessons added yet.</Typography>
              )}

              {editMode && (
                <Button startIcon={<AddCircle />} variant="outlined" color="primary" fullWidth sx={{ mt: 2 }} onClick={() => setShowLessonDialog(true)}>
                  Add Lesson
                </Button>
              )}
            </CardContent>
          </Card>
        </Grid>

        {/* 🔹 Pricing & Image */}
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent sx={{ textAlign: "center" }}>
              <CardMedia
                component="img"
                alt={updatedCourse.title}
                image={updatedCourse.image}
                title={updatedCourse.title}
                sx={{ height: 200, objectFit: "cover", borderRadius: 1, mb: 2 }}
              />
              <TextField 
                label="Price (₹)" name="pricing" type="number" fullWidth 
                value={updatedCourse.pricing} onChange={handleChange} 
                disabled={!editMode}
              />
            </CardContent>
          </Card>
          <Button 
            variant="contained" color={editMode ? "success" : "primary"} 
            fullWidth sx={{ mt: 2 }} 
            onClick={editMode ? handleSaveChanges : () => setEditMode(true)}
          >
            {editMode ? <Save /> : "Edit Course"}
          </Button>
        </Grid>
      </Grid>

      {/* Lesson Dialog */}
      <Dialog open={showLessonDialog} onClose={() => setShowLessonDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>
          Add Lesson
          <IconButton aria-label="close" onClick={() => setShowLessonDialog(false)} sx={{ position: "absolute", right: 10, top: 10 }}>
            <Close />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <TextField label="Lesson Title" fullWidth sx={{ mb: 2 }} value={newLesson.title} onChange={(e) => setNewLesson({ ...newLesson, title: e.target.value })} />
          <TextField label="Google Drive Video URL" fullWidth sx={{ mb: 2 }} value={newLesson.videoUrl} onChange={(e) => setNewLesson({ ...newLesson, videoUrl: e.target.value })} />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowLessonDialog(false)} color="secondary">Cancel</Button>
          <Button onClick={handleAddLesson} color="primary">Add Lesson</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default InstructorCourseManagement;
