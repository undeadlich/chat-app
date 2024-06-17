import Conversation from "../models/conversation.js"
import Message from "../models/message.model.js"

export const sendmessage= async (req,res)=> {
    try{
        const {message} = req.body;
        const recieverId = req.params.id;
        const senderId = req.user._id;

     let conversation =   await Conversation.findOne({
        participant:  {
            $all : [senderId,recieverId]
        }
     })
     if(!conversation){
        conversation = await Conversation.create({
            participant: [senderId,recieverId],
        })
     }
     const  newMsg = new Message({
        senderId,
        recieverId,
        message,
     })
     if(newMsg){
        conversation.messages.push(newMsg._id);
     }
     await Promise.all([conversation.save(),newMsg.save()])
     res.status(200).json(newMsg)

    }catch(error){
        console.log("error in send message", error.message);
        res.status(500).json({error:"Internal Server Error"});
    }
};

export const getmessage = async (req,res)=>{
    try{
        const {id:userToChatId }= req.params;
        const senderId = req.user._id;

		const conversation = await Conversation.findOne({
			participant: { $all: [senderId, userToChatId] },
		}).populate("messages"); // NOT REFERENCE BUT ACTUAL MESSAGES

		if (!conversation) return res.status(200).json([]);

		const messages = conversation.messages;

		res.status(200).json(messages);

    }
    catch(error){
        console.log("error in get message", error.message);
        res.status(500).json({error:"Internal Server Error"});
    }
}