import mongoose from 'mongoose';
//  * Customer Schema
 //* Defines the structure of customer documents in MongoDB
const customerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: String,
  phone: String,
  address: String,
    // Reference to the user who created this customer
    // Links to User collection by ObjectId
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }  
}, { timestamps: true });
export default mongoose.model('Customer', customerSchema);
