import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AppBar, Toolbar, Button, Typography, Box } from '@mui/material';

const NavBar = ({ onLogout, learnerId }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    onLogout();
    navigate('/login');
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: 'primary.main' }}>
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography 
          variant="h6" 
          component="div" 
          sx={{ flexGrow: 1, fontSize: '1.5rem', fontWeight: 'bold' }}
        >
          Learning Platform
        </Typography>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button 
            color="inherit" 
            component={Link} 
            to="/" 
            sx={{ textTransform: 'none', '&:hover': { backgroundColor: 'primary.light' } }}
          >
            Home
          </Button>
          <Button 
            color="inherit" 
            component={Link} 
            to={`/enrolled/${learnerId}`} 
            sx={{ textTransform: 'none', '&:hover': { backgroundColor: 'primary.light' } }}
          >
            My Courses
          </Button>
          <Button 
            color="inherit" 
            component={Link} 
            to="/support" 
            sx={{ textTransform: 'none', '&:hover': { backgroundColor: 'primary.light' } }}
          >
            Support
          </Button>
          
          <Button 
            color="inherit" 
            onClick={handleLogout} 
            sx={{ textTransform: 'none', '&:hover': { backgroundColor: 'error.main' } }}
          >
            Logout
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
