import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Container,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  CircularProgress,
  Box,
  Alert,
  Grid,
} from "@mui/material";
import ReCAPTCHA from "react-google-recaptcha";

const AdminLogin = () => {
  const [formData, setFormData] = useState({ Email: "", Password: "" });
  const [loading, setLoading] = useState(false);
  const [captchaValue, setCaptchaValue] = useState(null);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Handle input field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle CAPTCHA verification
  const handleCaptchaChange = (value) => {
    setCaptchaValue(value);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Clear previous errors

    if (!captchaValue) {
      setError("Please complete the CAPTCHA verification.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("/api/admins/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ Email: formData.Email, Password: formData.Password }),
      });

      if (response.ok) {
        alert("Login successful!");
        navigate("/admindashboard");
      } else {
        const errorData = await response.json();
        setError(`Login failed: ${errorData.message || "Unknown error"}`);
      }
    } catch (error) {
      console.error("Error:", error);
      setError("Something went wrong while logging in.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 5 }}>
      <Card sx={{ p: 4, boxShadow: 4, borderRadius: 3 }}>
        <CardContent>
          <Typography variant="h4" align="center" fontWeight="bold" color="primary" gutterBottom>
            Admin Login
          </Typography>

          {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

          <form onSubmit={handleSubmit}>
            <TextField
              label="Email Address"
              type="email"
              name="Email"
              fullWidth
              value={formData.Email}
              onChange={handleChange}
              required
              sx={{ mb: 2 }}
            />

            <TextField
              label="Password"
              type="password"
              name="Password"
              fullWidth
              value={formData.Password}
              onChange={handleChange}
              required
              sx={{ mb: 2 }}
            />

            {/* CAPTCHA Section */}
            <Box sx={{ display: "flex", justifyContent: "center", mb: 2 }}>
              <ReCAPTCHA sitekey="6LfVD8oqAAAAAB7yjBdEM_zvhm5LCG5UjIF8XB2h" onChange={handleCaptchaChange} />
            </Box>

            <Button variant="contained" color="primary" fullWidth type="submit" disabled={loading} sx={{ py: 1.5 }}>
              {loading ? <CircularProgress size={24} /> : "Login"}
            </Button>
          </form>

            
                      {/* Links Section */}
                      <Box sx={{ mt: 3, textAlign: "center" }}>
                        <Typography variant="body1">Login as:</Typography>
                        <Grid container spacing={2} justifyContent="center">
                          <Grid item>
                            <Link to="/AdminLogin">Admin</Link>
                          </Grid>
                          <Grid item>|</Grid>
                          <Grid item>
                            <Link to="/login">Learner</Link>
                          </Grid>
                        </Grid>
            
                        <Typography variant="body1" sx={{ mt: 2 }}>New User?</Typography>
                        <Grid container spacing={2} justifyContent="center">
                          <Grid item>
                            <Link to="/AdminRegister">Register as Admin</Link>
                          </Grid>
                          <Grid item>|</Grid>
                          <Grid item>
                            <Link to="/InstructorRegister">Register as Instructor</Link>
                          </Grid>
                          <Grid item>|</Grid>
                          <Grid item>
                            <Link to="/register">Register as Learner</Link>
                          </Grid>
                        </Grid>
                      </Box>
        </CardContent>
      </Card>
    </Container>
  );
};

export default AdminLogin;
