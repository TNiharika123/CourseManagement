import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  TextField,
  InputAdornment,
  IconButton,
  Button,
  Typography,
  Container,
  Box,
  Grid,
  Alert,
} from "@mui/material";
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

    // ✅ Email validation
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!emailRegex.test(email)) {
      setEmailError("Please enter a valid email address");
      return;
    }

    // ✅ Password validation (allows special characters but not required)
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[\W_])?.{6,}$/;
    if (!passwordRegex.test(password)) {
      setPasswordError(
        "Password must be at least 6 characters long, include at least one letter and one number. Special characters are allowed but not required."
      );
      return;
    }

    try {
      console.log("📤 Sending registration request...");
      
      const response = await axios.post("http://localhost:5000/api/auth/register", {
        name,
        email,
        password,
      });

      console.log("✅ Registration Successful:", response.data);

      // ✅ Check if setLearnerId is passed before calling
      if (setLearnerId) {
        setLearnerId(response.data.learner._id);
      }

      navigate("/login");
    } catch (err) {
      console.error("🚨 Registration Failed:", err.response?.data || err.message);
      setError(err.response?.data?.message || "Registration failed. Try again.");
    }
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
                label="Name *"
                variant="outlined"
                fullWidth
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Email *"
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
                label="Password *"
                type={passwordVisible ? "text" : "password"}
                variant="outlined"
                fullWidth
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                error={!!passwordError}
                helperText={
                  passwordError ||
                  "Password must be at least 6 characters long, include at least one letter and one number. Special characters are allowed but not required."
                }
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={() => setPasswordVisible(!passwordVisible)}>
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
