import mongoose from 'mongoose';

const { Schema } = mongoose;

const bankSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  bankId: { type: String, required: true },
  accessToken: { type: String, required: true },
  fundingSourceUrl: { type: String, required: true },
  shareableId: { type: String, required: true },
});

export default mongoose.models.Bank || mongoose.model('Bank', bankSchema);
