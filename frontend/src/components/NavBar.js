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
    <AppBar 
      position="fixed" 
      sx={{ 
        background: 'linear-gradient(135deg, #1e3c72 30%, #2a5298 90%)', // Modern gradient
        boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)', // Subtle shadow
        paddingY: 0.5,
        zIndex: 1100 // Ensures it's above other elements
      }}
    >
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        
        {/* Logo / Branding */}
        <Typography 
          variant="h5" 
          component="div" 
          sx={{ 
            fontWeight: 'bold', 
            letterSpacing: '1px', 
            color: '#fff', 
            fontFamily: 'Poppins, sans-serif'
          }}
        >
          LearnSphere
        </Typography>

        {/* Navigation Links */}
        <Box sx={{ display: 'flex', gap: 2 }}>
          <NavButton to="/" label="Home" />
          <NavButton to={`/enrolled/${learnerId}`} label="My Courses" />
          <NavButton to="/support" label="Support" />
          
          {/* Logout Button */}
          <Button 
            color="inherit" 
            onClick={handleLogout} 
            sx={{ 
              textTransform: 'none', 
              backgroundColor: '#ff5f5f', 
              '&:hover': { backgroundColor: '#e63946' }, 
              borderRadius: '8px', 
              paddingX: 2
            }}
          >
            Logout
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

/* Styled Navigation Button Component */
const NavButton = ({ to, label }) => (
  <Button 
    component={Link} 
    to={to} 
    sx={{ 
      textTransform: 'none', 
      color: 'white', 
      fontWeight: 'bold', 
      '&:hover': { color: '#fbc531' } 
    }}
  >
    {label}
  </Button>
);

export default NavBar;
