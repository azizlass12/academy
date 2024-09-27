// server.js or app.js
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/dbConnect");
const path = require("path");
require("dotenv").config();

const app = express();
connectDB();

app.use(express.json());
app.use(cors());

// Serve static files from the uploads directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

const formationRoutes = require("./routes/formationRoutes");
const matiereRoutes = require("./routes/matiereRoutes");
const formateurRoutes = require("./routes/formateurRoutes");

app.use("/formation", formationRoutes);
app.use("/matiere", matiereRoutes);
app.use("/formateur", formateurRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, (err) =>
  err ? console.log(err) : console.log(`Server running on ${PORT}`)
);
