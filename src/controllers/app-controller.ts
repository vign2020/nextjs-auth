import { NextFunction, Request, Response } from "express";
import bookService from "../services/app-service"
import { deepEqual } from "assert";







//new task



const createStaff= async (req: Request, res: Response, next: NextFunction) => {
  const {f_name, l_name, dept_id } = req.body
  try {
    const data = await bookService.createStaff(f_name, l_name, dept_id);
    res.json(data);
    // res.send(200)
  } catch (error) {
    next(error);
  }
};


const createDepartment= async (req: Request, res: Response, next: NextFunction) => {
  const {dept_name} = req.body
  try {
    const data = await bookService.createDepartment(dept_name);
    res.json(data);
    // res.send(200)
  } catch (error) {
    next(error);
  }
};

const createGuest= async (req: Request, res: Response, next: NextFunction) => {
  const {f_name , l_name , email} = req.body
  try {
    const data = await bookService.createGuest(f_name , l_name , email);
    res.json(data);
    // res.send(200)
  } catch (error) {
    next(error);
  }
};

const createReservation= async (req: Request, res: Response, next: NextFunction) => {
  const {guest_id , room_id , in_time , out_time} = req.body
  try {
    const data = await bookService.createReservation(guest_id , room_id , in_time , out_time);
    res.json(data);
    // res.send(200)
  } catch (error) {
    next(error);
  }
};


const createRoom = async (req: Request, res: Response, next: NextFunction) => {
  const {room_no , category  , price  , availability} = req.body
  try {
    const data = await bookService.createRoom(room_no , category  , price  , availability);
    res.json(data);
    // res.send(200)
  } catch (error) {
    next(error);
  }
};



const getdepartmentstaff= async (req: Request, res: Response, next: NextFunction) => {
  const {dept_name} = req.body
  try {
    const data = await bookService.getdepartmentstaff(dept_name);
    res.json(data);
    // res.send(200)
  } catch (error) {
    next(error);
  }
};

const getguestdetails= async (req: Request, res: Response, next: NextFunction) => {
  const {guest_id} = req.body
  try {
    const data = await bookService.getguestdetails(guest_id);
    res.json(data);
    // res.send(200)
  } catch (error) {
    next(error);
  }
};

const getroomdetails= async (req: Request, res: Response, next: NextFunction) => {

  try {
    const data = await bookService.getroomdetails();
    res.json(data);
    // res.send(200)
  } catch (error) {
    next(error);
  }
};

const getallguests= async (req: Request, res: Response, next: NextFunction) => {

  try {
    const data = await bookService.getallguests();
    res.json(data);
    // res.send(200)
  } catch (error) {
    next(error);
  }
};


const deleteGuest= async (req: Request, res: Response, next: NextFunction) => {

  const {guest_id} = req.body
  try {
    const data = await bookService.deleteGuest(guest_id);
    res.json(data);
    // res.send(200)
  } catch (error) {
    next(error);
  }
};


const updateroom= async (req: Request, res: Response, next: NextFunction) => {

  const {room_id  , room_id_new} = req.body
  try {
    const data = await bookService.updateroom(room_id , room_id_new);
    res.json(data);
    // res.send(200)
  } catch (error) {
    next(error);
  }
};







export default {
    createGuest , createStaff , createDepartment , getdepartmentstaff , createRoom , createReservation , getguestdetails , getroomdetails , getallguests ,deleteGuest , updateroom
  
  };
  