const express = require('express');
const router = express.Router();
const { fetchSolarData, calculatePVWattsRate } = require('../middleware/calculate');

// Define the route for calculating the rates of PV/Watts per day
router.get('/', async (req, res) => {
  try {
    // Extract the required parameters from the request query
    const {
      powerPeak,
      orientation,
      tilt,
      area,
      longitude,
      latitude,
      startDate,
      endDate,
      systemLoss,
    } = req.query;

    const start = new Date(startDate);
    const end = new Date(endDate);

    // Fetch solar data from the Open API
    const solarData = await fetchSolarData(latitude, longitude, startDate, endDate);

    // Extract necessary data from the solar data response
    const { directNormalIrradiance, cloudCover } = solarData;

    // Calculate the rates of PV/Watts per day for each day within the specified date range
    const rates = [];
    let currentDate = start;
    while (currentDate <= end) {
      const rate = calculatePVWattsRate(
        parseFloat(directNormalIrradiance),
        parseFloat(cloudCover),
        parseFloat(systemLoss),
        parseFloat(powerPeak),
        orientation,
        parseFloat(tilt),
        parseFloat(area),
        parseFloat(longitude),
        parseFloat(latitude),
        currentDate.toISOString().slice(0, 10), // Convert date to YYYY-MM-DD format
        currentDate.toISOString().slice(0, 10) // Convert date to YYYY-MM-DD format
      );
      rates.push({ date: currentDate.toISOString().slice(0, 10), rate });
      currentDate.setDate(currentDate.getDate() + 1); // Move to the next day
    }

    // Return the calculated rates in the response
    res.json({ rates });
  } catch (error) {
    console.error('Error calculating PVWatt rates:', error);
    res.status(500).json({ message: 'Error calculating PVWatt rates' });
  }
});

module.exports = router;
