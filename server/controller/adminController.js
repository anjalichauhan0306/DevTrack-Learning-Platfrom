import User from "../model/userModel.js";
import Course from "../model/courseModel.js"


export const getEducators = async (req, res) => {
  try {
    const educators = await User.aggregate([
      {
        $match: { role: { $in: ["Educator", "Student"] } }
      },
      {
        $lookup: {
          from: "courses", 
          localField: "_id",
          foreignField: "creator",
          as: "createdCourses"
        }
      },
      {
        $addFields: {
          totalCourses: { $size: "$createdCourses" },

          totalStudents: {
            $sum: {
              $map: {
                input: "$createdCourses",
                as: "course",
                in: {
                  $size: {
                    $ifNull: ["$$course.enrolledStudents", []]
                  }
                }
              }
            }
          }
        }
      },
      {
        $project: {
          password: 0,
          createdCourses: 0
        }
      },
      {
        $sort: { createdAt: -1 }
      }
    ]);

    res.json(educators);

  } catch (error) {
    console.error("Error fetching educators:", error);
    res.status(500).json({ message: "Server error" });
  }
};


export const getAdminCourses = async (req, res) => {
  try {
    const courses = await Course.find()
      .populate("creator", "name") 
      .sort({ createdAt: -1 });
    
    res.status(200).json(courses);

  } catch (error) {
    console.error("Error fetching admin courses:", error);
    res.status(500).json({ message: "Server error" });
  }
};


export const getAdminAnalytics = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalStudents = await User.countDocuments({ role: "Student" });
    const totalEducators = await User.countDocuments({ role: "Educator" });
    const totalCourses = await Course.countDocuments();

    // --- NEW: Signups Growth Logic (Last 7 Days) ---
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    const signupStats = await User.aggregate([
      {
        $match: {
          createdAt: { $gte: sevenDaysAgo }
        }
      },
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
          count: { $sum: 1 }
        }
      },
      { $sort: { "_id": 1 } }
    ]);

    // Format data for Recharts (e.g., { name: '2024-05-01', signups: 5 })
    const chartData = signupStats.map(stat => ({
      name: new Date(stat._id).toLocaleDateString('en-US', { weekday: 'short' }),
      signups: stat.count
    }));

    // Revenue calculation (same as before)
    const courses = await Course.find({}, 'enrolledStudents Price isPaid');
    let totalRevenue = 0;
    let totalEnrollments = 0;
    courses.forEach(c => {
      totalEnrollments += c.enrolledStudents?.length || 0;
      if (c.isPaid) totalRevenue += (c.enrolledStudents?.length || 0) * (Number(c.Price) || 0);
    });

    res.status(200).json({
      totalUsers, totalStudents, totalEducators, totalCourses,
      totalRevenue, totalEnrollments,
      chartData // <--- Ye frontend ko pass karo
    });

  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};


export const updateUserAccess = async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { isActive: req.body.isActive },
      { new: true }
    );

    res.json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};