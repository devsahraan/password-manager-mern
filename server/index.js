const express = require("express");
const app = express();
const port = 3000;
const bodyParser = require("body-parser");
const mainRoutes = require("./routes/mainRoutes");
const mongoose = require("mongoose");
require("dotenv").config();
const cors = require("cors");


app.use(cors());

app.use(bodyParser.json());

app.use("/" , mainRoutes);

const dbUrl = process.env.dbUrl
// console.log(dbUrl); showing dbUrl in console
mongoose.connect(dbUrl);

const db = mongoose.connection;
db.on("error" , (error) => {
    console.error("Database connection error:", error);
})
db.once("open",() =>{
    console.log("Database connected successfully");
})
db.on("disconnected" , () =>{
    console.log("Database disconnected");
})

app.listen(port , () =>{
    console.log(`Server is running on port ${port}`);
})

