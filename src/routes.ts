import { Router } from "express";
import { END_POINTS } from "./constants/end-points";
import { appRouter } from "./router/appRoutes"


export const router = Router();

router.use(END_POINTS.SAMPLE, appRouter);
