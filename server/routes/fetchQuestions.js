const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();

// Ensure Mongoose is connected

const fetchCollectionData = async (collectionName) => {
  try {
    // Check if the model already exists to avoid redefining it
    let CollectionModel;
    if (mongoose.models[collectionName]) {
      CollectionModel = mongoose.model(collectionName);
    } else {
      CollectionModel = mongoose.model(
        collectionName,
        new mongoose.Schema({}, { strict: false }), // Flexible schema
        collectionName // Specify the exact collection name
      );
    }

    // Fetch all documents from the collection
    const data = await CollectionModel.find();
    console.log(`Data from ${collectionName} collection:`, data);
    return data;
  } catch (error) {
    console.error(`Error fetching data from ${collectionName} collection:`, error.message);
    throw error; // Propagate error for further handling
  }
};

// Route to fetch data from a specific sport collection
router.get("/:sport", async (req, res) => {
  const { sport } = req.params; // Extract collection name from the route parameter
  console.log("Fetching data for sport:", sport);

  try {
    const data = await fetchCollectionData(sport); // Call the fetch function with collection name
    console.log("Data fetched successfully" , data);
    
    if (data.length > 0) {
      res.status(200).json(data); // Send data as JSON if available
    } else {
      res.status(404).json({ message: `No data found in ${sport} collection` }); // No data found
    }
  } catch (error) {
    res.status(500).json({ message: `Error fetching data: ${error.message}` }); // Send error message
  }
});

module.exports = router;