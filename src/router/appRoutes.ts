import { Router } from "express";
import appController from "../controllers/app-controller";

export const appRouter = Router();

appRouter.get("/" , appController.getSample)
appRouter.post("/insert" , appController.insertSample)
appRouter.get("/getByName" , appController.getSampleByName)
appRouter.delete("/delete" , appController.deleteSample)
appRouter.patch("/update" , appController.updateSample)

appRouter.post("/insertTeam" , appController.insertTeam)
appRouter.post("/insertPlayer" , appController.insertPlayer)
appRouter.post("/insertOwners" , appController.insertOwners)

appRouter.delete("/deleteTeam" , appController.deleteTeam)
appRouter.get("/FindTeamByOwners" , appController.FindTeamByOwners)


appRouter.get("/FindInfoByTeam" , appController.FindInfoByTeam)
appRouter.delete("/deletePlayer" , appController.deletePlayer)

appRouter.post("/insertStadium" , appController.insertStadium)
appRouter.post("/insertSponsor" , appController.insertSponsor)


appRouter.get("/FindTeamByStadiumSponsor" , appController.FindTeamByStadiumSponsor)
appRouter.patch("/updateStadiumSponsor" , appController.updateStadiumSponsor)


appRouter.delete("/deleteStadium" , appController.deleteStadium)