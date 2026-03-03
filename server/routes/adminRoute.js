import express from "express";
import {
  getAdminAnalytics,
  getAdminCourses,
  getusers,
  updateUserAccess,
} from "../controller/adminController.js";

import isAdmin from "../middleware/authRole.js";
import isAuth from "../middleware/isAuth.js";
import rateLimit from "express-rate-limit";

const adminRouter = express.Router();

const adminLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 min
  max: 100,
  message: "Too many requests. Try again later.",
});

adminRouter.use(isAuth, isAdmin, adminLimiter);

adminRouter.get("/users", getusers);

adminRouter.get("/analytics", getAdminAnalytics);

adminRouter.get("/courses", getAdminCourses);

adminRouter.patch("/user/:id", updateUserAccess);

export default adminRouter;
