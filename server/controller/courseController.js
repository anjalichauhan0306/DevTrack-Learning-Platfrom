import Courses from "../model/courseModel"


export const createCourse = async (req,res) => {
    try {
        const {title , category} = req.body
        if(!title || category) {
            return res.status(400).json({message : "Title or Category is Required"})
        } 

        const course = await Courses.create({title,
            dscription,
            creator : req.userId
        })

        return res.status(201).json(course)
    } catch (error) {
        return res.status(400).json({message : `CreateCourse Error : ${error}`});
    }
}

export const getPublished = async (req,res) => {
    try {
        const courses = await Courses.find({isPublished : true})

        if(!courses){
            return res.status(400).json({message :"Courses Not Found"})
        }
        return res.status(201).json(courses)
    } catch (error) {
         return res.status(400).json({message : `Failed To find isPublished Courses : ${error}`});
    }
}

