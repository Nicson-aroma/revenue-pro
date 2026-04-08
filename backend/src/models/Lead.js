import mongoose from 'mongoose';

const leadSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, lowercase: true },
    phone: { type: String, default: '', trim: true },
    company: { type: String, required: true, trim: true },
    monthlyRevenue: { type: String, required: true },
    businessType: { type: String, required: true },
    selectedService: { type: String, required: true },
    budget: { type: String, default: '' },
    timeline: { type: String, default: '' },
    preferredContact: { type: String, default: 'email' },
    selectedDate: { type: String, required: true },
    selectedTime: { type: String, required: true },
    currentChallenges: { type: String, required: true },
    projectDetails: { type: String, required: true },
    status: {
      type: String,
      enum: ['new', 'in_review', 'qualified', 'booked', 'archived'],
      default: 'new',
    },
    priority: {
      type: String,
      enum: ['high', 'medium', 'low'],
      default: 'low',
    },
    notes: { type: String, default: '' },
    emailDeliveryStatus: {
      type: String,
      enum: ['sent', 'failed', 'pending', 'skipped'],
      default: 'pending',
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

leadSchema.set('toJSON', {
  transform: (_doc, ret) => {
    ret.id = ret._id.toString();
    delete ret._id;
    return ret;
  },
});

export const Lead = mongoose.model('Lead', leadSchema);
