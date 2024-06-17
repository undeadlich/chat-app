import User from "../models/user.model.js"

export const usersforsidebar = async (req,res) =>{
    try{
        const loggedinId = req.user._id;
        const allusers = await User.find({_id:{$ne:loggedinId}}).select("-password");
        res.status(200).json(allusers);

    }catch(error){
        console.log("error in user for side bar", error.message);
        res.status(500).json({error:"Internal Server Error"});
    }

}