const mongoose = require("mongoose");
const pvwattSchema = new mongoose.Schema({
    area: {
      type: String,
      required: true,
    },
    orientation: {
      type: String,
      required: true,
    },
    tilt: {
      type: String,
      required: true,
    },
    
   
  });
  
module.exports = mongoose.model("weatherData", weatherData);