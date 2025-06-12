/* // middleware/calculate.js

const { fetchSolarData } = require('./fetchSolarData');
const totalCapacity = 1000;

// Function to calculate the rate of PV/Watts per day
async function calculatePVWattsRate(
  directNormalIrradiance,
  cloudCover,
  systemLoss,
  powerPeak,
  orientation,
  tilt,
  area,
  longitude,
  latitude,
  startDate,
  endDate
) {
  try {
    // Fetch solar data from the Open API
    const solarData = await fetchSolarData(latitude, longitude, startDate, endDate);

    // Extract necessary data from the solar data response
    const { direct_normal_irradiance, cloudcover } = solarData;

    // Calculate effective solar irradiance
    const effectiveSolarIrradiance = direct_normal_irradiance * (100 - cloudcover) / 100;

    // Calculate daily energy production in kWh
    const dailyEnergyProduction = effectiveSolarIrradiance * totalCapacity;

    // Apply default system loss
    const defaultSystemLoss = 14;
    const adjustedEnergyProduction = dailyEnergyProduction * (100 - systemLoss) / 100;

    // Adjust energy production based on power peak, orientation, tilt, and area
    const adjustedEnergyProductionWithParams =
      adjustedEnergyProduction *
      (powerPeak / 100) *
      (area / 1000);

    // Calculate rate of PV/Watts per day
    const ratePVWattsPerDay = adjustedEnergyProductionWithParams / totalCapacity;

    return ratePVWattsPerDay;
  } catch (error) {
    console.error('Error calculating PV/Watt rate:', error);
    throw new Error('Failed to calculate PV/Watt rate');
  }
}

module.exports = {
  calculatePVWattsRate
};
 */