import { Router } from "express";
import appController from "../controllers/app-controller";

export const appRouter = Router();

appRouter.get("/" , appController.getSample)