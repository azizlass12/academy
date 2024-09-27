// controllers/formationController.js
const Formation = require("../models/Formation");
const upload = require("../config/upload");
const multer = require("multer");
// Create a new formation
exports.createFormation = (req, res) => {
  upload(req, res, async (err) => {
    if (err instanceof multer.MulterError) {
      // A Multer error occurred when uploading.
      return res.status(400).json({ message: err.message });
    } else if (err) {
      // An unknown error occurred when uploading.
      return res.status(400).json({ message: err.message });
    }
    
    try {
      const { name, description } = req.body;
      const newFormation = new Formation({
        name,
        description,
        image: req.file ? req.file.path.replace(/\\/g, "/") : null, // Save the image path
      });

      await newFormation.save();
      res.status(201).json({ message: "Formation created successfully", newFormation });
    } catch (error) {
      console.error("Error creating formation:", error);
      res.status(500).json({ message: "Server error", error: error.message });
    }
  });
};


// Update an existing formation
exports.updateFormation = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    const formation = await Formation.findByIdAndUpdate(id, updates, { new: true });
    
    if (!formation) {
      return res.status(404).json({ message: "Formation not found" });
    }

    res.json({ message: "Formation updated successfully", formation });
  } catch (error) {
    console.error("Error updating formation:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Delete a formation
exports.deleteFormation = async (req, res) => {
  try {
    const { id } = req.params;

    const formation = await Formation.findByIdAndDelete(id);

    if (!formation) {
      return res.status(404).json({ message: "Formation not found" });
    }

    res.json({ message: "Formation deleted successfully" });
  } catch (error) {
    console.error("Error deleting formation:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Get all formations
exports.getAllFormations = async (req, res) => {
  try {
    const formations = await Formation.find().populate('matieres');
    res.json(formations);
  } catch (error) {
    console.error("Error fetching formations:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Get a formation by ID
exports.getFormationById = async (req, res) => {
  try {
    const { id } = req.params;
    
    const formation = await Formation.findById(id).populate('matieres');

    if (!formation) {
      return res.status(404).json({ message: "Formation not found" });
    }

    res.json(formation);
  } catch (error) {
    console.error("Error fetching formation by ID:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
