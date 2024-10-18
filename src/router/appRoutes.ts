import { Router } from "express";
import appController from "../controllers/app-controller";

export const appRouter = Router();

import express from "express";
import cors from 'cors'



const app = express();
app.use(cors())

appRouter.post("/addUser" , appController.addUser)

// appRouter.get("/getdepartmentstaff" , appController.getdepartmentstaff)
// appRouter.get("/getguestdetails" , appController.getguestdetails)
// appRouter.get("/getroomdetails" , appController.getroomdetails)
// appRouter.get("/getallguests" , appController.getallguests)


// appRouter.post("/createstaff" , appController.createStaff)
// appRouter.post("/createDepartment" , appController.createDepartment)
// appRouter.post("/createGuest" , appController.createGuest)
// appRouter.post("/createRoom" , appController.createRoom)
// appRouter.post("/createReservation" , appController.createReservation)

// appRouter.delete("/deleteguest" , appController.deleteGuest)

// appRouter.patch("/updateroom" , appController.updateroom)