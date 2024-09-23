import { NextFunction, Request, Response } from "express";
import bookService from "../services/app-service"





const getSample = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = await bookService.getSample();
    res.json(data);
    // res.send(200)
  } catch (error) {
    next(error);
  }
};

export default {
    getSample
  
  };
  