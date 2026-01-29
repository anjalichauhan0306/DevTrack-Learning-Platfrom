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

export const getCreatorCourses = async (req,res) => {
    try {
        const userId = req.userId;
        const courses = await Courses.find({creator : userId})

        if(!courses){
            return res.status(400).json({message :"Courses Not Found"})
        }
        return res.status(201).json(courses)

    } catch (error) {
        return res.status(400).json({message : `Failed To Get  creator Courses : ${error}`});
    }
}

export const editCourse = async (req,res) => {
    try {
        const {courseId} = req.params
        const {title, subTitle,description , category , level , isPublished , quiz, certificate} = req.body

        let thumbnail 

        if(req.file){
            thumbnail = await uploadOnCloudinary(req.file.path)
        }

        let course = await Courses.findById(courseId)
        if(!course){
            return res.status(400).json({message : "Courses is Not Found"})
        }

        const updateData = { title , subTitle , description , category , level , isPublished , price , thumbnail} 

        course = await Courses.findByIdAndUpdate(courseId, updateData , {new :true})

        return res.status(201).json(course)

    } catch (error) {
        if(!Courses){
            return res.status(400).json({message : " faild Please try Again"})
        }
    }
}




