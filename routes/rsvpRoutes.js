const express = require('express');
const router = express.Router();
const Rsvp = require('../models/Rsvp');

router.post('/', async (req, res) => {
  const { eventId, name, email, phone } = req.body;

  if (!eventId || !name || !email || !phone) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    const newRsvp = new Rsvp({ eventId, name, email, phone });
    await newRsvp.save();
    res.status(201).json({ message: 'RSVP saved successfully' });
  } catch (err) {
    console.error('RSVP save error:', err);
    res.status(500).json({ message: 'Failed to save RSVP' });
  }
});

module.exports = router;
