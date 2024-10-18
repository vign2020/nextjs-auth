import { boolean, number, z } from "zod";
import { SQL_QUERY } from "../constants/sql-query"

// import { executeQuery } from "../utils/helper"
import { Sequelize , DataTypes, Model } from "sequelize";
import { privateDecrypt } from "crypto";
const { Op } = require('sequelize');


import {sequelize , xx_1634_Department ,xx_1634_Guest ,xx_1634_Reservation , xx_1634_Room , xx_1634_Staff} from '../models/model'

// const sequelize = new Sequelize('oracle://FUSION_DW:FuS_dW_1123@141.148.201.157:1521/osmsdb.testospublic.testvcn.oraclevcn.com', {
//     dialect: 'oracle',
//     dialectModule: require('oracledb'),
//   });



// const sequelize = new Sequelize('vehicles', 'root', 'G00gleM00ble123!', {
//   host: 'localhost', 
//   dialect: 'mysql',  
//   logging: false,    
//   timezone: '+05:30'
// });

// sequelize.authenticate()
//   .then(() => {
//     console.log('Connection has been established successfully.');
//   })
//   .catch(err => {
//     console.error('Unable to connect to the database:', err);
//   });
  
// const xx_1634_Guest =sequelize.define(
//     'xx_1634_Guest' ,
//     {
//       guest_id :{
//         type : DataTypes.INTEGER ,
//         allowNull : false,
//         autoIncrement : true,
//         primaryKey : true
//       }
//       ,
//       f_name :{
//         type : DataTypes.STRING,
//         allowNull : false,
//       },
//       l_name :{
//         type : DataTypes.STRING,
//         allowNull : true
//       },
//       email :{
//         type : DataTypes.STRING,
//         allowNull : true
//       }
//     },{
//       tableName : 'xx_1634_Guest',
//       timestamps : false
//     })

//     //parent of reserveration is rooms i.e one to many 

//   const xx_1634_Room = sequelize.define(
//       'xx_1634_Room',
//       {
//         room_id: {
//           type: DataTypes.INTEGER,
//           allowNull: false,
//           autoIncrement: true,
//           primaryKey: true
//         },
//         room_no: {
//           type: DataTypes.STRING,
//           allowNull: false,
//           unique : true,
//         },
//         category: {
//           type: DataTypes.STRING,
//         },
//         price: {
//           type: DataTypes.FLOAT, 
//         },
//         availability: {
//           type: DataTypes.BOOLEAN,
//         }
//       },
//       {
//         tableName: 'xx_1634_Room',
//         timestamps : false
//       }
//     );


//     const xx_1634_Reservation = sequelize.define(
//       'xx_1634_Reservation',
//       {
//         resv_id: {
//           type: DataTypes.INTEGER,
//           allowNull: false,
//           autoIncrement: true,
//           primaryKey: true
//         },
//         guest_id: {
//           type: DataTypes.INTEGER,  
//           references: {
//             model: xx_1634_Guest, 
//             key: 'guest_id'
//           }
//         },
//         room_id: {
//           type: DataTypes.INTEGER,  
//           references: {
//             model: xx_1634_Room,
//             key: 'room_id'
//           }
//         },
//         in_time: {
//           type: DataTypes.DATE, 
//         },
//         out_time: {
//           type: DataTypes.DATE,  
//         }
//       },
//       {
//         tableName: 'xx_1634_Reservation', 
//         timestamps : false
//       }
//     );

// const xx_1634_Department = sequelize.define('xx_1634_Department', {
//   dept_id: {
//     type: DataTypes.INTEGER,
//     primaryKey: true,
//     autoIncrement: true // Add autoIncrement if the ID is auto-generated
//   },
//   dept_name: {
//     type: DataTypes.STRING,
//     allowNull: false
//   }
// }, {
//   tableName: 'xx_1634_Department',
//   timestamps : false
// });


// const xx_1634_Staff =  sequelize.define(
//     'xx_1634_Staff' ,
//     {
//       staff_id :{
//         type : DataTypes.INTEGER ,
//         allowNull : false,
//         autoIncrement : true,
//         primaryKey : true
//       }
//       ,
//       f_name :{
//         type : DataTypes.STRING,
//         allowNull : false,
//       },
//       l_name :{
//         type : DataTypes.STRING,
//         allowNull : true
//       },
//       dept_id:{
//         type : DataTypes.INTEGER,
//         references : {
//           model : xx_1634_Department,
//           key : 'dept_id' 
//         }
//       }
//     },{
//       tableName : 'xx_1634_Staff',
//       timestamps : false
//     })



    xx_1634_Guest.hasMany(xx_1634_Reservation, {
      foreignKey: 'guest_id',
    });
    
    xx_1634_Reservation.belongsTo(xx_1634_Guest, {
      foreignKey: 'guest_id',
    });
    
    xx_1634_Room.belongsToMany(xx_1634_Guest, {
      through: xx_1634_Reservation,
      foreignKey: 'room_id',
    });
    
    xx_1634_Guest.belongsToMany(xx_1634_Room, {
      through: xx_1634_Reservation,
      foreignKey: 'guest_id',
    });
    



//one - many b/w department and staff
xx_1634_Department.hasMany(xx_1634_Staff , {  foreignKey : 'dept_id' , onDelete : 'CASCADE' , onUpdate : 'CASCADE'})
xx_1634_Staff.belongsTo(xx_1634_Department , {foreignKey : 'dept_id'})

//one - many b/w reservation and room
xx_1634_Room.hasMany(xx_1634_Reservation , {  foreignKey : 'room_id' , onDelete : 'CASCADE' , onUpdate : 'CASCADE'})
xx_1634_Reservation.belongsTo(xx_1634_Room , {foreignKey : 'room_id'})

//creating staffs

const createStaff = async (f_name : string , l_name : string , dept_id : number)=>{
  try{
    const result = xx_1634_Staff.create({
      f_name : f_name,
      l_name : l_name,
      dept_id : dept_id
    })
    return result;
  }
  catch(e){
    console.error(e)
  }
}


const createDepartment = async (dept_name: string) => {
  try {
    const result = await xx_1634_Department.create({
      dept_name: dept_name
    });
    return result;
  } catch (e: any) {
    console.error('Error creating department:', e); // Log full error for debugging
    throw new Error(e.message); // Optionally rethrow if you want to propagate the error
  }
};

const createGuest = async (f_name : string , l_name : string , email : string) =>{
  try{
    const result = await xx_1634_Guest.create({
      f_name : f_name,
      l_name : l_name,
      email : email
    });
    return result;
  } 
  catch (e: any) {
    console.error('Error creating department:', e); // Log full error for debugging
    throw new Error(e.message); // Optionally rethrow if you want to propagate the error
  }
  }


  const createRoom = async (room_no : number , category : string , price : number ,availability : boolean) =>{
    try{
      const result = await xx_1634_Room.create({
        room_no : room_no,
        category : category,
        price : price ,
        availability : availability
      });
      return result;
    } 
    catch (e: any) {
      console.error('Error creating department:', e); // Log full error for debugging
      throw new Error(e.message); // Optionally rethrow if you want to propagate the error
    }
    }
 

    const createReservation = async (guest_id : number , room_id : number , in_time : Date , out_time : Date) =>{
      try{
        //check room availabiltiy before inserting
        const currentTime = new Date();

        const reservedRooms: any = await xx_1634_Reservation.findAll({
          where: {
            in_time: { [Op.lte]: currentTime },  
            out_time: { [Op.gte]: currentTime }  
          },
          attributes: ['room_id']
        });

        //check if time clashes with other reservations

        const conflict = await xx_1634_Reservation.findOne({
          where: {
            room_id, // Check only reservations for the same room
            // Check for overlap in time ranges:
            [Op.or]: [
              {
                in_time: {
                  [Op.between]: [in_time, out_time], // Reservation starts within the given range
                },
              },
              {
                out_time: {
                  [Op.between]: [in_time, out_time], // Reservation ends within the given range
                },
              },
              {
                [Op.and]: [
                  { in_time: { [Op.lte]: in_time } }, // Existing reservation encompasses the entire range
                  { out_time: { [Op.gte]: out_time } },
                ],
              },
            ],
          },
        });
    
        if (conflict) {
          throw new Error('Reservation conflict: The selected room is already reserved within the specified time period.');
        }

        
        const reservedRoomIds: number[] = reservedRooms.map((reservation: { room_id: number }) => reservation.room_id);

        if(reservedRoomIds.includes(room_id)){
          console.log('RESERVED ROOMS ARE' + reservedRoomIds)
          return "This room is not avaialable .. please try some other room or at some other slort"
        }
     
        
       

        const inTimeUTC = new Date(in_time).toISOString(); 
        const outTimeUTC = new Date(out_time).toISOString();


        const result:any = await xx_1634_Reservation.create({
          guest_id : guest_id,
          room_id : room_id,
          in_time : inTimeUTC,
          out_time : outTimeUTC
        });

       

     
        
        return result;
      } 
      catch (e: any) {
        console.error('Error creating department:', e);
        throw new Error(e.message); 
      }


      }
   


// const getdepartmentstaff = async (dept_name: string) => {
//   try {
//     const department:any = await xx_1634_Department.findOne({

    
//       where: {
//         dept_name: dept_name,
//       },
//       attributes: ["dept_id"],
//     });

//     if (department) {
//       const departmentId = department.dept_id; 
//       const staff = await xx_1634_Staff.findAll({
//         where :{
//           dept_id : departmentId
//         },
//         attributes : ["f_name" , "l_name"]
//       })
//       return staff;
      
//     } else {
//       throw new Error(`Department with name ${dept_name} not found.`);

//     }


//   } catch (e: any) {
//     console.error("Error fetching department:", e.message);
//     throw e; // Optionally rethrow the error for further handling
//   }
// };


const getdepartmentstaff = async (dept_name: string) => {
  try {
    const department:any = await xx_1634_Department.findOne({
      where: {
        dept_name: dept_name,
      },
      include: [
        {
          model: xx_1634_Staff, // Assuming your Staff model is named 'Staff'
          attributes: ['f_name' , 'l_name'], // Fetch only the staff_name
        },
      ],
    });

    if (!department) {
      throw new Error(`Department with name ${dept_name} not found.`);
    }

    return department.xx_1634_Staffs;

  } catch (e: any) {
    console.error('Error fetching department staff:', e.message);
    throw e;
  }
};


const getguestdetails = async (guest_id : number) => {
  try{
    const guest_from_reservation : any = await xx_1634_Reservation.findAll({
      where:{
        guest_id : guest_id,
    
      },
      include : [
        {
        model : xx_1634_Room,
        attributes : ["room_no" , "category" , "price"]
        }
      ]
     
    })
    const guest_info:any = await xx_1634_Guest.findOne({
      where:{
        guest_id : guest_id
      }
    })

    const result = {
      guest_info: guest_info,
      reservations: guest_from_reservation,
      
    };

    return result ;

  }
  catch(e) {
    console.error(e)
  }
};


const getroomdetails = async () => {
  try{
    const room_details = xx_1634_Room.findAll({})

    return room_details;
  }
  catch(e) {
    console.error(e)
  }
};


//many-many queries . 
const getallguests = async () => {
  try {
    const result = await xx_1634_Reservation.findAll({
      include: [
        { 
          model: xx_1634_Guest,
        },
        {
          model: xx_1634_Room,
        },
      ],
    });
    return result;
  } catch (e) {
    console.error(e);
  }
};



const deleteGuest = async(guest_id : number)=>{
  try{
      const result = await xx_1634_Reservation.destroy({
        where :{
          guest_id : guest_id
        }
      })
      return result;
  }
  catch(e){
    console.error(e)
  }

}


const updateroom = async (room_id: number, room_id_new: number) => {
  try {
    const result = await xx_1634_Reservation.update(
      { room_id: room_id_new }, 
      {
        where: {
          room_id: room_id
        }
      }
    );
    return result; 
  } catch (e) {
    console.error(e);
  }
};



 (async () => {
  const currentTime = new Date();

  
  try {
    console.log('current time is ' + currentTime)
   
    const reservedRooms: any = await xx_1634_Reservation.findAll({
      
      where: {
            in_time: { [Op.lte]: currentTime },  
        out_time: { [Op.gte]: currentTime }  
      },
      attributes: ['room_id']
    });

   
    const reservedRoomIds: number[] = reservedRooms.map((reservation: { room_id: number }) => reservation.room_id);
    console.log('reserved room id s' + reservedRoomIds)
   
    await xx_1634_Room.update(
      { availability: false }, 
      { where: { room_id: { [Op.in]: reservedRoomIds } } }
    );

    
    await xx_1634_Room.update(
      { availability: true },
      { where: { room_id: { [Op.notIn]: reservedRoomIds } } }
    );

    console.log("Room availability updated successfully.");
  } catch (error) {
    console.error("Error updating room availability: ", error);
  }
})();





sequelize.sync({ force: false  , alter : true}); // Avoids recreating the table



export default {
     createStaff ,  createDepartment , getdepartmentstaff , createGuest , createRoom , createReservation , getguestdetails , getroomdetails , getallguests , deleteGuest , updateroom
} as const;