import Courses from "../model/courseModel.js"


export const searchWithAi = async (req,res) => {
    try {
        const {input} = req.body
        if(!input){
            return res.status(400).json({message:"Search Query is Required"})
        }

        const Course = await Courses.find({
            isPublished : true,
            $or :[
                {title : {$regex : input , Options : 'i'}},
                {subTitle : {$regex : input , options : 'i'}},
                {subTitle : {$regex : input , options : 'i'}},
                {description : {$regex : input , options : 'i'}},
                {category : {$regex : input , options : 'i'}},
                {level : {$regex : input , options : 'i'}},
                
                
            ]
        })
    } catch (error) {
        
    }
}