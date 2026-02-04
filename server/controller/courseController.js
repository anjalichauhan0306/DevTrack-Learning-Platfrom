import Courses from "../model/courseModel.js";
import uploadOnCloudinary from "../config/cloudnary.js";
import Lecture from "../model/lectureModel.js";
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
}

export const createLecture = async (req, res) => {
  try {
    const { lectureTitle } = req.body;
    const { courseId } = req.params;

    if (!lectureTitle || !courseId) {
      return res.status(400).json({
        message: "Lecture Title and Course ID are required",
      });
    }

    const course = await Courses.findById(courseId);
    const lecture = await Lecture.create({ lectureTitle });

    if (!course) {
      return res.status(404).json({ message: "Course Not Found" });
    }

      if (course) {
        course.lectures.push(lecture._id)
      }
      
    await course.populate("lectures")
    await course.save();

    const updatedCourse = await Courses.findById(courseId).populate("lectures");

    return res.status(201).json({
      lecture,
      course: updatedCourse,
    });

  } catch (error) {
    return res.status(500).json({
      message: `Failed to create lecture: ${error.message}`,
    });
  }
};



export const getCourseLecture = async (req,res) => {
  try {
    const {courseId} = req.params
    const course = await Courses.findById(courseId)
    if(!course){
    return res.status(400).json({message:
      "Course Id Not Found !"
    });
    }

    await course.populate("lectures")
    await course.save()
    return res.status(200).json(course);

  } catch (error) {
    return res
      .status(500)
      .json({ message: `failed to get Course lecture By ID: ${error.message}` });
  }
}

export const editLecture = async (req,res) => {
  try {
    const {lectureId} = req.params;
    const {isPreviewFree, lectureTitle} =req.body
    const lecture = await Lecture.findById(lectureId)
    if(!lecture){
      return res.status(400).json({message:
      "Lecture Not Found !"
    });
    }
    
    let videoUrl 
    if(req.file){
      videoUrl =  await uploadOnCloudinary(req.file.path)
      lecture.videoUrl = videoUrl
    }
    if(lectureTitle){
      lecture.lectureTitle = lectureTitle
    }

    lecture.isPreviewFree = isPreviewFree
    await lecture.save()
    
    return res.status(200).json(lecture)

  } catch (error) {
    return res
      .status(500)
      .json({ message: `failed to Edit Course lecture : ${error.message}` }); 
  }
}

export const removeLecture = async (req,res) => {
  try {
    const {lectureId} = req.params
    const lecture =  await Lecture.findByIdAndDelete(lectureId)
    if(!lecture){
      return res.status(400).json({message:
      "Lecture Not Found !"
    });
    }

    await Courses.updateOne(
      {lectures : lectureId},
      {$pull:{lectures:lectureId}}
    )
      return res.status(400).json({message:
      "Lecture Removed !"
    });
  } catch (error) {
    return res.status(400).json({message:
      `try again ${error} !`
    }); 
  }
}


