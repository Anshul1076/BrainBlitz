require("dotenv").config();  
const express = require('express');
const mongoose = require("mongoose");
const app = express();
const port = 8080;
const connectDB = require("./config/connect");
const cors = require('cors');
const formatSchema = require("./models/format");  


connectDB();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());


app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.get("/fetchQuestions/:sport", async (req, res) => {
    const { sport } = req.params;  
    try {
        
        const CollectionModel = mongoose.model(
            sport, 
            formatSchema,  
            sport 
        );

       
        const data = await CollectionModel.find();

        if (data.length > 0) {
            res.status(200).json(data);  
        } else {
            res.status(404).json({ message: `No data found in ${sport} collection` });
        }
    } catch (error) {
        console.error("Error fetching questions:", error);
        res.status(500).json({ message: "Server error" });
    }
});


app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
