import Stripe from "stripe";
import dotenv from "dotenv";
import Course from '../model/courseModel.js'
import User from "../model/userModel.js";

dotenv.config();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const createStripePayment = async (req, res) => {
  try {
    const { courseId } = req.body;

    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    const paymentIntent = await stripe.paymentIntents.create({
      amount: course.Price * 100, // paisa in paise
      currency: "inr",
      metadata: {
        courseId: courseId.toString(),
      },
    });

    return res.status(200).json({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: `Failed to create Stripe Payment ${error.message}`,
    });
  }
};

export const verifyStripePayment = async (req, res) => {
  try {
    const { paymentIntentId, userId, courseId } = req.body;

    const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);

    if (paymentIntent.status === "succeeded") {
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      if (!user.enrolledCourses.includes(courseId)) {
        user.enrolledCourses.push(courseId);
        await user.save();
      }

      const course = await Course.findById(courseId);

      if (!course.enrolledStudents.includes(userId)) {
        course.enrolledStudents.push(userId);
        await course.save();
      }

      return res.status(200).json({
        message: "Payment verified and enrollment successful",
      });
    }

    return res.status(400).json({
      message: "Payment not completed",
    });
  } catch (error) {
    return res.status(500).json({
      message: `Payment verification failed ${error.message}`,
    });
  }
};

export const freeEnrollCourse = async (req, res) => {
  try {
    // const { userId, courseId } = req.body;
    const { courseId, userId } = req.body;

    const user = await User.findById(userId);
     const course = await Course.findById(courseId).populate("lectures");

    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    if (course.isPaid) {
      return res.status(400).json({ message: "This course is paid" });
    }

    if (user.enrolledCourses.includes(courseId)) {
      return res.status(400).json({ message: "Already enrolled" });
    }

    if (!user.enrolledCourses.includes(courseId)) {
       await user.enrolledCourses.push(courseId);
      await user.save();
    }


    if (!course.enrolledStudents.includes(userId)) {
       course.enrolledStudents.push(userId);
      await course.save();
    }

    res.status(200).json({ message: "Enrolled Successfully!" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error" });
  }
};

// import razorpay from 'razorpay';
// import dotenv from 'dotenv'
// import Course from '../model/courseModel.js'

// dotenv.config()
// const RazorpyInstance =  new razorpay({
//     key_id : process.env.RAZORPAY_KEY_ID ,
//     key_secret :process.env.RAZORPAY_SECREAT_KEY
// })

// export const RazorpayOrder = async (req,res) => {
//     try {
// const {courseId} = req.body
// const course = await Course.findById(courseId)

// if(!course){
//     return res.status(404).json({message : "Course iS not Found"})
// }

//         const options = {
//             amount : course.Price*100,
//             currency : 'INR',
//             receipt :  `${courseId}.toString()`
//         }

//         const order = await RazorpyInstance.orders.create(options)

//         return res.status(200).json(order)
//     } catch (error) {
//         console.log(error);
//         return res.status(500).json({message : `Failed to Create Razorpay Order ${error}`})
//     }
// }

// export const verifyPayment = async (req,res) => {
//     try {
//         const {courseId , userId , orderId} = req.body
//         const orderInfo = await RazorpyInstance.orders.fetch(razorpay_order_id)

//         if(orderInfo.status === 'paid'){
//             const user = await User.findById(userId)
//             if(!user){
//                 return res.status(404).json({message:"User Not Found"})
//             }
// if (!user.enrolledCourses.includes(courseId)) {
//   await user.enrolledCourses.push(courseId);
//   await user.save();
// }

// const course = await Course.findById(courseId).populate("lectures");

// if (!course.enrolledStudents.includes(userId)) {
//   await course.enrolledCourses.push(userId);
//   await course.save();
// }
//             }
//             return res.status(200).json({message:"payment verifed and enrollement successfully"})

//     } catch (error) {
//         return res.status(200).json({message:`payment verifed failed ${error}`})
//     }
// }
