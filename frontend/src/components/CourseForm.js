import React, { useState } from 'react';
import {
  Button, Card, CardContent, Typography, Grid, Box, TextField, Select, MenuItem,
  InputLabel, FormControl, Checkbox, FormControlLabel, Divider
} from '@mui/material';

const courseCategories = ['Programming', 'Design', 'Marketing'];
const courseLevelOptions = ['Beginner', 'Intermediate', 'Advanced'];
const languageOptions = ['English', 'Spanish', 'French'];

const CourseForm = () => {
  const [courseLandingFormData, setCourseLandingFormData] = useState({
    title: '', category: '', level: '', primaryLanguage: '', subtitle: '', description: '',
    pricing: '', objectives: '', welcomeMessage: '', image: '', instructorId: '', instructorName: '',
  });

  const [courseCurriculumFormData, setCourseCurriculumFormData] = useState([{ title: '', videoUrl: '', freePreview: false, public_id: '' }]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCourseLandingFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleCurriculumChange = (index, e) => {
    const { name, value } = e.target;
    const updatedCurriculum = [...courseCurriculumFormData];
    updatedCurriculum[index] = { ...updatedCurriculum[index], [name]: value };
    setCourseCurriculumFormData(updatedCurriculum);
  };

  const handleAddCurriculum = () => {
    setCourseCurriculumFormData([...courseCurriculumFormData, { title: '', videoUrl: '', freePreview: false, public_id: '' }]);
  };

  const handleRemoveCurriculum = (index) => {
    const updatedCurriculum = courseCurriculumFormData.filter((_, i) => i !== index);
    setCourseCurriculumFormData(updatedCurriculum);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!courseLandingFormData.title || !courseLandingFormData.pricing || !courseLandingFormData.instructorId || !courseLandingFormData.instructorName) {
      alert('Title, Pricing, Instructor ID, and Instructor Name are required!');
      return;
    }

    const courseFinalFormData = {
      date: new Date(),
      ...courseLandingFormData,
      pricing: Number(courseLandingFormData.pricing),
      curriculum: courseCurriculumFormData,
      isPublished: true,
    };

    try {
      const response = await fetch('http://localhost:5000/api/courses', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(courseFinalFormData),
      });

      const result = await response.json();
      if (response.ok) {
        alert('Course created successfully');
        setCourseLandingFormData({
          title: '', category: '', level: '', primaryLanguage: '', subtitle: '', description: '',
          pricing: '', objectives: '', welcomeMessage: '', image: '', instructorId: '', instructorName: '',
        });
        setCourseCurriculumFormData([{ title: '', videoUrl: '', freePreview: false, public_id: '' }]);
      } else {
        alert(`Failed to create course: ${result.message}`);
      }
    } catch (error) {
      console.error('Error submitting course:', error);
      alert('An error occurred while creating the course');
    }
  };

  return (
    <Box sx={{ padding: 3, backgroundColor: '#f9f9f9', borderRadius: '8px', boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)' }}>
      <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', textAlign: 'center', marginBottom: 4 }}>
        Create a New Course
      </Typography>

      <form onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          {/* Course Landing Form */}
          <Grid item xs={12} md={6}>
            <TextField
              id="course-title"
              name="title"
              label="Course Title"
              fullWidth
              value={courseLandingFormData.title}
              onChange={handleInputChange}
              required
              variant="outlined"
              sx={{ marginBottom: 2 }}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <FormControl fullWidth variant="outlined" sx={{ marginBottom: 2 }}>
              <InputLabel id="category-label">Category</InputLabel>
              <Select
                labelId="category-label"
                id="category"
                name="category"
                value={courseLandingFormData.category}
                onChange={handleInputChange}
                label="Category"
              >
                {courseCategories.map((category) => (
                  <MenuItem key={category} value={category}>
                    {category}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} md={6}>
            <FormControl fullWidth variant="outlined" sx={{ marginBottom: 2 }}>
              <InputLabel id="level-label">Level</InputLabel>
              <Select
                labelId="level-label"
                id="level"
                name="level"
                value={courseLandingFormData.level}
                onChange={handleInputChange}
                label="Level"
              >
                {courseLevelOptions.map((level) => (
                  <MenuItem key={level} value={level}>
                    {level}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} md={6}>
            <FormControl fullWidth variant="outlined" sx={{ marginBottom: 2 }}>
              <InputLabel id="language-label">Primary Language</InputLabel>
              <Select
                labelId="language-label"
                id="primaryLanguage"
                name="primaryLanguage"
                value={courseLandingFormData.primaryLanguage}
                onChange={handleInputChange}
                label="Primary Language"
              >
                {languageOptions.map((language) => (
                  <MenuItem key={language} value={language}>
                    {language}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          {/* Additional fields like Subtitle, Description, Pricing */}
          <Grid item xs={12} md={6}>
            <TextField
              id="subtitle"
              name="subtitle"
              label="Subtitle"
              fullWidth
              value={courseLandingFormData.subtitle}
              onChange={handleInputChange}
              variant="outlined"
              sx={{ marginBottom: 2 }}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              id="pricing"
              name="pricing"
              label="Pricing"
              type="number"
              fullWidth
              value={courseLandingFormData.pricing}
              onChange={handleInputChange}
              required
              variant="outlined"
              sx={{ marginBottom: 2 }}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              id="description"
              name="description"
              label="Description"
              fullWidth
              multiline
              rows={4}
              value={courseLandingFormData.description}
              onChange={handleInputChange}
              variant="outlined"
              sx={{ marginBottom: 2 }}
            />
          </Grid>

          {/* Course Curriculum Form */}
          <Grid item xs={12}>
            <Typography variant="h6" gutterBottom sx={{ marginBottom: 2 }}>
              Course Curriculum
            </Typography>
            {courseCurriculumFormData.map((curriculum, index) => (
              <Box key={index} sx={{ border: '1px solid #ddd', padding: 2, marginBottom: 2, borderRadius: '8px' }}>
                <Typography variant="subtitle1" sx={{ marginBottom: 2 }}>Module {index + 1}</Typography>

                <TextField
                  label="Module Title"
                  name="title"
                  value={curriculum.title}
                  onChange={(e) => handleCurriculumChange(index, e)}
                  fullWidth
                  variant="outlined"
                  sx={{ marginBottom: 2 }}
                />

                <TextField
                  label="Video URL"
                  name="videoUrl"
                  value={curriculum.videoUrl}
                  onChange={(e) => handleCurriculumChange(index, e)}
                  fullWidth
                  variant="outlined"
                  sx={{ marginBottom: 2 }}
                />

                <FormControlLabel
                  control={
                    <Checkbox
                      checked={curriculum.freePreview}
                      onChange={(e) => handleCurriculumChange(index, e)}
                      name="freePreview"
                    />
                  }
                  label="Free Preview"
                />

                <Button
                  variant="outlined"
                  color="error"
                  onClick={() => handleRemoveCurriculum(index)}
                  sx={{ marginTop: 2 }}
                >
                  Remove Module
                </Button>
              </Box>
            ))}

            <Button variant="outlined" onClick={handleAddCurriculum} sx={{ marginBottom: 3 }}>
              Add Module
            </Button>
          </Grid>

          {/* Submit Button */}
          <Grid item xs={12}>
            <Button
              variant="contained"
              color="primary"
              type="submit"
              fullWidth
              sx={{
                padding: '12px',
                backgroundColor: '#1976d2',
                '&:hover': { backgroundColor: '#1565c0' }
              }}
            >
              Create Course
            </Button>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
};

export default CourseForm;
