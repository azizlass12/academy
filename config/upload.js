// config/upload.js
const multer = require("multer");
const path = require("path");
const fs = require("fs");

// Create upload directories if they don't exist
const createUploadDir = (dir) => {
  const uploadDir = path.join(__dirname, '../uploads', dir);
  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
  }
};

createUploadDir('formation');
createUploadDir('formateur');
createUploadDir('matiere');

// Set storage engine
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    let dir = '';

    if (req.path === '/ajouter-formation') {
      dir = 'formation';
    } else if (req.path.startsWith('/ajouter-matiere')) {
      dir = 'matiere';
    } else if (req.path === '/' && req.method === 'POST') {
      dir = 'formateur';
    }

    if (dir) {
      cb(null, path.join(__dirname, '../uploads', dir));
    } else {
      cb(new Error('Invalid upload route'), null);
    }
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

// File filter to allow only images
const fileFilter = (req, file, cb) => {
  const filetypes = /jpeg|jpg|png|gif/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);
  
  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb(new Error("Error: Images only!"));
  }
};

// Initialize upload
const upload = multer({
  storage: storage,
  limits: { fileSize: 1000000 }, // 1 MB
  fileFilter: fileFilter
}).single('image');

module.exports = upload;
