import { NextFunction, Request, Response } from "express";
import bookService from "../services/app-service"
import { deepEqual } from "assert";





const getSample = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = await bookService.getSample();
    res.json(data);
    // res.send(200)
  } catch (error) {
    next(error);
  }
};

const insertSample = async (req: Request, res: Response, next: NextFunction) => {
  const {emp_id , first_name , last_name , email , phone_number , created_at , updated_at , created_by , updated_by} = req.body
  try {
    const data = await bookService.insertSample(emp_id , first_name , last_name , email , phone_number , created_at , updated_at , created_by , updated_by);
    
    res.json(data)
    // res.send(200)
  } catch (error) {
    next(error);
  }
};

const getSampleByName = async (req: Request, res: Response, next: NextFunction) =>{
   const {first_name} = req.body
  try{
    const data = await bookService.getSampleByName(first_name)
    res.json(data)
    // res.sendStatus(200)
  }
  catch(error){
    next(error)
  }
}


const deleteSample = async (req: Request, res: Response, next: NextFunction) =>{
  const {first_name} = req.body
 try{
   const data = await bookService.deleteSample(first_name)
   if(data || 0 >= 1)  res.json({message : "record deleted successfully...."})
    else  res.json({message : "could not delete...."})
  //  res.json(data)
   // res.sendStatus(200)
 }
 catch(error){
   next(error)
 }
}

const updateSample = async (req: Request, res: Response, next: NextFunction) =>{
  const {first_name , new_first_name} = req.body
 try{
   const data = await bookService.updateSample(first_name , new_first_name)
   res.json(data)
  //  if(data || 0 >= 1)  res.json({message : "record updated successfully...."})
  //   else  res.json({message : "could not update...."})

 }
 catch(error){
   next(error)
 }
}


const insertTeam  = async (req: Request, res: Response, next: NextFunction) =>{
  const {team_name} = req.body
 try{
    const data = await bookService.insertTeam(team_name)
    res.json(data)
 }
 catch(error){
   next(error)
 }
}

const  insertPlayer = async (req: Request, res: Response, next: NextFunction) =>{
  const {player_name , team_id} = req.body
 try{
    const data = await bookService.insertPlayer(player_name , team_id)
    res.json(data)
 }
 catch(error){
   next(error)
 }
}

const  insertOwners = async (req: Request, res: Response, next: NextFunction) =>{
  const {owner_name , team_id} = req.body
 try{
    const data = await bookService.insertOwners(owner_name , team_id)
    res.json(data)
 }
 catch(error){
   next(error)
 }
}


const  deleteTeam = async (req: Request, res: Response, next: NextFunction) =>{
  const {team_id} = req.body
 try{
    const data = await bookService.deleteTeam(team_id)
    res.json(data)
 }
 catch(error){
   next(error)
 }
}


const  FindTeamByOwners = async (req: Request, res: Response, next: NextFunction) =>{
  const {owner_id} = req.body
 try{
    const data = await bookService.FindTeamByOwners(owner_id)
    res.json(data)
 }
 catch(error){
   next(error)
 }
}


const  FindInfoByTeam = async (req: Request, res: Response, next: NextFunction) =>{
  const {team_id} = req.body
 try{
    const data = await bookService.FindInfoByTeam(team_id)
    res.json(data)
 }
 catch(error){
   next(error)
 }
}


const  deletePlayer = async (req: Request, res: Response, next: NextFunction) =>{
  const {player_id} = req.body
 try{
    const data = await bookService.deletePlayer(player_id)
    res.json(data)
 }
 catch(error){
   next(error)
 }
}

const  insertStadium = async (req: Request, res: Response, next: NextFunction) =>{
  const {team_id , stadium_name , sponsor_name} = req.body
 try{
    const data = await bookService.insertStadium(team_id , stadium_name , sponsor_name)
    res.json(data)
 }
 catch(error){
   next(error)
 }
}

const  insertSponsor = async (req: Request, res: Response, next: NextFunction) =>{
  const {team_id , sponsor_name} = req.body
 try{
    const data = await bookService.insertSponsor(team_id , sponsor_name)
    res.json(data)
 }
 catch(error){
   next(error)
 }
}

const  FindTeamByStadiumSponsor = async (req: Request, res: Response, next: NextFunction) =>{
  const {team_id } = req.body
 try{
    const data = await bookService.FindTeamByStadiumSponsor(team_id)
    res.json(data)
 }
 catch(error){
   next(error)
 }
}

const  updateStadiumSponsor = async (req: Request, res: Response, next: NextFunction) =>{
  const {team_id , model_name  , field_name  , value_new  } = req.body
 try{
    const data = await bookService.updateStadiumSponsor(team_id , model_name  , field_name  , value_new)
    res.json(data)
 }
 catch(error){
   next(error)
 }
}


const  deleteStadium = async (req: Request, res: Response, next: NextFunction) =>{
  const { stadium_id , sponsor_id } = req.body
 try{
    const data = await bookService.deleteStadium(stadium_id)
    res.json(data)
 }
 catch(error){
   next(error)
 }
}






export default {
    getSample , insertSample , getSampleByName , deleteSample , updateSample , insertTeam , insertPlayer , deleteTeam , insertOwners,
    FindTeamByOwners , FindInfoByTeam , deletePlayer , insertStadium , FindTeamByStadiumSponsor , insertSponsor , updateStadiumSponsor,deleteStadium
  
  };
  