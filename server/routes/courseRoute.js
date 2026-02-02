import express from "express";
import {
  createCourse,
  editCourse,
  getCourseById,
  getCreatorCourses,
  getPublished,
  removeCourse,
} from "../controller/courseController.js";
import isAuth from "../middleware/isAuth.js";
import upload from "../middleware/multer.js";

const courseRouter = express.Router();

courseRouter.post("/create", isAuth, upload.single("thumbnail"), createCourse);
courseRouter.get("/getpublished", getPublished);
courseRouter.get("/getcreator", isAuth, getCreatorCourses);
courseRouter.post("/editcourse/:courseId",isAuth,upload.single("thumbnail"),editCourse,);

courseRouter.get("/getcourse/:courseId", isAuth, getCourseById);
courseRouter.get("/delete/:courseId", isAuth, removeCourse);

export default courseRouter;
