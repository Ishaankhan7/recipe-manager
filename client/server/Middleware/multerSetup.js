const multer = require("multer");
const path = require("path");
const fs = require("fs");

// Directory for uploads
const uploadDir = path.join(__dirname, "../uploads");

// Check if the directory exists, if not create it
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir); // Set destination to the "uploads" folder
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname)); // Create unique filename
  }
});

const upload = multer({ storage: storage });

module.exports = upload;
