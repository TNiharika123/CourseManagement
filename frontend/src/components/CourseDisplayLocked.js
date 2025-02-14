import React, { useState, useEffect } from "react";
import {
    Box,
    Grid,
    Card,
    CardContent,
    Typography,
    Button,
    Dialog,
    DialogContent,
    DialogTitle,
    DialogActions,
    IconButton,
    CircularProgress,
    CardMedia,
    Divider
} from "@mui/material";
import { Lock, Close, PlayCircle } from "@mui/icons-material";
import { useParams } from "react-router-dom";
import { Link } from 'react-router-dom';


const CourseDisplayLocked = () => {
    const { courseId } = useParams();
    const [courseDetails, setCourseDetails] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
      const [previewVideo, setPreviewVideo] = useState(null);
      const [showPreviewDialog, setShowPreviewDialog] = useState(false);

    useEffect(() => {
        const fetchCourseData = async () => {
            try {
                const response = await fetch(`http://localhost:5000/api/courses/${courseId}`);
                if (!response.ok) {
                    throw new Error("Failed to fetch course data");
                }
                const data = await response.json();
                setCourseDetails(data);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };
        fetchCourseData();
    }, [courseId]);

    const getGoogleDriveEmbedUrl = (url) => {
        if (!url) return null;
        const fileId = url.split("/d/")[1]?.split("/")[0];
        return fileId ? `https://drive.google.com/file/d/${fileId}/preview` : null;
    };


    const handlePreview = (videoUrl) => {
        setPreviewVideo(videoUrl);
        setShowPreviewDialog(true);
      };

    if (loading) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
                <CircularProgress />
            </Box>
        );
    }

    if (error) {
        return (
            <Typography color="error" align="center">
                {error}
            </Typography>
        );
    }

    return (
        <Box sx={{ maxWidth: 1200, margin: "auto", padding: 3, backgroundColor: "#f9f9f9", py: 10 }}>
            <Card sx={{ mb: 4, backgroundColor: "#263238", color: "white", borderRadius: 2 }}>
                <CardContent>
                    <Typography variant="h4" fontWeight="bold">{courseDetails.title}</Typography>
                    <Typography variant="h6">{courseDetails.subtitle}</Typography>
                    <Typography variant="body2" sx={{ mt: 1 }}>
                        Created by {courseDetails.instructorName}
                    </Typography>
                </CardContent>
            </Card>

            <Grid container spacing={4}>
                <Grid item xs={12} md={8}>
                    {/* What You'll Learn Section */}
                    <Card sx={{ mb: 3 }}>
                        <CardContent>
                            <Typography variant="h5" fontWeight="bold">What You'll Learn</Typography>
                            <Divider sx={{ my: 1 }} />
                            {courseDetails.objectives?.split(",").map((objective, index) => (
                                <Typography key={index} variant="body2" sx={{ mt: 1 }}>
                                    ✔ {objective}
                                </Typography>
                            ))}
                        </CardContent>
                    </Card>

                    {/* Course Description Section */}
                    <Card sx={{ mb: 3 }}>
                        <CardContent>
                            <Typography variant="h5" fontWeight="bold">Course Description</Typography>
                            <Divider sx={{ my: 1 }} />
                            <Typography variant="body2">{courseDetails.description}</Typography>
                        </CardContent>
                    </Card>

                    {/* Course Curriculum Section */}
                    <Card sx={{ mb: 3 }}>
                        <CardContent>
                                     <Typography variant="h5" fontWeight="bold">Course Curriculum</Typography>
                                     <Divider sx={{ my: 1 }} />
                                     {courseDetails.curriculum.map((lesson, index) => (
                                       <Box key={index} display="flex" alignItems="center" sx={{
                                         p: 2,
                                         borderBottom: "1px solid #ddd",
                                         cursor: lesson.freePreview ? "pointer" : "default",
                                         "&:hover": lesson.freePreview && { backgroundColor: "#e0f7fa" },
                                       }}
                                         onClick={lesson.freePreview ? () => handlePreview(lesson.videoUrl) : null}>
                                         {lesson.freePreview ? <PlayCircle sx={{ color: "#0288d1", mr: 2 }} /> : <Lock sx={{ color: "gray", mr: 2 }} />}
                                         <Typography variant="body2">{lesson.title}</Typography>
                                       </Box>
                                     ))}
                                   </CardContent>
                    </Card>
                </Grid>

                 <Dialog open={showPreviewDialog} onClose={() => setShowPreviewDialog(false)} maxWidth="md" fullWidth>
                        <DialogTitle>
                          Course Preview
                          <IconButton aria-label="close" onClick={() => setShowPreviewDialog(false)} sx={{ position: "absolute", right: 10, top: 10 }}>
                            <Close />
                          </IconButton>
                        </DialogTitle>
                        <DialogContent>
                          <Box sx={{ width: "100%", height: 350 }}>
                            <iframe
                              title="Course Video Preview" // Add a meaningful title
                              width="100%"
                              height="350"
                              src={getGoogleDriveEmbedUrl(previewVideo)}
                              frameBorder="0"
                              allow="autoplay; encrypted-media; picture-in-picture"
                              allowFullScreen
                            ></iframe>
                
                          </Box>
                        </DialogContent>
                        <DialogActions>
                          <Button onClick={() => setShowPreviewDialog(false)} color="secondary">Close</Button>
                        </DialogActions>
                      </Dialog>

                {/* Course Pricing & Enrollment Section */}
                <Grid item xs={12} md={4}>
                    <Card>
                        <CardContent sx={{ textAlign: "center" }}>
                            <CardMedia
                                component="img"
                                alt={courseDetails.title}
                                image={courseDetails.image || "https://via.placeholder.com/300"}
                                title={courseDetails.title}
                                sx={{ height: 200, objectFit: "cover", borderRadius: 1, mb: 2 }}
                            />
                            <Typography variant="h5" fontWeight="bold">
                                ₹{courseDetails.pricing}
                            </Typography>
                            <Button
                                variant="contained"
                                fullWidth
                                component={Link}
                                to={`/payment/${courseDetails._id}`} // Corrected from course._id to courseDetails._id
                                sx={{ mt: 2 }}
                            >
                                Enroll Now
                            </Button>

                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </Box>
    );
};

export default CourseDisplayLocked;
