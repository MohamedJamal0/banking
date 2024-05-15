import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const { Schema } = mongoose;

const userSchema = new Schema(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    address1: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    postalCode: { type: String, required: true },
    dateOfBirth: { type: Date, required: true },
    ssn: { type: String, required: true },
    dwollaCustomerUrl: { type: String, required: true },
    dwollaCustomerId: { type: String, required: true },
  },
  { timestamps: true }
);

userSchema.methods.comparePassword = async function (
  candidatePassword: string
) {
  try {
    const isMatch = await bcrypt.compare(candidatePassword, this.password);
    return isMatch;
  } catch (error: any) {
    throw new Error(error);
  }
};

userSchema.pre('save', async function (next) {
  try {
    if (this.isModified('password')) {
      const hashedPassword = await bcrypt.hash(this.password, 10);
      this.password = hashedPassword;
    }
    next();
  } catch (error: any) {
    next(error);
  }
});

export default mongoose.models.User || mongoose.model('User', userSchema);
