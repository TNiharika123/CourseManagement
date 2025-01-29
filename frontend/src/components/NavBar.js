import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AppBar, Toolbar, Button, Typography } from '@mui/material';

const NavBar = ({ onLogout, learnerId, role }) => {  // Assuming `role` is passed down as a prop (e.g., "instructor", "learner")
  const navigate = useNavigate();

  const handleLogout = () => {
    onLogout();
    navigate('/login');
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Learning Platform
        </Typography>
        <Button color="inherit" component={Link} to="/">
          Home
        </Button>
        <Button color="inherit" component={Link} to={`/enrolled/${learnerId}`}>
          My Courses
        </Button>
        <Button color="inherit" component={Link} to="/support">
          Support
        </Button>

        
            <Button color="inherit" component={Link} to="/updateCourse">
              Update Course
            </Button>
            <Button color="inherit" component={Link} to="/createCourse">
              Create Course
            </Button>
            <Button color="inherit" component={Link} to="/createAIExam">
              Create AI Exam
            </Button>
       
        <Button color="inherit" onClick={handleLogout}>
          Logout
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
