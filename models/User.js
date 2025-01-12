import mongoose, { Schema } from "mongoose";
import Counter from "./Counter.js";

const userSchema = new Schema({
    userId: {type: Number, unique:true},
    username: {type: String, required:true},
    email: {type: String, required: true},
    password: {type: String, required: true}
})

userSchema.pre('save', async function(next) {
    if (this.isNew) {
      try {
        const counter = await Counter.findOneAndUpdate(
          { model: 'UserModel' },
          { $inc: { sequenceValue: 1 } },
          { new: true, upsert: true }  
        );
        this.userId = counter.sequenceValue;
        next();
      } catch (error) {
        next(error);
      }
    } else {
      next();
    }
  });
  
const UserModel = mongoose.model("UserModel", userSchema);

export default UserModel;