import mongoose from "mongoose"

const conversationschema = new mongoose.Schema({
    participant:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
    }],
    messages:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Message",
        default:[]
    }]


},{timestamps:true});
const Conversation = mongoose.model("Conversation",conversationschema);

export default Conversation;