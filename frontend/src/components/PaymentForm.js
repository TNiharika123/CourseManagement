import React, { useState, useEffect } from "react";
import {
  Container, Typography, Radio, RadioGroup, FormControlLabel,
  Card, CardContent, TextField, Button, Grid, CircularProgress
} from "@mui/material";
import { useParams } from "react-router-dom";

const PaymentForm = ({learnerId }) => {
  const { courseId } = useParams();
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState("UPI");
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);

  // Fetching the actual logged-in user ID from localStorage (adjust as needed)
  const userId = localStorage.getItem("userId"); // Assuming the user ID is saved in localStorage after login

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/courses/${courseId}`);
        const data = await response.json();
        if (response.ok) {
          setSelectedCourse(data);
        } else {
          console.error("Failed to fetch course");
        }
      } catch (error) {
        console.error("Error fetching course:", error);
      }
    };

    fetchCourse();
  }, [courseId]);

  const handlePaymentMethodChange = (event) => {
    setPaymentMethod(event.target.value);
    setFormData({});
  };

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handlePayment = async () => {
    if (!selectedCourse) {
      alert("Course not found!");
      return;
    }

    if (!userId) {
      alert("User not logged in! Please log in to proceed.");
      return;
    }

    if (paymentMethod === "UPI" && !formData.upi_id) {
      alert("Please enter your UPI ID.");
      return;
    }

    if ((paymentMethod === "Credit Card" || paymentMethod === "Debit Card") && (
      !formData.card_number || !formData.expiry_date || !formData.cvv
    )) {
      alert("Please fill in all card details.");
      return;
    }

    setLoading(true);

    // Including the course title in the payment data
    const paymentData = {
      userId: learnerId, 
      courseId,
      paymentMethod,
      amount: selectedCourse.pricing,
      courseTitle: selectedCourse.title,  // Add the course title here
    };

    console.log("📤 Sending Payment Data:", paymentData); // Debugging log

    try {
      const response = await fetch("http://localhost:5000/api/payments/process", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(paymentData),
      });

      const data = await response.json();
      console.log("📥 Payment API Response:", data); // Debugging log

      setLoading(false);

      if (data.success) {
        alert(`✅ Payment successful! Transaction ID: ${data.paymentId}`);
       
        // 🆕 Call API to enroll the learner in the course
        const enrollResponse = await fetch(`http://localhost:5000/api/courses/${courseId}/enroll`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ learnerId: userId }), // Send learnerId
        });
        const enrollData = await enrollResponse.json();

        if (enrollData.success) {
          alert("🎉 You are now enrolled in the course!");
        } else {
          alert("⚠️ Payment was successful, but enrollment failed. Contact support.");
        }

      } else {
        alert("❌ Payment failed. Try again.");
      }
    } catch (error) {
      setLoading(false);
      console.error("Payment Error:", error);
      alert("⚠️ Error processing payment. Please try again.");
    }
  };

  return (
    <Container maxWidth="sm" sx={{paddingY:8}} style={{ marginTop: "20px",paddingY:10 }}>
      {selectedCourse ? (
        <>
          <Typography variant="h4" gutterBottom align="center">Checkout</Typography>

          <Card variant="outlined" style={{ marginBottom: "20px" }}>
            <CardContent>
              <Typography variant="h6">Selected Course</Typography>
              <Typography>{selectedCourse.title}</Typography>
              <Typography variant="h5" color="primary">₹{selectedCourse.pricing}</Typography>
            </CardContent>
          </Card>

          <Typography variant="h6">Select Payment Method:</Typography>
          <RadioGroup value={paymentMethod} onChange={handlePaymentMethodChange}>
            <FormControlLabel value="UPI" control={<Radio />} label="UPI" />
            <FormControlLabel value="Credit Card" control={<Radio />} label="Credit Card" />
            <FormControlLabel value="Debit Card" control={<Radio />} label="Debit Card" />
          </RadioGroup>

          <Card variant="outlined" style={{ marginTop: "20px" }}>
            <CardContent>
              <Typography variant="h6">Payment Details</Typography>
              {paymentMethod === "UPI" && (
                <TextField
                  fullWidth label="UPI ID / Mobile Number" name="upi_id"
                  value={formData.upi_id || ""} onChange={handleChange}
                  style={{ marginBottom: "15px" }}
                />
              )}
              {(paymentMethod === "Credit Card" || paymentMethod === "Debit Card") && (
                <>
                  <TextField fullWidth label="Card Number" name="card_number"
                    value={formData.card_number || ""} onChange={handleChange}
                    style={{ marginBottom: "15px" }}
                  />
                  <Grid container spacing={2}>
                    <Grid item xs={6}>
                      <TextField fullWidth label="MM/YY" name="expiry_date"
                        value={formData.expiry_date || ""} onChange={handleChange}
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <TextField fullWidth label="CVV" name="cvv" type="password"
                        value={formData.cvv || ""} onChange={handleChange}
                      />
                    </Grid>
                  </Grid>
                </>
              )}
              <Button variant="contained" color="primary" fullWidth
                style={{ marginTop: "20px" }} onClick={handlePayment}
                disabled={loading}>
                {loading ? <CircularProgress size={24} style={{ color: "white" }} /> : `Pay ₹${selectedCourse.pricing}`}
              </Button>
            </CardContent>
          </Card>
        </>
      ) : (
        <Typography variant="h6" color="error" align="center">
          Course not found!
        </Typography>
      )}
    </Container>
  );
};

export default PaymentForm;
