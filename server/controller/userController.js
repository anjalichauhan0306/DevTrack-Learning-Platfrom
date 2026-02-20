import User from "../model/userModel.js";
import uploadOnCloudinary from "../config/cloudnary.js";

export const getCurrentUser = async (req, res) => {
  try {
    const user = await User.findById(req.userId)
      .select("-password")
      .populate("enrolledCourses");

    if (!user) {
      return res.status(404).json({ message: "user Not Found" });
    }

    return res.status(201).json(user);
  } catch (error) {
    return res.status(404).json({ message: `GetCurrentUser Error ${error}` });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const userId = req.userId;
    const { description, name } = req.body;
    let photoUrl;

    if (req.file) {
      photoUrl = await uploadOnCloudinary(req.file.path);
    }

    const user = await User.findByIdAndUpdate(
      userId,
      {
        description,
        name,
        photoUrl: photoUrl,
      },
      { new: true },
    ).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User Not Found" });
    }
    await user.save();
    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json({ message: `UpdateProfile Error ${error}` });
  }
};

export const updateProgress = async (req, res) => {
  try {
    const userId = req.userId;
    const { courseId, lectureId } = req.body;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User Not Found" });
    }

    const courseProgress = user.completedLectures.find(
      (c) => c.courseId.toString() === courseId,
    );
    if (courseProgress) {
      if (!courseProgress.lectureIds.includes(lectureId)) {
        courseProgress.lectureIds.push(lectureId);
      }
    } else {
      user.completedLectures.push({ courseId, lectureIds: [lectureId] });
    }
    await user.save();

    const totalLectures = req.body.totalLectures || 0; // send from frontend
    const completedLectures = courseProgress?.lectureIds.length || 0;
    const percentage = totalLectures
      ? Math.round((completedLectures / totalLectures) * 100)
      : 0;

    return res.status(200).json({ message: "Progress Updated" });
  } catch (error) {
    return res.status(500).json({ message: `UpdateProgress Error ${error}` });
  }
};

export const updateExamScore = async (req, res) => {
  try {
    const userId = req.userId;
    const { courseId, score } = req.body;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User Not Found" });
    }

    const examScore = user.examScores.find(
      (e) => e.courseId.toString() === courseId,
    );
    if (examScore) {
      examScore.score = score;
    } else {
      user.examScores.push({ courseId, score });
    }
    await user.save();
    return res.status(200).json({ message: "Exam Score Updated" });
  } catch (error) {
    return res.status(500).json({ message: `UpdateExamScore Error ${error}` });
  }
};
