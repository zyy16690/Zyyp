const express = require('express');
const multer = require('multer');
const path = require('path');
const { sendWhatsAppMessage } = require('./whatsapp-bot');
const app = express();
const PORT = 3000;

// Set up storage for uploaded images
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname)),
});
const upload = multer({ storage });

// Serve uploaded images statically
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Serve the frontend
app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'index.html')));

// Handle image upload
app.post('/upload', upload.single('image'), async (req, res) => {
  if (!req.file) return res.status(400).send('No file uploaded');
  const imageUrl = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;
  // send WhatsApp message with the image link
  try {
    await sendWhatsAppMessage('PUT_TARGET_PHONE_NUMBER_HERE', `Image uploaded: ${imageUrl}`);
    res.json({ url: imageUrl });
  } catch (err) {
    res.status(500).json({ error: 'WhatsApp message failed', details: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
