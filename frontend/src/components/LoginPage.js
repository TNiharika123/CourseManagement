import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import {
  TextField,
  Button,
  IconButton,
  InputAdornment,
  Grid,
  Typography,
  Paper,
  Box,
} from "@mui/material";
import { FaEye, FaEyeSlash } from "react-icons/fa"; // Eye icons
import axios from "axios";

const generateCaptchaText = () => {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let captcha = "";
  for (let i = 0; i < 6; i++) {
    captcha += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return captcha;
};

const LoginPage = ({ setLearnerId }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [captcha, setCaptcha] = useState(generateCaptchaText());
  const [captchaInput, setCaptchaInput] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const drawCaptcha = useCallback(() => {
    setCaptcha(generateCaptchaText());
  }, []);

  useEffect(() => {
    drawCaptcha();
  }, [drawCaptcha]);

  const handleLogin = async (e) => {
    e.preventDefault();

    if (captchaInput !== captcha) {
      setError("Invalid CAPTCHA! Try again.");
      drawCaptcha();
      return;
    }

    try {
      const response = await axios.post("http://localhost:5000/api/auth/login", {
        email,
        password,
      });

      localStorage.setItem("authToken", response.data.token);
      localStorage.setItem("userId", response.data.userId);
      setLearnerId(response.data.userId);
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    }
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible((prev) => !prev);
  };

  const goToRegisterPage = () => {
    navigate("/register");
  };

  return (
    <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh", backgroundColor: "#f4f6f8" }}>
      <Paper sx={{ padding: 4, maxWidth: 400, width: "100%" }}>
        <Typography variant="h5" sx={{ marginBottom: 3, textAlign: "center" }}>
          Login
        </Typography>
        {error && <Typography color="error">{error}</Typography>}
        <form onSubmit={handleLogin}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label={<span>Email <span style={{ color: "red" }}>*</span></span>}
                variant="outlined"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label={<span>Password <span style={{ color: "red" }}>*</span></span>}
                type={passwordVisible ? "text" : "password"}
                variant="outlined"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
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

            
            {/* CAPTCHA SECTION */}
            <Grid item xs={12} sx={{ textAlign: "center" }}>
              <Box
                sx={{
                  display: "inline-block",
                  padding: "10px 20px",
                  backgroundColor: "#ddd",
                  fontSize: "22px",
                  fontWeight: "bold",
                  fontFamily: "monospace",
                  letterSpacing: "4px",
                  textDecoration: "line-through",
                  textAlign: "center",
                  borderRadius: "8px",
                  boxShadow: "inset 3px 3px 6px rgba(0,0,0,0.2)",
                  color: "#333",
                  mb: 1,
                }}
              >
                {captcha}
              </Box>
              <Button
                onClick={drawCaptcha}
                size="small"
                variant="outlined"
                sx={{
                  ml: 1,
                  textTransform: "none",
                  borderRadius: "8px",
                  fontSize: "12px",
                }}
              >
                Refresh
              </Button>
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Enter CAPTCHA"
                variant="outlined"
                value={captchaInput}
                onChange={(e) => setCaptchaInput(e.target.value)}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "8px",
                  },
                }}
              />
            </Grid>

            <Grid item xs={12}>
              <Button type="submit" variant="contained" fullWidth sx={{ padding: "10px", backgroundColor: "#1976d2" }}>
                Login
              </Button>
            </Grid>
            <Grid item xs={12} sx={{ textAlign: "center", marginTop: 2 }}>
              <Typography variant="body2">
                Not registered?{" "}
                <Button onClick={goToRegisterPage} sx={{ textDecoration: "underline", padding: 0 }}>
                  Go to Register
                </Button>
              </Typography>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Box>
  );
};

export default LoginPage;
