const express = require('express');
const cloudinary = require('cloudinary').v2;
const cors = require('cors'); // Add CORS to prevent frontend issues
const app = express();
const port = 5000;
const multer = require('multer');
const upload = multer({ storage: multer.memoryStorage() });

// Middleware
app.use(cors()); // Allow frontend to access API

// Configure Cloudinary
cloudinary.config({
  cloud_name: 'dtnakrubh',
  api_key: '553596293654989',
  api_secret: '-T0AdHZ3guFzYDfcJoZCcNfoyB4'
});

// Endpoint to fetch images from the 'fitness-platinum' folder in Cloudinary
app.get('/api/images', async (req, res) => {
  try {
    const result = await cloudinary.api.resources({
      type: 'upload',
      prefix: 'fitness-platinum/', // Fetch images from this folder
      max_results: 30
    });

    const carouselImages = await cloudinary.api.resources({
      type: 'upload',
      prefix: 'gym Carousel/', // Fetch images from gym Carousel folder
      max_results: 30
    });

    const mobileImages = await cloudinary.api.resources({
      type: 'upload',
      prefix: 'mob-gym/', // Fetch images from mob-gym folder
      max_results: 30
    });

    // Combine all images
    const images = [
      ...result.resources,
      ...carouselImages.resources,
      ...mobileImages.resources
    ].map((img) => ({
      url: img.secure_url,
      public_id: img.public_id
    }));  

    res.json(images);
  } catch (error) {
    console.error('Error fetching images from Cloudinary:', error);
    res.status(500).send('Error fetching images');
  }
});

// Upload endpoint
app.post('/api/upload', upload.single('image'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).send('No file uploaded');
    }

    // Convert buffer to base64
    const base64Image = Buffer.from(req.file.buffer).toString('base64');
    const dataURI = `data:${req.file.mimetype};base64,${base64Image}`;

    // Get the folder name from the request body
    const folderName = req.body.folder || 'fitness-platinum'; // Default to 'fitness-platinum' if not provided

    // Upload to Cloudinary
    const result = await cloudinary.uploader.upload(dataURI, {
      folder: folderName,
      public_id: req.body.name.replace(/\s+/g, '_')
    });

    res.json({
      url: result.secure_url,
      public_id: result.public_id
    });
  } catch (error) {
    console.error('Error uploading to Cloudinary:', error);
    res.status(500).send('Error uploading image');
  }
});

// Delete endpoint
app.use(express.json()); // Add this middleware to parse JSON requests

app.delete('/api/delete', async (req, res) => {
  try {
    const { public_id } = req.body;

    if (!public_id) {
      return res.status(400).json({ error: 'Public ID is required' });
    }

    const response = await cloudinary.api.delete_resources([public_id], {
      type: 'upload',
      resource_type: 'image'
    });

    // Check if the image was deleted
    if (response.deleted[public_id] === 'deleted') {
      res.json({ message: 'Image deleted successfully' });
    } else {
      res.status(404).json({ error: 'Image not found' });
    }
  } catch (error) {
    console.error('Error deleting from Cloudinary:', error);
    res.status(500).json({ error: 'Error deleting image' });
  }
});

// Add a new endpoint to fetch trainers specifically
app.get('/api/trainers', async (req, res) => {
  try {
    const result = await cloudinary.api.resources({
      type: 'upload',
      prefix: 'Trainers/', // Fetch images from Trainers folder
      max_results: 30
    });

    const trainers = result.resources.map((img) => ({
      url: img.secure_url,
      public_id: img.public_id,
      // Extract trainer name from public_id (assuming format: "Trainers/name_specialty")
      name: img.public_id.split('/').pop()?.split('_')[0]?.replace(/-/g, ' ') || 'Trainer',
      // Extract specialty from public_id if available
      specialty: img.public_id.split('/').pop()?.split('_')[1]?.replace(/-/g, ' ') || 'Fitness Expert'
    }));

    res.json(trainers);
  } catch (error) {
    console.error('Error fetching trainers from Cloudinary:', error);
    res.status(500).send('Error fetching trainers');
  }
});

app.get('/', (req, res) => {
  res.send('hello world');
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
