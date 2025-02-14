// LandingPage.js
import React from 'react';
import { 
  AppBar, 
  Box, 
  Button, 
  Card, 
  CardContent, 
  Container, 
  Grid, 
  Typography, 
  useTheme, 
  useMediaQuery,
  Paper
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { 
  School, 
  People, 
  EmojiEvents, 
  PlayArrow, 
  ArrowForward,
  Psychology,
  Timeline,
  Assignment
} from '@mui/icons-material';

// Styled components
const HeroSection = styled(Box)(({ theme }) => ({
  backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url("/hero-bg.jpg")',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  color: theme.palette.common.white,
  padding: theme.spacing(15, 0),
  position: 'relative',
  [theme.breakpoints.down('md')]: {
    padding: theme.spacing(10, 0),
  },
}));

const GradientTypography = styled(Typography)(({ theme }) => ({
  background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
}));

const FeatureCard = styled(Card)(({ theme }) => ({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
  '&:hover': {
    transform: 'translateY(-10px)',
    boxShadow: theme.shadows[10],
  },
}));

const StatsSection = styled(Box)(({ theme }) => ({
  background: theme.palette.grey[100],
  padding: theme.spacing(8, 0),
}));

const LandingPage = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Box>
      {/* Hero Section */}
      <HeroSection>
        <Container maxWidth="lg">
          <Grid container spacing={4} justifyContent="center" alignItems="center">
            <Grid item xs={12} md={8} textAlign="center">
              <GradientTypography variant={isMobile ? 'h3' : 'h2'} component="h1" gutterBottom>
                Transform Your Learning Journey
              </GradientTypography>
              <Typography variant="h5" paragraph>
                Discover a world of knowledge with our interactive learning platform
              </Typography>
              <Box mt={4} display="flex" gap={2} justifyContent="center">
                <Button 
                  variant="contained" 
                  size="large" 
                  endIcon={<ArrowForward />}
                  sx={{ px: 4 }}
                >
                  Get Started
                </Button>
                <Button 
                  variant="outlined" 
                  size="large" 
                  color="inherit"
                  startIcon={<PlayArrow />}
                  sx={{ px: 4 }}
                >
                  Watch Demo
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </HeroSection>

      {/* Features Section */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Typography variant="h3" align="center" gutterBottom>
          Why Choose Our Platform?
        </Typography>
        <Grid container spacing={4} sx={{ mt: 4 }}>
          {features.map((feature, index) => (
            <Grid item xs={12} md={4} key={index}>
              <FeatureCard>
                <CardContent sx={{ textAlign: 'center', p: 4 }}>
                  {feature.icon}
                  <Typography variant="h5" component="h3" sx={{ mt: 2, mb: 1 }}>
                    {feature.title}
                  </Typography>
                  <Typography color="text.secondary">
                    {feature.description}
                  </Typography>
                </CardContent>
              </FeatureCard>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Stats Section */}
      <StatsSection>
        <Container maxWidth="lg">
          <Grid container spacing={4}>
            {stats.map((stat, index) => (
              <Grid item xs={6} md={3} key={index}>
                <Paper elevation={0} sx={{ p: 3, textAlign: 'center' }}>
                  <Typography variant="h3" color="primary" gutterBottom>
                    {stat.number}
                  </Typography>
                  <Typography variant="h6" color="text.secondary">
                    {stat.label}
                  </Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Container>
      </StatsSection>

      {/* CTA Section */}
      <Box sx={{ bgcolor: 'primary.main', color: 'white', py: 8 }}>
        <Container maxWidth="md" sx={{ textAlign: 'center' }}>
          <Typography variant="h4" gutterBottom>
            Ready to Begin Your Learning Journey?
          </Typography>
          <Typography variant="h6" sx={{ mb: 4 }}>
            Join thousands of successful learners today
          </Typography>
          <Button 
            variant="contained" 
            size="large" 
            color="secondary"
            sx={{ px: 6 }}
          >
            Start Learning Now
          </Button>
        </Container>
      </Box>
    </Box>
  );
};

const features = [
  {
    icon: <Psychology sx={{ fontSize: 60, color: 'primary.main' }} />,
    title: 'AI-Powered Learning',
    description: 'Personalized learning paths adapted to your unique style and pace'
  },
  {
    icon: <People sx={{ fontSize: 60, color: 'primary.main' }} />,
    title: 'Expert Instructors',
    description: 'Learn from industry professionals with real-world experience'
  },
  {
    icon: <EmojiEvents sx={{ fontSize: 60, color: 'primary.main' }} />,
    title: 'Recognized Certificates',
    description: 'Earn valuable credentials respected by employers worldwide'
  }
];

const stats = [
  { number: '50K+', label: 'Active Learners' },
  { number: '1000+', label: 'Expert Instructors' },
  { number: '2500+', label: 'Courses Available' },
  { number: '98%', label: 'Success Rate' }
];

export default LandingPage;