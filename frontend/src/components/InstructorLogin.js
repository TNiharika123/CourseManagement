import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Container,
  Card,
  Paper,
  CardContent,
  Typography,
  TextField,
  Button,
  CircularProgress,
  Box,
  Alert,
  Grid,
} from "@mui/material";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import SchoolIcon from "@mui/icons-material/School";
import PersonIcon from "@mui/icons-material/Person";

// Function to generate a random CAPTCHA
const generateCaptchaText = () => {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let captcha = "";
  for (let i = 0; i < 6; i++) {
    captcha += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return captcha;
};

const InstructorLogin = ({setUser} ) => {
  const [formData, setFormData] = useState({ Email: "", Password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [captcha, setCaptcha] = useState("");
  const [captchaInput, setCaptchaInput] = useState("");
  const navigate = useNavigate();

  // Generate CAPTCHA on component mount
  useEffect(() => {
    setCaptcha(generateCaptchaText());
  }, []);

  // Handle input field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle CAPTCHA refresh
  const handleCaptchaRefresh = () => {
    setCaptcha(generateCaptchaText());
    setCaptchaInput(""); // Clear input field
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Clear previous errors

    if (captchaInput !== captcha) {
      setError("CAPTCHA verification failed. Please try again.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("http://localhost:5000/api/instructors/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ Email: formData.Email, Password: formData.Password }),
      });

      if (response.ok) {
        const data = await response.json(); // ✅ Get response JSON
        const { token, instructor } = data; // ✅ Extract token & instructor
        alert("Login successful!");
        localStorage.setItem("authToken", token);
        localStorage.setItem("userId", instructor._id);
        localStorage.setItem("role", "instructor"); // Store role
        localStorage.setItem("instructorName", `${instructor.FName} ${instructor.LName}`); // ✅ Save Instructor Name

        setUser({ id: instructor._id, role: "instructor" }); // ✅ Pass user info to state
        // navigate("/insdashboard");
        navigate("/updateCourse");
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
     <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh", backgroundColor: "#f4f6f8" }}>
       <Paper sx={{ padding: 4, maxWidth: 400, width: "100%" }}>
        <Typography variant="h5" sx={{ textAlign: "center", mb: 3 }}>
                  Instructor Login
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
            <Grid container spacing={2} alignItems="center" justifyContent="center">
              <Grid item>
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
                    userSelect: "none",
                  }}
                >
                  {captcha}
                </Box>
              </Grid>
              <Grid item>
                <Button
                  onClick={handleCaptchaRefresh}
                  size="small"
                  variant="outlined"
                  sx={{ textTransform: "none", borderRadius: "8px", fontSize: "12px" }}
                >
                  Refresh
                </Button>
              </Grid>
            </Grid>

            <TextField
              fullWidth
              label="Enter CAPTCHA"
              variant="outlined"
              value={captchaInput}
              onChange={(e) => setCaptchaInput(e.target.value)}
              sx={{  mb: 2 }}
              required
            />

            <Button variant="contained" color="primary" fullWidth type="submit" disabled={loading} sx={{ py: 1.5 }}>
              {loading ? <CircularProgress size={24} /> : "Login"}
            </Button>
          </form>

          {/* Login Options (Admin, Instructor, Learner) */}
          <Box sx={{ textAlign: "center", mt: 3 }}>
            <Typography variant="body2">
              Login as:
            </Typography>
            <Grid container spacing={2} justifyContent="center">
              <Grid item>
                <Button
                  component={Link}
                  to="/AdminLogin"
                  variant="contained"
                  startIcon={<AdminPanelSettingsIcon />}
                  sx={{ textTransform: "none", backgroundColor: "#1976d2", "&:hover": { backgroundColor: "#1565c0" } }}
                >
                  Admin
                </Button>
              </Grid>
              <Grid item>
                <Button
                  component={Link}
                  to="/login"
                  variant="contained"
                  startIcon={<SchoolIcon />}
                  sx={{ textTransform: "none", backgroundColor: "#388e3c", "&:hover": { backgroundColor: "#2e7d32" } }}
                >
                  Learner
                </Button>
              </Grid>
            </Grid>
          {/* Registration Links */}
            <Typography variant="body2" sx={{ mt: 2 }}>
              New User?
            </Typography>


            <Grid container spacing={2} justifyContent="center">
              
              <Grid item>
                <Button
                  component={Link}
                  to="/InstructorRegister"
                  variant="outlined"
                  sx={{ textTransform: "none", borderRadius: "8px" }}
                >
                  Register as Instructor
                </Button>
              </Grid>
             
            </Grid>
          </Box>
      </Paper>
    </Box>
  );
};

export default InstructorLogin;
