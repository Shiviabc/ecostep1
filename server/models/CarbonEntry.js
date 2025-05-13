import mongoose from 'mongoose';

const carbonEntrySchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  category: {
    type: String,
    enum: ['transport', 'home', 'food', 'waste'],
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  details: {
    transportType: String,
    distance: Number,
    energyUsage: Number,
    mealType: String,
    wasteType: String
  }
}, {
  timestamps: true
});

const CarbonEntry = mongoose.model('CarbonEntry', carbonEntrySchema);

export default CarbonEntry;