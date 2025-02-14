// import React, { useState, useEffect } from "react";
// import { Box, Grid, Card, CardContent, Typography, Button, Dialog, DialogContent, DialogTitle, DialogActions, IconButton, CircularProgress, CardMedia } from "@mui/material";
// import { PlayCircle, Lock, Close } from "@mui/icons-material";
// import { useParams } from "react-router-dom"; // useParams to get the courseId from URL

// const CourseDisplay = () => {
//   const { courseId } = useParams();  // Get the course ID from the URL
//   const [courseDetails, setCourseDetails] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [displayCurrentVideoFreePreview, setDisplayCurrentVideoFreePreview] = useState(null);
//   const [showFreePreviewDialog, setShowFreePreviewDialog] = useState(false);

//   // Fetch course details based on the courseId from the URL
//   useEffect(() => {
//     const fetchCourseData = async () => {
//       try {
//         // Fetch course by ID from the backend API
//         const response = await fetch(`http://localhost:5000/api/courses/${courseId}`);
//         if (!response.ok) {
//           throw new Error("Failed to fetch course data");
//         }
//         const data = await response.json();
//         setCourseDetails(data);  // Set the course data to the state
//       } catch (error) {
//         setError(error.message);  // Set error message if fetching fails
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchCourseData();  // Call the function to fetch data
//   }, [courseId]);  // Re-fetch when courseId changes

//   // Check if the URL is a Google Drive URL
//   const isGoogleDriveUrl = (url) => {
//     if (!url) return false;  // Return false if URL is null or undefined
//     return url.includes("drive.google.com");
//   };

//   // Convert Google Drive URL to embed URL
//   const getGoogleDriveEmbedUrl = (url) => {
//     if (!url) return null;  // Return null if URL is invalid
//     const fileId = url.split("/d/")[1]?.split("/")[0];
//     if (fileId) {
//       return `https://drive.google.com/file/d/${fileId}/preview`;
//     }
//     return null;
//   };

//   // Handle setting free preview video
//   const handleSetFreePreview = (videoUrl) => {
//     setDisplayCurrentVideoFreePreview(videoUrl);
//     setShowFreePreviewDialog(true);  // Show the video preview dialog
//   };

//   if (loading) {
//     return <CircularProgress />;  // Show a loading spinner while data is fetching
//   }

//   if (error) {
//     return <Typography color="error">{error}</Typography>;  // Display error message if fetching fails
//   }

//   if (!courseDetails) {
//     return <Typography>Course not found.</Typography>;  // If course details are not found, show a message
//   }

//   return (
//     <Box sx={{ maxWidth: 1200, margin: "auto", padding: 3 }}>
//       {/* Course Header */}
//       <Card sx={{ mb: 4, backgroundColor: "#1976d2", color: "white" }}>
//         <CardContent>
//           <Typography variant="h4" fontWeight="bold" gutterBottom>
//             {courseDetails.title}
//           </Typography>
//           <Typography variant="h6">{courseDetails.subtitle}</Typography>
//           <Typography variant="body1" sx={{ mt: 1 }}>
//             Created by {courseDetails.instructorName} | Date: {courseDetails.date.split("T")[0]}
//           </Typography>
//         </CardContent>
//       </Card>

//       <Grid container spacing={3}>
//         {/* Course Description & Curriculum */}
//         <Grid item xs={12} md={8}>
//           <Card sx={{ mb: 3 }}>
//             <CardContent>
//               <Typography variant="h5" fontWeight="bold">What You'll Learn</Typography>
//               <ul>
//                 {courseDetails.objectives.split(",").map((objective, index) => (
//                   <li key={index}>
//                     <Typography variant="body1" sx={{ mt: 1 }}>
//                       {objective}
//                     </Typography>
//                   </li>
//                 ))}
//               </ul>
//             </CardContent>
//           </Card>

//           <Card sx={{ mb: 3 }}>
//             <CardContent>
//               <Typography variant="h5" fontWeight="bold">Course Description</Typography>
//               <Typography variant="body1">{courseDetails.description}</Typography>
//             </CardContent>
//           </Card>

//           <Card sx={{ mb: 3 }}>
//             <CardContent>
//               <Typography variant="h5" fontWeight="bold">Course Curriculum</Typography>
//               {courseDetails.curriculum.map((lesson, index) => (
//                 <Box key={index} display="flex" alignItems="center" sx={{
//                     p: 2,
//                     borderBottom: "1px solid #ddd",
//                     cursor: lesson.freePreview ? "pointer" : "not-allowed",
//                     "&:hover": lesson.freePreview && { backgroundColor: "#f5f5f5" },
//                   }} 
//                   onClick={lesson.freePreview ? () => handleSetFreePreview(lesson.videoUrl) : null}>
//                   {lesson.freePreview ? (
//                     // Show PlayCircle icon when freePreview is true
//                     <PlayCircle sx={{ color: "#1976d2", mr: 2 }} />
//                   ) : (
//                     // Show Lock icon when freePreview is false
//                     <Lock sx={{ color: "gray", mr: 2 }} />
//                   )}
//                   <Typography variant="body1">{lesson.title}</Typography>
//                 </Box>
//               ))}
//             </CardContent>
//           </Card>
//         </Grid>

//         {/* Sidebar - Course Image & Watch Now */}
//         <Grid item xs={12} md={4}>
//           <Card>
//             <CardContent sx={{ textAlign: "center" }}>
//               {/* Display Course Image */}
//               <CardMedia
//                 component="img"
//                 alt={courseDetails.title}
//                 image={courseDetails.image} // The image URL from the database
//                 title={courseDetails.title}
//                 sx={{ height: 200, objectFit: "cover", marginBottom: 2 }} // Add some styling for the image
//               />
//               <Typography variant="h5" fontWeight="bold">Rs.{courseDetails.pricing}</Typography>
//               {/* Replace Buy Now with Watch Now */}
//               <Button variant="contained" color="primary" fullWidth sx={{ mt: 2 }} onClick={() => handleSetFreePreview(courseDetails.curriculum[0]?.videoUrl)}>
//                 Watch Now
//               </Button>
//             </CardContent>
//           </Card>
//         </Grid>
//       </Grid>

//       {/* Video Preview Dialog */}
//       <Dialog open={showFreePreviewDialog} onClose={() => setShowFreePreviewDialog(false)} maxWidth="md" fullWidth>
//         <DialogTitle>
//           Course Preview
//           <IconButton
//             aria-label="close"
//             onClick={() => setShowFreePreviewDialog(false)}
//             sx={{ position: "absolute", right: 10, top: 10 }}
//           >
//             <Close />
//           </IconButton>
//         </DialogTitle>
//         <DialogContent>
//           <Box sx={{ width: "100%", height: 350, backgroundColor: "#ddd", display: "flex", alignItems: "center", justifyContent: "center" }}>
//             {isGoogleDriveUrl(displayCurrentVideoFreePreview) ? (
//               // If the video is from Google Drive, use iframe to embed it
//               <iframe
//                 width="100%"
//                 height="350"
//                 src={getGoogleDriveEmbedUrl(displayCurrentVideoFreePreview)}
//                 frameBorder="0"
//                 allow="autoplay; encrypted-media; picture-in-picture"
//                 allowFullScreen
//               ></iframe>
//             ) : (
//               // If it's a local video URL, use a video tag
//               <video controls width="100%" height="350px">
//                 <source src={displayCurrentVideoFreePreview} type="video/mp4" />
//                 Your browser does not support the video tag.
//               </video>
//             )}
//           </Box>
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={() => setShowFreePreviewDialog(false)} color="secondary">Close</Button>
//         </DialogActions>
//       </Dialog>
//     </Box>
//   );
// };

// export default CourseDisplay;


import React, { useState, useEffect } from "react";
import { Box, Grid, Card, CardContent, Typography, Button, Dialog, DialogContent, DialogTitle, DialogActions, IconButton, CircularProgress, CardMedia, Divider } from "@mui/material";
import { PlayCircle, Lock, Close } from "@mui/icons-material";
import { useParams } from "react-router-dom";

const CourseDisplay = () => {
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
    return <Box display="flex" justifyContent="center" alignItems="center" height="100vh"><CircularProgress /></Box>;
  }

  if (error) {
    return <Typography color="error" align="center">{error}</Typography>;
  }

  return (
    <Box sx={{ maxWidth: 1200, margin: "auto", padding: 3, backgroundColor: "#f9f9f9" ,paddingY:10}}>
      <Card sx={{ mb: 4, backgroundColor: "#263238", color: "white", borderRadius: 2 }}>
        <CardContent>
          <Typography variant="h4" fontWeight="bold">{courseDetails.title}</Typography>
          <Typography variant="h6">{courseDetails.subtitle}</Typography>
          <Typography variant="body2" sx={{ mt: 1 }}>Created by {courseDetails.instructorName}</Typography>
        </CardContent>
      </Card>

      <Grid container spacing={4}>
        <Grid item xs={12} md={8}>
          <Card sx={{ mb: 3 }}>
            <CardContent>
              <Typography variant="h5" fontWeight="bold">What You'll Learn</Typography>
              <Divider sx={{ my: 1 }} />
              {courseDetails.objectives.split(",").map((objective, index) => (
                <Typography key={index} variant="body2" sx={{ mt: 1 }}>✔ {objective}</Typography>
              ))}
            </CardContent>
          </Card>

          <Card sx={{ mb: 3 }}>
            <CardContent>
              <Typography variant="h5" fontWeight="bold">Course Description</Typography>
              <Divider sx={{ my: 1 }} />
              <Typography variant="body2">{courseDetails.description}</Typography>
            </CardContent>
          </Card>

          <Card>
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

        <Grid item xs={12} md={4}>
          <Card>
            <CardContent sx={{ textAlign: "center" }}>
              <CardMedia
                component="img"
                alt={courseDetails.title}
                image={courseDetails.image}
                title={courseDetails.title}
                sx={{ height: 200, objectFit: "cover", borderRadius: 1, mb: 2 }}
              />
              <Typography variant="h5" fontWeight="bold">₹{courseDetails.pricing}</Typography>
              <Button variant="contained" color="secondary" fullWidth sx={{ mt: 2 }} onClick={() => handlePreview(courseDetails.curriculum[0]?.videoUrl)}>
                Start Learning
              </Button>
            </CardContent>
          </Card>
        </Grid>
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
    </Box>
  );
};

export default CourseDisplay;
