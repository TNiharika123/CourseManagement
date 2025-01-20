import React, { useState } from 'react';
import { TextField, Button, Grid, Box, Typography, Select, MenuItem, InputLabel, FormControl, Checkbox, FormControlLabel } from '@mui/material';

const courseCategories = ['Programming', 'Design', 'Marketing'];
const courseLevelOptions = ['Beginner', 'Intermediate', 'Advanced'];
const languageOptions = ['English', 'Spanish', 'French'];

const CourseForm = () => {
  const [courseLandingFormData, setCourseLandingFormData] = useState({
    title: '',
    category: '',
    level: '',
    primaryLanguage: '',
    subtitle: '',
    description: '',
    pricing: '',
    objectives: '',
    welcomeMessage: '',
    image: '',
    instructorId: '',
    instructorName: '',
  });

  const [courseCurriculumFormData, setCourseCurriculumFormData] = useState([
    { title: '', videoUrl: '', freePreview: false, public_id: '' },
  ]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCourseLandingFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleCurriculumChange = (index, e) => {
    const { name, value } = e.target;
    const updatedCurriculum = [...courseCurriculumFormData];
    updatedCurriculum[index] = {
      ...updatedCurriculum[index],
      [name]: value,
    };
    setCourseCurriculumFormData(updatedCurriculum);
  };

  const handleAddCurriculum = () => {
    setCourseCurriculumFormData([
      ...courseCurriculumFormData,
      { title: '', videoUrl: '', freePreview: false, public_id: '' },
    ]);
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
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(courseFinalFormData),
      });
  
      const result = await response.json();
      if (response.ok) {
        alert('Course created successfully');
        setCourseLandingFormData({
          title: '',
          category: '',
          level: '',
          primaryLanguage: '',
          subtitle: '',
          description: '',
          pricing: '',
          objectives: '',
          welcomeMessage: '',
          image: '',
          instructorId: '',
          instructorName: '',
        });
        setCourseCurriculumFormData([
          { title: '', videoUrl: '', freePreview: false, public_id: '' },
        ]);
      } else {
        alert(`Failed to create course: ${result.message}`);
      }
    } catch (error) {
      console.error('Error submitting course:', error);
      alert('An error occurred while creating the course');
    }
  };

  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h4" gutterBottom>
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
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <FormControl fullWidth>
              <InputLabel id="category-label">Category</InputLabel>
              <Select
                labelId="category-label"
                id="category"
                name="category"
                value={courseLandingFormData.category}
                onChange={handleInputChange}
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
            <FormControl fullWidth>
              <InputLabel id="level-label">Level</InputLabel>
              <Select
                labelId="level-label"
                id="level"
                name="level"
                value={courseLandingFormData.level}
                onChange={handleInputChange}
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
            <FormControl fullWidth>
              <InputLabel id="language-label">Primary Language</InputLabel>
              <Select
                labelId="language-label"
                id="primaryLanguage"
                name="primaryLanguage"
                value={courseLandingFormData.primaryLanguage}
                onChange={handleInputChange}
              >
                {languageOptions.map((language) => (
                  <MenuItem key={language} value={language}>
                    {language}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12}>
            <TextField
              id="subtitle"
              name="subtitle"
              label="Subtitle"
              fullWidth
              value={courseLandingFormData.subtitle}
              onChange={handleInputChange}
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
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              id="objectives"
              name="objectives"
              label="Objectives"
              fullWidth
              multiline
              rows={4}
              value={courseLandingFormData.objectives}
              onChange={handleInputChange}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              id="welcomeMessage"
              name="welcomeMessage"
              label="Welcome Message"
              fullWidth
              multiline
              rows={4}
              value={courseLandingFormData.welcomeMessage}
              onChange={handleInputChange}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              id="image"
              name="image"
              label="Image URL"
              fullWidth
              value={courseLandingFormData.image}
              onChange={handleInputChange}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              id="instructor-id"
              name="instructorId"
              label="Instructor ID"
              fullWidth
              value={courseLandingFormData.instructorId}
              onChange={handleInputChange}
              required
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              id="instructor-name"
              name="instructorName"
              label="Instructor Name"
              fullWidth
              value={courseLandingFormData.instructorName}
              onChange={handleInputChange}
              required
            />
          </Grid>

          {/* Course Curriculum Form */}
          <Grid item xs={12}>
            <Typography variant="h6" gutterBottom>
              Course Curriculum
            </Typography>
            {courseCurriculumFormData.map((curriculum, index) => (
              <Box key={index} sx={{ border: '1px solid #ccc', padding: 2, marginBottom: 2 }}>
                <Typography variant="subtitle1">Module {index + 1}</Typography>

                <TextField
                  id={`curriculum-title-${index}`}
                  name="title"
                  label="Title"
                  value={curriculum.title}
                  onChange={(e) => handleCurriculumChange(index, e)}
                  fullWidth
                />

                <TextField
                  id={`curriculum-videoUrl-${index}`}
                  name="videoUrl"
                  label="Video URL"
                  value={curriculum.videoUrl}
                  onChange={(e) => handleCurriculumChange(index, e)}
                  fullWidth
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
                >
                  Remove Module
                </Button>
              </Box>
            ))}

            <Button variant="outlined" onClick={handleAddCurriculum}>
              Add Module
            </Button>
          </Grid>

          {/* Submit Button */}
          <Grid item xs={12}>
            <Button variant="contained" color="primary" type="submit" fullWidth>
              Create Course
            </Button>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
};

export default CourseForm;
