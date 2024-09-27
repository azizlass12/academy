// routes/matiereRoutes.js
const express = require("express");
const router = express.Router();
const {
  createMatiere,
  updateMatiere,
  deleteMatiere,
  getAllMatieres,
  getMatiereById,
} = require("../controllers/matiereController");

router.post("/ajouter-matiere/:formationId", createMatiere); // Create a matiere for a specific formation
router.put("/:formationId/:id", updateMatiere);
router.delete("/:formationId/:id", deleteMatiere);
router.get("/:formationId", getAllMatieres);
router.get("/:formationId/:id", getMatiereById);

module.exports = router;
