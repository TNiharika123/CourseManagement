import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  CircularProgress,
  Box,
  Grid,
  Alert,
} from "@mui/material";

const AdminRegister = () => {
  const [formData, setFormData] = useState({
    Salutation: "",
    FName: "",
    LName: "",
    DOB: "",
    Email: "",
    Mobile: "",
    AddressLine1: "",
    AddressLine2: "",
    City: "",
    State: "",
    Country: "",
    Password: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Handle input field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (formData.Password !== formData.confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("/api/admins/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert("Registration successful!");
        navigate("/adminlogin");
      } else {
        const errorData = await response.json();
        setError(`Registration failed: ${errorData.message || "Unknown error"}`);
      }
    } catch (error) {
      console.error("Error:", error);
      setError("Something went wrong while registering.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 5 }}>
      <Card sx={{ p: 4, boxShadow: 4, borderRadius: 3 }}>
        <CardContent>
          <Typography variant="h4" align="center" fontWeight="bold" color="primary" gutterBottom>
            Admin Registration
          </Typography>

          {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

          <form onSubmit={handleSubmit}>
            <TextField label="First Name" name="FName" fullWidth value={formData.FName} onChange={handleChange} required sx={{ mb: 2 }} />
            <TextField label="Last Name" name="LName" fullWidth value={formData.LName} onChange={handleChange} required sx={{ mb: 2 }} />
            <TextField label="Email" name="Email" type="email" fullWidth value={formData.Email} onChange={handleChange} required sx={{ mb: 2 }} />
            <TextField label="Password" name="Password" type="password" fullWidth value={formData.Password} onChange={handleChange} required sx={{ mb: 2 }} />
            <TextField label="Confirm Password" name="confirmPassword" type="password" fullWidth value={formData.confirmPassword} onChange={handleChange} required sx={{ mb: 2 }} />

            <Button variant="contained" color="primary" fullWidth type="submit" disabled={loading} sx={{ py: 1.5 }}>
              {loading ? <CircularProgress size={24} /> : "Register"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </Container>
  );
};

export default AdminRegister;
