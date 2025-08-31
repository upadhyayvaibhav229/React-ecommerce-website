import mongoose, { Schema } from 'mongoose';
// import jwt from 'json-web-token';
import jwt from 'jsonwebtoken'

import bcrypt from 'bcrypt';

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
    index: true,
  },

  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  fullName: {
    type: String,
    required: true,
    trim: true,
    index: true,
  },
  phone:{
    type: String,
    default: "000000000000",
  },

  location: {
    type: String,
    default: 'unknown'
  },
  avatar: {
    type: String, // cloudinary URL
    // required: true,
  },

  coverImage: {
    type: String, // cloudinary URL
  },

  password: {
    type: String,
    required: [true, 'Password is required'],
  },
  refreshToken: {
    type: String
  }
}, {
  timestamps: true,
});

// Password encryption middleware
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});


userSchema.methods.isPasswordCorrect = async function (enteredPassword) {
  if (!enteredPassword || !this.password) {
    console.error("Error: Missing password values", { enteredPassword, storedPassword: this.password });
    return false;
  }

  console.log("Comparing:", enteredPassword, "with stored hash:", this.password);
  return await bcrypt.compare(enteredPassword, this.password);
};


userSchema.methods.generateAccessToken = function () {
  return jwt.sign({
    _id: this._id,
    email: this.email,
    username: this.username,
    fullName: this.fullName,
  },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
    }
  );
};

userSchema.methods.generateRefreshToken = function () {
  return jwt.sign({
    _id: this._id,
  },
    process.env.REFRESH_TOKEN_SECRET,
    {
      expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
    }
  );
};

// Fix the model registration
export const User = mongoose.model('User', userSchema);
