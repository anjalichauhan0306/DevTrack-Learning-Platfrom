// backend/controllers/certificateController.js
import path from "path";
import crypto from "crypto";
import PDFDocument from "pdfkit";
import fs from "fs";
import User from "../model/userModel.js";
import Course from "../model/courseModel.js";
import Certificate from "../model/certificate.model.js";
import { Quiz } from "../model/quizModel.js";

// 🔹 Eligibility check function
const eligibilityCheck = async (userId, courseId) => {
  const user = await User.findById(userId);
  const course = await Course.findById(courseId);

  if (!user || !course) return false;

  // 1️⃣ Check if all lectures completed
  const completedCourse = user.completedLectures.find(
    (c) => c.courseId.toString() === courseId
  );
  if (!completedCourse || completedCourse.lectureIds.length < course.lectures.length)
    return false;

  // 2️⃣ Check quiz / final exam score
  const quiz = await Quiz.findOne({ course: courseId, user: userId });
  if (!quiz) return false;

  const attempts = quiz.attempts || [];
  const bestScore =
    attempts.length > 0 ? Math.max(...attempts.map((a) => a.score)) : 0;
  const totalQuestions = quiz.questions.length;
  const percentage = (bestScore / totalQuestions) * 100;

  if (percentage < 70) return false;

  return { bestScore, totalQuestions, percentage };
};

// 🔹 Generate Certificate
export const generateCertificate = async (req, res) => {
  try {
    const { courseId } = req.params;
    const userId = req.user._id;

    // 1️⃣ Eligibility check
    const eligibility = await eligibilityCheck(userId, courseId);
    if (!eligibility)
      return res.status(400).json({ message: "Not eligible for certificate" });

    const { bestScore, totalQuestions, percentage } = eligibility;

    // 2️⃣ Already generated?
    const existing = await Certificate.findOne({ userId, courseId });
    if (existing)
      return res.json({
        message: "Certificate already generated",
        downloadUrl: existing.downloadUrl,
      });

    const user = await User.findById(userId);
    const course = await Course.findById(courseId);

    // 3️⃣ Certificate ID & PDF path
    const certificateId =
      "CERT-" + crypto.randomBytes(4).toString("hex").toUpperCase();
    const pdfDir = path.join("certificates");
    if (!fs.existsSync(pdfDir)) fs.mkdirSync(pdfDir);
    const pdfPath = path.join(pdfDir, `certificate-${certificateId}.pdf`);

    // 4️⃣ Update user's enrolled course certificate info (optional)
    user.enrolledCourses = user.enrolledCourses.map((c) =>
      c.toString() === courseId
        ? { course: c, certificate: { isIssued: true, certificateId, issuedAt: new Date() } }
        : c
    );
    await user.save();

    // 5️⃣ Generate PDF
    const doc = new PDFDocument({ layout: "landscape", size: "A4" });
    const writeStream = fs.createWriteStream(pdfPath);
    doc.pipe(writeStream);

    // Fonts
    doc.registerFont("HeadingFont", path.join("assets", "playfair_font.ttf"));
    doc.registerFont("SignatureFont", path.join("assets", "MomoSign.ttf"));

    // Background
    doc.image(path.join("assets", "certificate-bg.png"), 0, 0, {
      width: doc.page.width,
      height: doc.page.height,
    });

    // Logo
    doc.image(path.join("assets", "logo.png"), 60, 50, { width: 120 });

    // Certificate Text
    doc
      .font("HeadingFont")
      .fontSize(42)
      .fillColor("#1E293B")
      .text("CERTIFICATE OF COMPLETION", { align: "center" })
      .moveDown(1.5);
    doc.fontSize(18).text("This certificate is proudly presented to", {
      align: "center",
    });
    doc.moveDown();
    doc.fontSize(36).fillColor("#C6A85C").text(user.name.toUpperCase(), {
      align: "center",
    });
    doc.moveDown();
    doc.fontSize(18).fillColor("#374151").text(
      `For successfully completing the course: ${course.title}`,
      { align: "center" }
    );
    doc.moveDown();
    doc.fontSize(16).text(
      `Score: ${bestScore}/${totalQuestions} (${percentage.toFixed(0)}%)`,
      { align: "center" }
    );

    // Footer
    doc.fontSize(14).text(`Certificate ID: ${certificateId}`, 500, 500);
    doc.fontSize(14).text(`Date: ${new Date().toDateString()}`, 80, 500);
    doc.font("SignatureFont").fontSize(28).text("Instructor Name", 80, 450);
    doc.fontSize(12).text("Instructor Signature", 80, 480);

    doc.end();

    // 6️⃣ Save certificate record & send PDF
    writeStream.on("finish", async () => {
      const certificate = new Certificate({
        userId,
        courseId,
        certificateId,
        downloadUrl: pdfPath,
      });
      await certificate.save();

      res.download(pdfPath, `certificate-${certificateId}.pdf`);
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Certificate generation error" });
  }
};