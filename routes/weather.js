const express = require('express');
const router = express.Router();
const fetchSolarData = require('../middleware/fetchSolarData');

// Define the route for fetching solar data
router.get('/', async (req, res) => {
  try {
    // Extract the latitude, longitude, start date, and end date from the request query parameters
    const { latitude, longitude, startDate, endDate } = req.query;

    // Fetch solar data from the Open API
    const solarData = await fetchSolarData(latitude, longitude, startDate, endDate);

    // Return the solar data in the response
    res.json({ solarData });
  } catch (error) {
    console.error('Error fetching solar data:', error);
    res.status(500).json({ message: 'Error fetching solar data' });
  }
});

module.exports = router;
