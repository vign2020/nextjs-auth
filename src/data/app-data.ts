import { boolean, number, z } from "zod";
import { SQL_QUERY } from "../constants/sql-query"

// import { executeQuery } from "../utils/helper"
import { Sequelize , DataTypes, Model } from "sequelize";
import { privateDecrypt } from "crypto";
import bcrypt from 'bcrypt'


import express from "express";
import cors from 'cors'




import { sequelize , xx_1634_Nextjs_auth } from "../models/model";
const { Op } = require('sequelize');




const app = express();
app.use(cors())

const addUser = async (email : string , password : string )=>{

  const hashedPassword = await bcrypt.hash(password , 10);

  try{
    const result = xx_1634_Nextjs_auth.create({
     email : email,
     password : hashedPassword
    })
    return result;
  }
  catch(e){
    console.error(e)
  }
}


sequelize.sync({ force: false  , alter : true});

export default {addUser} as const;
