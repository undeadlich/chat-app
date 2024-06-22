import jwt from "jsonwebtoken"
import User from "../models/user.model.js"

const isAuth = async (req,res,next)=>{
    try{
    const token = req.cookies.jwt;
    if(!token){
        return res.status(401).json({error:"Unauthorized : No token"})
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if(!decoded){
        return res.status(401).json({error:"Unauthorized : Invalid Token"})
    }
    const user = await User.findById(decoded.userId).select("-password");
    if(!user){
        return res.status(401).json({error:"Unauthorized : User not found"})
    }
   
    req.user = user;
    next();
    }
    catch(error){
        console.log("error in isAuth middleware", error.message);
        res.status(500).json("Internal Server Error");
    }
}

export default isAuth;