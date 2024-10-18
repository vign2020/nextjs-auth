

import { availableMemory } from "process"
import appData from "../data/app-data"





//new task



const createStaff = async (f_name : string , l_name : string , dept_id : number) =>{
  return await appData.createStaff(f_name, l_name, dept_id)
}


const createDepartment = async (dept_name : string) =>{
  return await appData.createDepartment(dept_name)
}

const createGuest = async (f_name : string , l_name : string , email: string) =>{
  return await appData.createGuest(f_name , l_name , email)
}


const getdepartmentstaff = async (dept_name : string) =>{
  return await appData.getdepartmentstaff(dept_name)
} 

const createRoom = async (room_no : number  , category : string , price : number , availability: boolean) =>{
  return await appData.createRoom(room_no , category  , price  , availability)
}

const createReservation = async (guest_id : number , room_id : number, in_time : Date , out_time : Date) =>{
  return await appData.createReservation(guest_id , room_id , in_time , out_time)
}

const getguestdetails = async (guest_id : number)=>{
  return await appData.getguestdetails(guest_id)
}

const getroomdetails = async ()=>{
  return await appData.getroomdetails()
}

const getallguests = async ()=>{
  return await appData.getallguests()
}
const deleteGuest = async (guest_id  : number)=>{
  return await appData.deleteGuest(guest_id)
}

const updateroom = async (room_id  : number , room_id_new : number)=>{
  return await appData.updateroom(room_id , room_id_new)
}

export default {
  createGuest , createStaff , createDepartment , getdepartmentstaff  , createRoom , createReservation , getguestdetails , getroomdetails , getallguests , deleteGuest , updateroom
  };
  