
import { Sequelize , DataTypes, Model } from "sequelize";
const { Op } = require('sequelize');

export const sequelize = new Sequelize('vehicles', 'root', 'G00gleM00ble123!', {
    host: 'localhost', 
    dialect: 'mysql',  
    logging: false,    
    timezone: '+05:30'
  });
  
  sequelize.authenticate()
    .then(() => {
      console.log('Connection has been established successfully.');
    })
    .catch(err => {
      console.error('Unable to connect to the database:', err);
    });

export const xx_1634_Nextjs_auth = sequelize.define(
  'xx_1634_Nextjs_auth',{
    email : {
      type : DataTypes.STRING,
      primaryKey : true
    },
    password: {
      type : DataTypes.STRING,
    },
    
  },{
    tableName : 'xx_1634_Nextjs_auth',
    timestamps : false
  }
)

// export const xx_1634_Guest =sequelize.define(
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

//   export const xx_1634_Room = sequelize.define(
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


//     export const xx_1634_Reservation = sequelize.define(
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
    
   
    

  
  

// export const xx_1634_Department = sequelize.define('xx_1634_Department', {
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


// export const xx_1634_Staff =  sequelize.define(
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

