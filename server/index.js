import express from "express"
import dotenv from 'dotenv'
import { db } from "./config/db"
 dotenv.config()
const app = express()
const port = process.env.PORT || 5000

app.get("/",(req,res) => {
  res.send("Hello from server");
})

db();
app.listen(port , () => {
    console.log(`server is running at http://localhost: ${port}`);
})