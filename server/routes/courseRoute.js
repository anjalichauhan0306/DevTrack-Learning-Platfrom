import express from "express";
import {
  createCourse,
  createLecture,
  editCourse,
  getCourseById,
  getCourseLecture,
  getCreatorCourses,
  getPublished,
  removeCourse,
  removeLecture,
} from "../controller/courseController.js";
import isAuth from "../middleware/isAuth.js";
import upload from "../middleware/multer.js";
import Courses from "../model/courseModel.js";

const courseRouter = express.Router();

courseRouter.post("/create", isAuth, upload.single("thumbnail"), createCourse);
courseRouter.get("/getpublished", getPublished);
courseRouter.get("/getcreator", isAuth, getCreatorCourses);
courseRouter.post("/editcourse/:courseId",isAuth,upload.single("thumbnail"),editCourse,);

courseRouter.get("/getcourse/:courseId", isAuth, getCourseById);
courseRouter.get("/delete/:courseId", isAuth, removeCourse);


// For Lecture

courseRouter.post("/createlecture/:courseId",isAuth,createLecture)
courseRouter.get("/courselecture/:courseId",isAuth,getCourseLecture)
courseRouter.post("/editlecture/:courseId/:lectureId",isAuth,upload.single("videourl"),editCourse)
courseRouter.get("/delete/:lectureId", isAuth, removeLecture);
export default courseRouter;
