import express from 'express'
import { createStripePayment, freeEnrollCourse, verifyStripePayment } from '../controller/paymentController.js'

const paymentRouter = express.Router()

paymentRouter.post("/razorpay-order",createStripePayment)
paymentRouter.post("/verifypayment",verifyStripePayment)
paymentRouter.post("/free-enroll", freeEnrollCourse);


export default paymentRouter