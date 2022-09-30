import mongoose from 'mongoose'

const UserSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true
    },
    name: {
      type: String,
      required: true
    },
    photoUrl: {
      type: String,
    },
    provider: {
      type: String,
      required: true
    },
    contactType: {
      type: String,
      required: true
    },
    phone: {
      type: String,
      required: true
    },
    password: {
        type: String,
        required: true,
    }
  },
  {
    timestamps: true,
  }
);

const User= mongoose.model('User', UserSchema);
export default User
