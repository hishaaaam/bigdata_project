const express = require('express');
const router = express.Router();
const Event = require('../models/Event'); // Ensure the Event model is imported correctly

// POST route to add a new event
router.post('/', async (req, res) => {
  const { title, date, venue, category, description, coordinatorName, coordinatorEmail } = req.body;

  // Validate required fields
  if (!title || !date || !venue || !category || !description || !coordinatorName || !coordinatorEmail) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  const newEvent = new Event({
    title,
    date,
    venue,
    category,
    description,
    coordinatorName,
    coordinatorEmail,
  });

  try {
    await newEvent.save();
    res.status(201).json({ message: 'Event added successfully!' });
  } catch (error) {
    console.error('Error saving event:', error);
    res.status(500).json({ message: 'Failed to add event', error });
  }
});

router.get('/', async (req, res) => {
  try {
    const events = await Event.find().sort({ date: 1 }); // Sorted by date ascending
    res.status(200).json(events);
  } catch (error) {
    console.error('Error fetching events:', error);
    res.status(500).json({ message: 'Failed to fetch events' });
  }
});

module.exports = router;
