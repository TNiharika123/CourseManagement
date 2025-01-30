const express = require('express');
const fetch = require('node-fetch');
const router = express.Router();

router.post('/verify-recaptcha', async (req, res) => {
  try {
    const { token } = req.body;

    if (!token) {
      return res.status(400).json({ 
        success: false, 
        message: 'No reCAPTCHA token provided' 
      });
    }

    const projectId = 'learning-managem-1738163567080'; // Your GCP project ID
    const recaptchaKey = process.env.RECAPTCHA_SECRET_KEY;

    const response = await fetch(
      `https://recaptchaenterprise.googleapis.com/v1/projects/${projectId}/assessments?key=${recaptchaKey}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          event: {
            token,
            siteKey: process.env.RECAPTCHA_SITE_KEY,
            expectedAction: 'LOGIN'
          }
        })
      }
    );

    const data = await response.json();

    // Check the assessment score and other risk factors
    if (data.riskAnalysis && data.riskAnalysis.score >= 0.5) {
      return res.json({ success: true });
    } else {
      return res.status(400).json({ 
        success: false, 
        message: 'reCAPTCHA verification failed' 
      });
    }

  } catch (error) {
    console.error('reCAPTCHA verification error:', error);
    return res.status(500).json({ 
      success: false, 
      message: 'Internal server error during verification' 
    });
  }
});

module.exports = router;