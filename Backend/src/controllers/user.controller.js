// Updated Auth Controller with fixes
import { asyncHandler } from "../utils/asynchandler.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import jwt from "jsonwebtoken";

const generateAccessTokenAndRefreshToken = async (userId) => {
  try {
    const user = await User.findById(userId);
    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();

    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });

    return { accessToken, refreshToken };
  } catch (error) {
    throw new ApiError(500, "Something went wrong while generating tokens");
  }
};


// ---------------- REGISTER ----------------
const registerUser = asyncHandler(async (req, res) => {
  const { fullName, email, password, username } = req.body;

  if ([fullName, email, password, username].some((field) => !field?.trim())) {
    throw new ApiError(400, "All fields are required");
  }

  if (password.length < 6) {
    throw new ApiError(400, "Password must be at least 6 characters long");
  }

  const existedUser = await User.findOne({ $or: [{ username }, { email }] });
  if (existedUser) throw new ApiError(409, "User already exists");

  await User.create({
    fullName,
    email,
    password,
    username: username.toLowerCase(),
  });

  return res
    .status(201)
    .json(new ApiResponse(201, {}, "User registered successfully. Please login to continue."));
});



// ---------------- LOGIN ----------------
const loginUser = asyncHandler(async (req, res, next) => {
  const { identifier, password } = req.body;

  if (!identifier || !password) {
    return next(new ApiError(400, "Username/Email and Password are required"));
  }

  const user = await User.findOne({ $or: [{ username: identifier }, { email: identifier }] });
  if (!user) return next(new ApiError(404, "User does not exist"));

  const isPasswordValid = await user.isPasswordCorrect(password);
  if (!isPasswordValid) return next(new ApiError(401, "Invalid credentials"));

  const { accessToken, refreshToken } = await generateAccessTokenAndRefreshToken(user._id);

  const options = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production", // ✅ only secure in prod
    sameSite: "Lax",
  };

  return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(new ApiResponse(200, { user: user.toObject({ getters: true }) }, "Login successful"));
});



// ---------------- LOGOUT ----------------
const logoutUser = asyncHandler(async (req, res) => {
  if (req.user) {
    await User.findByIdAndUpdate(req.user._id, { $unset: { refreshToken: 1 } }, { new: true });
  }

  return res
    .status(200)
    .clearCookie("accessToken")
    .clearCookie("refreshToken")
    .json(new ApiResponse(200, {}, "User logged out successfully"));
});

// ---------------- REFRESH TOKEN ----------------
const refreshAccessToken = asyncHandler(async (req, res) => {
  const incomingRefreshToken = req.cookies.refreshToken || req.body.refreshToken;
  if (!incomingRefreshToken) throw new ApiError(401, "Unauthorized Request");

  try {
    const decodedToken = jwt.verify(incomingRefreshToken, process.env.REFRESH_TOKEN_SECRET);
    const user = await User.findById(decodedToken?._id);

    if (!user) throw new ApiError(401, "Invalid refresh token");
    if (incomingRefreshToken !== user?.refreshToken) {
      throw new ApiError(401, "Refresh token expired or invalid");
    }

    const { accessToken, refreshToken: newRefreshToken } =
      await generateAccessTokenAndRefreshToken(user._id);

    const options = {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Lax",
    };

    return res
      .status(200)
      .cookie("accessToken", accessToken, options)
      .cookie("refreshToken", newRefreshToken, options)
      .json(new ApiResponse(200, {}, "Token refreshed"));
  } catch (error) {
    throw new ApiError(401, error?.message || "Invalid Refresh Token");
  }
});

// ---------------- GET CURRENT USER ----------------
const getCurrentUser = asyncHandler(async (req, res) => {
  if (!req.user) throw new ApiError(401, "Not authenticated");
  return res.status(200).json(new ApiResponse(200, req.user, "User fetched successfully"));
});

const updateUserDetails = asyncHandler(async (req, res) => {
  const userId = req.user._id; // ✅ safer than req.user.id
  const { fullName, email, phone, location } = req.body;

  // Only include fields that are provided
  const updates = {};
  if (fullName) updates.fullName = fullName;
  if (email) updates.email = email;
  if (phone) updates.phone = phone;
  if (location) updates.location = location;

  const user = await User.findByIdAndUpdate(userId, updates, { new: true }).select(
    "-password -refreshToken"
  );

  if (!user) {
    throw new ApiError(404, "User not found");
  }

  return res.status(200).json(new ApiResponse(200, user, "User updated successfully"));
});

export {
  registerUser,
  loginUser,
  logoutUser,
  refreshAccessToken,
  updateUserDetails,
  getCurrentUser,
};
