async function calculatePVWattsRate(
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
) {
  try {
    // Extract necessary data from the solar data response
    const { daily } = solarData;
    const { time, cloudcover_mean } = daily;

    // Find the indices of the requested start and end dates
    const startIndex = time.indexOf(startDate);
    const endIndex = time.indexOf(endDate);

    // Filter the cloud cover data for the requested period
    const filteredCloudCover = cloudcover_mean.slice(startIndex, endIndex + 1);
    const filteredDates = time.slice(startIndex, endIndex + 1);

   

    // Calculate effective solar irradiance based on filtered cloud cover
    const effectiveSolarIrradiance = filteredCloudCover.map(cc => (100 - cc) / 100);

 

    // Calculate solar irradiance based on tilt, orientation, and area
    const solarIrradiance = effectiveSolarIrradiance.map(irradiance => irradiance * (tilt / 100) * (orientation / 100) * (area / 1000));



    // Calculate daily energy production in kWh
    const dailyEnergyProduction = solarIrradiance.map(irradiance => irradiance * powerPeak);

  

    // Adjust energy production based on user-defined system loss
    const adjustedEnergyProduction = dailyEnergyProduction.map(production => production * (100 - systemLoss) / 100);

 

    // Adjust energy production based on power peak, orientation, tilt, and area
    const adjustedEnergyProductionWithParams = adjustedEnergyProduction.map(production => production * (powerPeak / 100) * (area / 1000));

 

    // Calculate rate of PV/Watts per day
    const ratePVWattsPerDay = adjustedEnergyProductionWithParams.map(production => production / powerPeak);

    

    // Create an array of objects with date and rate
    const result = filteredDates.map((date, index) => ({
      date,
      rate: ratePVWattsPerDay[index]
    }));

    // Return the calculated values with dates
    return result;
  } catch (error) {
    console.error('Error calculating PV/Watt rate:', error);
    throw new Error('Failed to calculate PV/Watt rate');
  }
}


module.exports = calculatePVWattsRate;