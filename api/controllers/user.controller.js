import userModel from "../models/user.model.js"

export const getUsers = async (req, res) => {
    
    try {

       const user = await userModel.find().sort({createdAt: -1}).select("-password")

       if(user.length === 0) {
        return res.status(404).json({status: 404, message: "Users not found"})
       }

       res.status(200).json(user)
    } catch (error) {
        res.status(500).json({status: 500, message: "Internal Server Error", error: error.message})
    }
}

export const getUser = async (req, res) => {

    try {

       const user = await userModel.findById(req.user.id).select("-password")

       if(!user) {
        return res.status(404).json({status: 404, message: "User not found"})
       }

       res.status(200).json(user)
    } catch (error) {
        res.status(500).json({status: 500, message: "Internal Server Error", error: error.message})
    }
}