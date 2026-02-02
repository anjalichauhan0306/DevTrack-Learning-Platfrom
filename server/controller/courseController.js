import Courses from "../model/courseModel.js";
import uploadOnCloudinary from "../config/cloudnary.js";
export const createCourse = async (req, res) => {
  try {
    const { title, category, description, subTitle, level } = req.body;

    if (!req.body) {
      return res.status(400).json({ message: "Request body missing" });
    }

    if (!title || !category || !description || !subTitle || !level) {
      return res.status(400).json({ message: "All Fields are required" });
    }

    let thumbnailUrl = "";

    if (req.file) {
      thumbnailUrl = await uploadOnCloudinary(req.file.path);
    }

    const course = await Courses.create({
      title,
      category,
      description,
      subTitle,
      level,
      thumbnail: thumbnailUrl,
      creator: req.userId,
    });

    return res.status(201).json(course);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getPublished = async (req, res) => {
  try {
    const courses = await Courses.find({ isPublished: true });

    if (!courses) {
      return res.status(404).json({ message: "Courses Not Found" });
    }
    return res.status(200).json(courses);
  } catch (error) {
    return res
      .status(500)
      .json({ message: `Failed To find isPublished Courses : ${error}` });
  }
};

export const getCreatorCourses = async (req, res) => {
  try {
    const userId = req.userId;
    const courses = await Courses.find({ creator: userId });

    if (!courses) {
      return res.status(400).json({ message: "Courses Not Found" });
    }
    return res.status(201).json(courses);
  } catch (error) {
    return res
      .status(400)
      .json({ message: `Failed To Get  creator Courses : ${error}` });
  }
};

export const editCourse = async (req, res) => {
  try {
    const { courseId } = req.params;
    const {
      title,
      subTitle,
      description,
      category,
      level,
      isPublished,
      isPaid,
      quiz,
      certificate,
      Price,
    } = req.body;

    let thumbnail;

    if (req.file) {
      thumbnail = await uploadOnCloudinary(req.file.path);
    }

    let course = await Courses.findById(courseId);
    if (!course) {
      return res.status(400).json({ message: "Courses is Not Found" });
    }

    const updateData = {
      title,
      subTitle,
      description,
      isPaid,
      category,
      level,
      isPublished,
      Price,
      thumbnail,
    };

    course = await Courses.findByIdAndUpdate(courseId, updateData, {
      new: true,
    });

    return res.status(201).json(course);
  } catch (error) {
    if (!Courses) {
      return res.status(500).json(error.message);
    }
  }
};

export const getCourseById = async (req, res) => {
  try {
    const { courseId } = req.params;
    let course = await Courses.findById(courseId);
    if (!course) {
      return res.status(400).json({ message: "Courses is Not Found" });
    }
    return res.status(200).json(course);
  } catch (error) {
    return res
      .status(500)
      .json({ message: `failed to Get Course by Id ${error.message}` });
  }
};

export const removeCourse = async (req, res) => {
  try {
    const { courseId } = req.params;
    let course = await Courses.findById(courseId);
    if (!course) {
      return res.status(400).json({ message: "Courses is Not Found" });
    }

    course = await Courses.findByIdAndDelete(courseId);

    return res.status(200).json({ message: "Course Deleted Successfully" });
  } catch (error) {
    return res
      .status(500)
      .json({ message: `failed to Delete Course : ${error.message}` });
  }
};
