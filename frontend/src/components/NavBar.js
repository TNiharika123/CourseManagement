import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AppBar, Toolbar, Button, Typography } from '@mui/material';

const NavBar = ({ onLogout, learnerId }) => {  // Assuming `role` is passed down as a prop (e.g., "instructor", "learner")
  const navigate = useNavigate();

  const handleLogout = () => {
    onLogout();
    navigate('/login');
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography 
          variant="h6" 
          component="div" 
          sx={{ flexGrow: 1, fontSize: '1.25rem', textTransform: 'none' }} // Change font size and prevent capitalization
        >
          Learning Platform
        </Typography>
        <Button 
          color="inherit" 
          component={Link} 
          to="/" 
          sx={{ fontSize: '1rem', textTransform: 'none' }} // Change font size and prevent capitalization
        >
          Home
        </Button>
        <Button 
          color="inherit" 
          component={Link} 
          to={`/enrolled/${learnerId}`} 
          sx={{ fontSize: '1rem', textTransform: 'none' }} // Change font size and prevent capitalization
        >
          My Courses
        </Button>
        <Button 
          color="inherit" 
          component={Link} 
          to="/support" 
          sx={{ fontSize: '1rem', textTransform: 'none' }} // Change font size and prevent capitalization
        >
          Support
        </Button>

        <Button 
          color="inherit" 
          component={Link} 
          to="/updateCourse" 
          sx={{ fontSize: '1rem', textTransform: 'none' }} // Change font size and prevent capitalization
        >
          Update Course
        </Button>
        <Button 
          color="inherit" 
          component={Link} 
          to="/createCourse" 
          sx={{ fontSize: '1rem', textTransform: 'none' }} // Change font size and prevent capitalization
        >
          Create Course
        </Button>
        <Button 
          color="inherit" 
          component={Link} 
          to="/createAIExam" 
          sx={{ fontSize: '1rem', textTransform: 'none' }} // Change font size and prevent capitalization
        >
          Create AI Exam
        </Button>
       
        <Button 
          color="inherit" 
          onClick={handleLogout} 
          sx={{ fontSize: '1rem', textTransform: 'none' }} // Change font size and prevent capitalization
        >
          Logout
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
