const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();



const fetchCollectionData = async (collectionName) => {
  try {
    
    let CollectionModel;
    if (mongoose.models[collectionName]) {
      CollectionModel = mongoose.model(collectionName);
    } else {
      CollectionModel = mongoose.model(
        collectionName,
        new mongoose.Schema({}, { strict: false }), 
        collectionName 
      );
    }

    
    const data = await CollectionModel.find();
    console.log(`Data from ${collectionName} collection:`, data);
    return data;
  } catch (error) {
    console.error(`Error fetching data from ${collectionName} collection:`, error.message);
    throw error; 
  }
};


router.get("/:sport", async (req, res) => {
  const { sport } = req.params; 
  console.log("Fetching data for sport:", sport);

  try {
    const data = await fetchCollectionData(sport); 
    console.log("Data fetched successfully" , data);
    
    if (data.length > 0) {
      res.status(200).json(data); 
    } else {
      res.status(404).json({ message: `No data found in ${sport} collection` }); 
    }
  } catch (error) {
    res.status(500).json({ message: `Error fetching data: ${error.message}` }); 
  }
});

module.exports = router;