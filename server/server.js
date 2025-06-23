require("dotenv").config();
const path = require("path");

const cors = require("cors");
const corsOptions = require("./config/corsOptions");
const credentials = require("./middleware/credentials");

const express = require("express");

const mongoose = require("mongoose");
const connectDB = require("./config/dbConn");

const PORT = process.env.PORT || 3500;
const app = express();

connectDB();

app.use(credentials);

app.use(cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/", require("./routes/api/users"));

app.all("/{*err}", (req, res) => {
  res.status(404);
  res.json({ error: "404 Not Found" });
});

mongoose.connection.once("open", () => {
  console.log("Connected to MongoDB");
  app.listen(PORT, (err) => {
    if (err) throw err;
    console.log(`Server running on port ${PORT}`);
  });
});
