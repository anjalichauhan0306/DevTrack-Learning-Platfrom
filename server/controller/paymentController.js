import razorpay from 'razorpay';
import dotenv from 'dotenv'
import Course from '../model/courseModel.js'

dotenv.config()
const RazorpyInstance =  new razorpay({
    key_id : process.env.RAZORPAY_KEY_ID ,
    key_secret :process.env.RAZORPAY_SECREAT_KEY
})

export const RazorpayOrder = async (req,res) => {
    try {
        const {courseId} = req.body
        const course = await Course.findById(courseId)

        if(!course){
            return res.status(404).json({message : "Course iS not Found"})
        }

        const options = {
            amount : course.Price*100,
            currency : 'INR',
            receipt :  `${courseId}.toString()`
        }

        const order = await RazorpyInstance.orders.create(options)

        return res.status(200).json(order)
    } catch (error) {
        console.log(error);
        return res.status(500).json({message : `Failed to Create Razorpay Order ${error}`})
    }
}

export const verifyPayment = async (req,res) => {
    try {
        const {courseId , userId , orderId} = req.body
        const orderInfo = await RazorpyInstance.orders.fetch(razorpay_order_id)

        if(orderInfo.status === 'paid'){
            const user = await User.findById(userId)
            if(!user){
                return res.status(404).json({message:"User Not Found"})
            }
            if(!user.enrolledCourses.includes(courseId)){
                await user.enrolledCourses.push(courseId)
                await user.save()
            }

            const course = await Course.findById(courseId).populate("lectures")

            if(!course.enrolledStudents.includes(userId)){
                await course.enrolledCourses.push(userId)
                await course.save()
            }
            }
            return res.status(200).json({message:"payment verifed and enrollement successfully"})
        
    } catch (error) {
        return res.status(200).json({message:`payment verifed failed ${error}`})
    }
}