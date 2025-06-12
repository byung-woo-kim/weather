const axios = require('axios');

const fetchSolarData = async (latitude, longitude, startDate, endDate, model = 'MPI_ESM1_2_XR') => {
  const url = `https://climate-api.open-meteo.com/v1/climate`;

  try {
    const response = await axios.get(url, {
      params: {
        latitude,
        longitude,
        start_date: startDate,
        end_date: endDate,
        daily: 'cloudcover_mean',
        models: model,
      },
    });

    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch solar data');
  }

  return solarData;
};

module.exports = fetchSolarData;
