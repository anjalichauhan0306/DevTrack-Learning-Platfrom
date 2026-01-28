import User from "../model/userModel.js"

export const getCurrentUser = async (req,res) => {
    try {
        const user = await User.findById(req.userId).select("-password");

        if (!user) {
            return res.status(404).json({message:"user Not Found"})
        }

        return res.status(201).json(user)
        
    } catch (error) {
        return res.status(404).json({message:`GetCurrentUser Error ${error}`})
    }
}

export const updateProfile = async (req,res) => {
    try {
        const userId = req.userId;
        const {description, name} = req.body;
        let photoUrl 

        if(req.file) {
            photoUrl = await uploadOnCloudinary(req.file.path);
        }

        const user = await User.findByIdAndUpdate(userId, {
            description,
            name,
            photo : photoUrl
        }, {new : true}).select("-password");

        if(!user) { 
            return res.status(404).json({message:"User Not Found"})
        }

        return res.status(200).json(user);
        await user.save()
    } catch (error) {
        return res.status(500).json({message:`UpdateProfile Error ${error}`})
    }
}


