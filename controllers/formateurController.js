// controllers/formateurController.js
const Formateur = require("../models/Formateur");
const upload = require("../config/upload");

// Create a new formateur
exports.createFormateur = (req, res) => {
  upload(req, res, async (err) => {
    if (err instanceof multer.MulterError) {
      return res.status(400).json({ message: err.message });
    } else if (err) {
      return res.status(400).json({ message: err.message });
    }
    
    try {
      const { name, expertise } = req.body;
      
      const newFormateur = new Formateur({
        name,
        expertise,
        image: req.file ? req.file.path.replace(/\\/g, "/") : null, // Save the image path if applicable
      });

      await newFormateur.save();
      res.status(201).json({ message: "Formateur created successfully", newFormateur });
    } catch (error) {
      console.error("Error creating formateur:", error);
      res.status(500).json({ message: "Server error", error: error.message });
    }
  });
};


// Update an existing formateur
exports.updateFormateur = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    const formateur = await Formateur.findByIdAndUpdate(id, updates, { new: true });

    if (!formateur) {
      return res.status(404).json({ message: "Formateur not found" });
    }

    res.json({ message: "Formateur updated successfully", formateur });
  } catch (error) {
    console.error("Error updating formateur:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Delete a formateur
exports.deleteFormateur = async (req, res) => {
  try {
    const { id } = req.params;

    const formateur = await Formateur.findByIdAndDelete(id);

    if (!formateur) {
      return res.status(404).json({ message: "Formateur not found" });
    }

    res.json({ message: "Formateur deleted successfully" });
  } catch (error) {
    console.error("Error deleting formateur:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Get all formateurs
exports.getAllFormateurs = async (req, res) => {
  try {
    const formateurs = await Formateur.find();
    res.json(formateurs);
  } catch (error) {
    console.error("Error fetching formateurs:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
