/* const totalCapacity = 1000;

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
  // Calculate effective solar irradiance
  const effectiveSolarIrradiance = directNormalIrradiance * (100 - cloudCover) / 100;

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
}

module.exports = {
  calculatePVWattsRate
};
 */