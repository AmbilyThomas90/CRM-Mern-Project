import mongoose from "mongoose";
//  * User Schema
// * Defines the structure of User documents in MongoDB
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }, // hashed
}, { timestamps: true });

export default mongoose.model("User", userSchema);
