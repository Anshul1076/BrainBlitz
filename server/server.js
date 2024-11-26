require("dotenv").config();  // Load environment variables
const express = require('express');
const mongoose = require("mongoose");
const app = express();
const port = 8080;
const connectDB = require("./config/connect");
const cors = require('cors');
const formatSchema = require("./models/format");  // Assuming formatSchema is defined as before

// Connect to MongoDB
connectDB();

// Middleware setup
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

// Route to check if the server is working
app.get('/', (req, res) => {
    res.send('Hello World!');
});

// Route to fetch questions from a specific sport's collection
app.get("/fetchQuestions/:sport", async (req, res) => {
    const { sport } = req.params;  // Capture the sport from the URL parameter

    try {
        // Dynamically create the model for the sport collection
        const CollectionModel = mongoose.model(
            sport,  // Sport name (e.g., chess, football)
            formatSchema,  // Schema (this can be the same schema for all collections)
            sport // The third parameter is the collection name in MongoDB
        );

        // Fetch questions from the specific collection
        const data = await CollectionModel.find();

        if (data.length > 0) {
            res.status(200).json(data);  // Send fetched data as response
        } else {
            res.status(404).json({ message: `No data found in ${sport} collection` });
        }
    } catch (error) {
        console.error("Error fetching questions:", error);
        res.status(500).json({ message: "Server error" });
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
