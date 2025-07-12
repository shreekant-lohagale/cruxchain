import express from 'express';
import Waitlist from '../models/Waitlist.js';

const router = express.Router();

// New route to get waitlist count
router.get('/count', async (req, res) => {
  try {
    const count = await Waitlist.countDocuments();
    res.json({ count });
  } catch (error) {
    res.status(500).json({ message: 'Error getting count', error });
  }
});

router.post('/', async (req, res) => {
  try {
    const { email, name, fingerprint, ipAddress } = req.body;

    // Check for existing entries using any of the identifiers
    const existingEntry = await Waitlist.findOne({
      $or: [
        { email },
        { fingerprint },
        { ipAddress }
      ]
    });

    if (existingEntry) {
      return res.status(409).json({ 
        message: 'You have already joined the waitlist',
        existingEntry
      });
    }

    const entry = new Waitlist({
      email,
      name,
      fingerprint,
      ipAddress,
      points: 100
    });

    await entry.save();

    res.status(201).json({ 
      message: 'Successfully added to waitlist!', 
      entry 
    });
  } catch (error) {
    if (error.code === 11000) {
      // Handle duplicate key error
      return res.status(409).json({ message: 'Duplicate entry detected' });
    }
    res.status(500).json({ message: 'Something went wrong.', error });
  }
});

export default router;