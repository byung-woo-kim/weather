const express = require('express');
const router = express.Router();
const fetchSolarData = require('../middleware/fetchSolarData');
const calculatePVWattsRate = require('../middleware/pvcal');

// Define the route for fetching solar data and calculating the PV/Watts rate
router.get('/', async (req, res) => {
  try {
    const {
      latitude,
      longitude,
      startDate,
      endDate,
      systemLoss,
      powerPeak,
      orientation,
      tilt,
      area,
    } = req.query;

    // Fetch solar data from the Open API using the requested longitude, latitude, startDate, and endDate
    const solarData = await fetchSolarData(latitude, longitude, startDate, endDate);
    

    // Calculate the PV/Watts rate using the fetched solar data
    const pvWattsRate = await calculatePVWattsRate(
      solarData,
      systemLoss,
      powerPeak,
      orientation,
      tilt,
      area,
      longitude,
      latitude,
      startDate,
      endDate
    );
    

    if (pvWattsRate === null) {
      throw new Error('Failed to calculate PV/Watts rate');
    }

    res.json({ pvWattsRate });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: 'Error fetching solar data and calculating PV/Watts rate' });
  }
});

module.exports = router;
