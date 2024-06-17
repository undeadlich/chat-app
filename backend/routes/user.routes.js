import express from "express";

import isAuth from "../middleware/isAuth.js"
import {usersforsidebar }from "../controllers/user.controller.js"

const router = express.Router();

router.get("/",isAuth,usersforsidebar)

export default router;