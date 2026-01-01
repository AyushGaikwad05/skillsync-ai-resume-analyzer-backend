const express = require('express');
const multer = require('multer');
const analyzeController = require('../controllers/analyzeController');

const router = express.Router();

const upload = multer({
  dest: 'uploads/',
  limits: { fileSize: 5 * 1024 * 1024 }
});

router.post(
  '/analyze',
  upload.single('resume'),
  analyzeController   // ✅ function directly
);

module.exports = router;
