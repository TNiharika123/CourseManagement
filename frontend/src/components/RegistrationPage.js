import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { TextField, InputAdornment, IconButton, Button, Typography, Container, Box, Grid, Alert } from "@mui/material";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const RegistrationPage = ({ setLearnerId }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setEmailError("");
    setPasswordError("");

    if (!name || !email || !password) {
      setError("All fields are required");
      return;
    }

    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!emailRegex.test(email)) {
      setEmailError("Please enter a valid email address");
      return;
    }

    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;
    if (!passwordRegex.test(password)) {
      setPasswordError("Password must be at least 6 characters long and contain at least one number and one letter.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:5000/api/learners/register", {
        name,
        email,
        password,
      });

      setLearnerId(response.data.learner._id);
      navigate("/login");
    } catch (err) {
      console.error(err);
      setError("Registration failed. Please try again.");
    }
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", mt: 4 }}>
        <Typography variant="h4" gutterBottom>
          Register as a Learner
        </Typography>
        {error && <Alert severity="error">{error}</Alert>}
        {emailError && <Alert severity="error">{emailError}</Alert>}
        {passwordError && <Alert severity="error">{passwordError}</Alert>}

        <Box component="form" onSubmit={handleSubmit} sx={{ width: "100%", mt: 2 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                label={<span>Name <span style={{ color: "red" }}>*</span></span>}
                variant="outlined"
                fullWidth
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label={<span>Email <span style={{ color: "red" }}>*</span></span>}
                variant="outlined"
                fullWidth
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                error={!!emailError}
                helperText={emailError}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label={<span>Password <span style={{ color: "red" }}>*</span></span>}
                type={passwordVisible ? "text" : "password"}
                variant="outlined"
                fullWidth
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                error={!!passwordError}
                helperText={passwordError || "Password must be at least 6 characters long and include at least one letter and one number."}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={togglePasswordVisibility}>
                        {passwordVisible ? <FaEyeSlash /> : <FaEye />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />

            </Grid>
            <Grid item xs={12}>
              <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }}>
                Register
              </Button>
            </Grid>
          </Grid>
        </Box>
        <Typography variant="body2" sx={{ mt: 2 }}>
          Already have an account? <a href="/login">Login here</a>
        </Typography>
      </Box>
    </Container>
  );
};

export default RegistrationPage;
