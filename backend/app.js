import express from "express"
import path from "path";
import cookieParser from "cookie-parser"
import dotenv from "dotenv"


import authroutes from "./routes/auth.routes.js"
import messageroutes from "./routes/message.routes.js"
import userroutes from "./routes/user.routes.js"

import connectToMongodb from "./db/mongodb.js"

dotenv.config();
import {app,server} from "./socket/socket.js"


const __dirname = path.resolve();
const PORT = process.env.PORT||5000;


app.use(express.json());
app.use(cookieParser());

app.use("/api/auth",authroutes);
app.use("/api/messages",messageroutes);
app.use("/api/users",userroutes);

app.use(express.static(path.join(__dirname, "/frontend/dist")));

app.get("*", (req, res) => {
	res.sendFile(path.join(__dirname, "frontend", "dist", "index.html"));
});

server.listen(PORT ,() => {
    connectToMongodb();
    console.log(`working ${PORT}`)});
