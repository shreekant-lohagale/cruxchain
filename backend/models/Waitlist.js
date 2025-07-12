import mongoose from 'mongoose';

const waitlistSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, 'Email is required'],
      trim: true,
      lowercase: true,
      unique: true,
      match: [/.+\@.+\..+/, 'Please enter a valid email'],
      index: true
    },
    name: {
      type: String,
      trim: true,
      maxlength: [100, 'Name cannot exceed 100 characters']
    },
    fingerprint: {
      type: String,
      required: [true, 'Fingerprint is required'],
      index: true
    },
    ipAddress: {
      type: String,
      required: [true, 'IP address is required'],
      validate: {
        validator: (v) => /^(?:[0-9]{1,3}\.){3}[0-9]{1,3}$/.test(v),
        message: props => `${props.value} is not a valid IP address!`
      }
    },
    points: {
      type: Number,
      default: 100,
      min: [0, 'Points cannot be negative']
    },
    referralCode: {
      type: String,
      unique: true,
      sparse: true,
      uppercase: true,
      trim: true
    },
    status: {
      type: String,
      enum: ['pending', 'approved', 'rejected'],
      default: 'pending'
    }
  },
  { 
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

// Compound indexes
waitlistSchema.index({ email: 1, fingerprint: 1 }, { unique: true });
waitlistSchema.index({ ipAddress: 1, fingerprint: 1 }, { unique: true });

// Virtual for display name
waitlistSchema.virtual('displayName').get(function() {
  return this.name || this.email.split('@')[0];
});

// Pre-save hook for referral code
waitlistSchema.pre('save', function(next) {
  if (!this.referralCode) {
    this.referralCode = `REF-${Math.random().toString(36).substr(2, 8).toUpperCase()}`;
  }
  next();
});

export default mongoose.model('Waitlist', waitlistSchema);