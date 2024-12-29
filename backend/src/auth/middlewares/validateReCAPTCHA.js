const axios = require('axios');

const validateReCAPTCHA = async (req, res, next) => {
  const { recaptchaToken } = req.body;
  const secretKey = process.env.RECAPTCHA_SECRET_KEY;

  if (!recaptchaToken) {
    return res.status(400).json({ message: 'reCAPTCHA token is missing.' });
  }

  try {
    const response = await axios.post(
      `https://www.google.com/recaptcha/api/siteverify`,
      null,
      {
        params: {
          secret: secretKey,
          response: recaptchaToken,
        },
      }
    );

    if (response.data.success) {
      next(); // Proceed to the next middleware or route handler
    } else {
      return res.status(400).json({ message: 'reCAPTCHA validation failed.' });
    }
  } catch (error) {
    console.error('reCAPTCHA validation error:', error);
    return res.status(500).json({ message: 'Internal server error during reCAPTCHA validation.' });
  }
};

module.exports = validateReCAPTCHA;
