const mongoose = require("mongoose");

const FormationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  dateCreated: {
    type: Date,
    default: Date.now,
  },
  matieres: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Matiere',
  }],
});

module.exports = mongoose.model("Formation", FormationSchema);
