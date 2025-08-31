import { Router } from "express";
import {
  getCurrentUser,
  // changeCurrentPassword,
  // getCurrentUser,
  // getUserChannelProfile,
  // getWatchHistory,
  loginUser,
  logoutUser,
  refreshAccessToken,
  registerUser,
  updateUserDetails,
  // updateAccountDetails,
  // updateUserAvatar,
  // updateUserCoverImage
} from "../controllers/user.controller.js";
import { upload } from "../middlerwares/multer.middleware.js";
import { verifyJwt } from "../middlerwares/auth.middleware.js";


const router = Router();

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);

// secured Routes
router.route("/logout").post(verifyJwt, logoutUser);
router.put("/update-user", verifyJwt, updateUserDetails);

router.route("/refresh-Token").post(refreshAccessToken)
// router.route('/change-password').post(verifyJwt, changeCurrentPassword);
router.route('/current-user').get(verifyJwt, getCurrentUser);
// router.route('/update_details').patch(verifyJwt, updateAccountDetails);
// router.route('/update_avatar').patch(verifyJwt, upload.single("avatar"), updateUserAvatar);
// router.route('/update_coverImg').patch(verifyJwt, upload.single("coverImage"), updateUserCoverImage);
// router.route('/c/:username').get(verifyJwt, getUserChannelProfile);
// router.route('/watchHistory').get(verifyJwt, getWatchHistory);


export default router;
