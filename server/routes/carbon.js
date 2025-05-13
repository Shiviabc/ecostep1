import express from 'express';
import { authenticateToken } from '../middleware/auth.js';
import CarbonEntry from '../models/CarbonEntry.js';
import User from '../models/User.js';

const router = express.Router();

router.post('/', authenticateToken, async (req, res) => {
  try {
    const { category, amount, details } = req.body;
    
    const carbonEntry = new CarbonEntry({
      user: req.userId,
      category,
      amount,
      details
    });

    await carbonEntry.save();

    // Update user's points based on emissions reduction
    const user = await User.findById(req.userId);
    if (user) {
      // Simple points calculation - can be made more sophisticated
      const pointsEarned = Math.floor(amount * -1 + 50); // Negative points for emissions, bonus for tracking
      user.points += Math.max(pointsEarned, 10); // Minimum 10 points for tracking
      await user.save();
    }

    res.status(201).json(carbonEntry);
  } catch (error) {
    res.status(500).json({ message: 'Error saving carbon entry' });
  }
});

router.get('/', authenticateToken, async (req, res) => {
  try {
    const entries = await CarbonEntry.find({ user: req.userId })
      .sort({ date: -1 })
      .limit(10);
    
    res.json(entries);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching carbon entries' });
  }
});

export default router;