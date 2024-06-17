import express from "express"
import cookieParser from "cookie-parser"
import dotenv from "dotenv"


import authroutes from "./routes/auth.routes.js"
import messageroutes from "./routes/message.routes.js"
import userroutes from "./routes/user.routes.js"

import connectToMongodb from "./db/mongodb.js"

dotenv.config();
const app = express();
const PORT = process.env.PORT||5000;



app.use(express.json());
app.use(cookieParser());

app.use("/api/auth",authroutes);
app.use("/api/message",messageroutes);
app.use("/api/users",userroutes)

app.listen(PORT ,() => {
    connectToMongodb();
    console.log(`working ${PORT}`)});