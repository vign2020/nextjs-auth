import { number, z } from "zod";
import { SQL_QUERY } from "../constants/sql-query"

// import { executeQuery } from "../utils/helper"
import { Sequelize , DataTypes } from "sequelize";
import { timeStamp } from "console";

// const sequelize = new Sequelize('oracle://FUSION_DW:FuS_dW_1123@141.148.201.157:1521/osmsdb.testospublic.testvcn.oraclevcn.com', {
//     dialect: 'oracle',
//     dialectModule: require('oracledb'),
//   });



const sequelize = new Sequelize('vehicles', 'root', 'G00gleM00ble123!', {
  host: 'localhost', // Replace with your MySQL host (default is localhost)
  dialect: 'mysql',  // Specify the database dialect (mysql)
  logging: false,    // Disable logging if not needed (optional)
});

sequelize.authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });


  
  const xx_1634_fs_users = sequelize.define('xx_1634_fs_users', {
    emp_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    first_name: {
      type: DataTypes.STRING(50), 
      allowNull: true, 
    },
    last_name: {
      type: DataTypes.STRING(50), 
      allowNull: true, 
    },
    email: {
      type: DataTypes.STRING(100), 
      allowNull: false,
      validate: {
        isEmail: true, 
      },
    },
    phone_number: {
      type: DataTypes.STRING(15), 
      allowNull: true, 
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    updated_at: {
      type: DataTypes.DATE, 
      allowNull: true,
    },
    created_by: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    updated_by: {
      type: DataTypes.STRING(50),
      allowNull: true, 
    }
  }, {
    tableName: 'xx_1634_fs_users',
    timestamps: false, 
  });

  //establishing a one to many relationship
  const Team = sequelize.define('Team' ,{
      team_id : {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
      },
      team_name :{
        type : DataTypes.STRING,
        allowNull : false,
      }
  },
  {
    tableName: 'Team',
    timestamps: false, 
  })

  const Player = sequelize.define('Player' , {
    player_id : {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    team_id :{
      type : DataTypes.INTEGER,
      allowNull : false,
      references :{
        model : Team,
        key : 'team_id'
      }
    },
    player_name : {
      type : DataTypes.STRING,
      allowNull : false
    }

  },
  {
    tableName: 'Player',
    timestamps: false, 
  })

  const Owners = sequelize.define('Owners', {
    owner_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    owner_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    team_id: {
      type: DataTypes.INTEGER,
      references: {
        model: Team,
        key: 'team_id',
      },
      onDelete: 'CASCADE',
    },
  });

  const Stadiums = sequelize.define('Stadiums', {
    stadium_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    stadium_name: {
      type: DataTypes.TEXT,
      // unique : true,
      allowNull: false,
    },
  }, {
    tableName: 'Stadiums',
    timestamps: false,
  });


  // Sponsor Model
  const Sponsors = sequelize.define('Sponsors', {
    sponsor_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    sponsor_name: {
      // unique:true,
      type: DataTypes.TEXT,
      allowNull: false,
    },
  }, {
    tableName: 'Sponsors',
    timestamps: false,
  });

  // const TeamStadium = sequelize.define('TeamStadium', {
  //   team_stadium_id: {
  //     type: DataTypes.INTEGER,
  //     autoIncrement: true,
  //     primaryKey: true,
  //   },
  // }, {
  //   tableName: 'TeamStadium',
  //   timestamps: false,
  // });

  // const TeamSponsor = sequelize.define('TeamSponsor', {
  //   team_sponsor_id: {
  //     type: DataTypes.INTEGER,
  //     autoIncrement: true,
  //     primaryKey: true,
  //   },
  // }, {
  //   tableName: 'TeamSponsor',
  //   timestamps: false,
  // });
  
  const TeamAssociations = sequelize.define('TeamAssociations', {
    team_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Team,
        key: 'team_id',
      },
      onDelete: 'CASCADE',
    },
    stadium_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: Stadiums,
        key: 'stadium_id',
      },
      onDelete: 'CASCADE',
    },
    sponsor_id: {
      type: DataTypes.INTEGER,
      allowNull: true, 
      references: {
        model: Sponsors,
        key: 'sponsor_id',
      },
      onDelete: 'CASCADE',
    },
  }, {
    tableName: 'TeamAssociations',
    timestamps: false,
  });
  


  Team.hasMany(Player, {
    foreignKey: 'team_id', 
    onDelete: 'CASCADE',   
  });
  
  Player.belongsTo(Team, {
    foreignKey: 'team_id', // The foreign key in Player references Team
  });

  Team.hasMany(Owners , {
    foreignKey : 'team_id',
    onDelete : 'CASCADE'
  })
  Owners.belongsTo(Owners , {
    foreignKey : 'team_id'
  })

//  many -> many
// Team <-> Stadiums association
Team.belongsToMany(Stadiums, {
  through: TeamAssociations,
  foreignKey: 'team_id',
  otherKey: 'stadium_id',
  onDelete: 'CASCADE',
});

// Stadiums <-> Team 
Stadiums.belongsToMany(Team, {
  through: TeamAssociations,
  foreignKey: 'stadium_id',
  otherKey: 'team_id',
  onDelete: 'CASCADE',
});

// Team <-> Sponsors association
Team.belongsToMany(Sponsors, {
  through: TeamAssociations,
  foreignKey: 'team_id',
  otherKey: 'sponsor_id',
  onDelete: 'CASCADE',
});

// Sponsors <-> Team association
Sponsors.belongsToMany(Team, {
  through: TeamAssociations,
  foreignKey: 'sponsor_id',
  otherKey: 'team_id',
  onDelete: 'CASCADE',
});



const getMany = async () => {
    // const result = await executeQuery<z.infer<typeof bookSchemaOracle>>(SQL_QUERY.USER.GET_MANY);
    // const result = await executeQuery<any>(SQL_QUERY.USER.GET_MANY);
    // return result.rows;

    try {
        const users = await xx_1634_fs_users.findAll(); // This fetches all records from `some_table`
        return users;
      } catch (error) {
        console.error('Error fetching users:', error);
      }
}

// Assuming your model is in the models folder

const insertData = async (emp_id: number, first_name: string, last_name: string, email: string, phone_number: number, created_at: Date, created_by: string, updated_at: string, updated_by: any) => {

  try {
  
    const result = await xx_1634_fs_users.create({
      emp_id: emp_id, 
      first_name: first_name,
      last_name: last_name,
      email: email,
      phone_number: phone_number,
      created_at: new Date(), // Sets the current date and time
      updated_at: new Date(),
      created_by: created_by,
      updated_by: updated_by
    });

    console.log('Data inserted successfully:', result);
    return result;
  } catch (error) {
    console.error('Error inserting data:', error);
  }
};

const GetByName = async (first_name : string)=>{
  try{
      const result = await xx_1634_fs_users.findAll({
        where :{
          first_name : first_name
        }
      })
      console.log('records searched for ...' + result)
      return result;
      
  }
  catch(error){
    console.error('Error inserting data:', error);
  }

}

const deleteSample = async (first_name : string)=>{
  try{

    const result = await xx_1634_fs_users.destroy({
      where: {
        first_name: first_name
      },
    });

    return result;

  }
  catch(error) {
    console.error('Error inserting data:', error);
  }
}


const updateSample = async (first_name : string , new_first_name : string)=>{
  try{

    const result = await xx_1634_fs_users.update(
      { first_name: new_first_name },
      {
        where: {
          first_name : first_name,
        },
      },
    );

    return result;

  }
  catch(error) {
    console.error('Error inserting data:', error);
  }
}


const deleteTeam = async (team_id : number )=>{
  try{

    const result = await Team.destroy({
      where: {
        team_id: team_id,
      },
    });

    return result;

  }
  catch(error) {
    console.error('Error inserting data:', error);
  }
}


const insertTeam = async (team_name : string) => {
      try{
          const result = Team.create({
              team_name : team_name
          })

          return result;
      }
      catch(e) {
        console.log('error in inserting team ' +  e)
      }

      
}

const insertPlayer = async (player_name : string , team_id : number) => {
  try{
      const result = Player.create({
        player_name : player_name,
        team_id : team_id
      })

      return result;
  }
  catch(e) {
    console.log('error in inserting team ' +  e)
  }
  
}


const insertMatches = async (owner_name : string , team_id : number) => {
  try{
      const result = Owners.create({
        owner_name : owner_name,
        team_id : team_id
      })

      return result;
  }
  catch(e) {
    console.log('error in inserting team ' +  e)
  }
  
}


//******************* operation one : find the team members of a particular owner


//eager loading : include
const FindTeamByOwners = async (owner_id : string )=>{

  try{
    const ownerWithPlayers : any = await Team.findAll({
      include : [{
        model : Owners, 
        required : true,
        where:{
          owner_id : owner_id
        }
      },{
        model : Player, 
        required : true
      }]
    })
   console.log(ownerWithPlayers[0].Players)
  const arr_players =  ownerWithPlayers[0].Players.map((item : any , idx : any) =>{
    return item.player_name
  })
  console.log(arr_players)
  return arr_players
      //  return ownerWithPlayers;
  }
  catch(e) {
    console.log(e)
  }
  

}

const FindInfoByTeam = async (team_id : number )=>{

  try{
    const teamInfo : any = await Team.findAll({
      where: {
        team_id: team_id, 
      },
      include : [{
        model : Owners, 
        required : true
      },{
        model : Player, 
        required : true
      }]
    })
    console.log(teamInfo)

    const arr_team = teamInfo.filter((item : any)=>{
       return item.team_id ===  team_id
     
     
    })

    console.log(arr_team)

    return teamInfo;

  }
  catch(e) {
    console.log(e)
  }
  

}
const deletePlayer = async (player_id : number )=>{
  try{

    const result = await Player.destroy({
      where: {
        player_id: player_id,
      },
    });

    return result;

  }
  catch(error) {
    console.error('Error inserting data:', error);
  }
}

//many to many

//creating a new staium

const insertStadium = async (team_id : number , stadium_name : string , sponsor_name : string)=>{
  try {
    // Ensure that at least one of stadiumData or sponsorData is provided
    if (!stadium_name && !sponsor_name) {
      throw new Error('At least one of stadiumData or sponsorData must be provided');
    }

    let stadiumId = null;
    let sponsorId = null;


    let stadium : any = await Stadiums.findOne({
      where: { stadium_name }
    });
    
    let sponsor = await Sponsors.findOne({
      where: { sponsor_name }
    });
  


    if (stadium_name && !stadium) {
      //if stadium name is already there the only fetch the id


      const stadium:any = await Stadiums.create({stadium_name});
      stadiumId = stadium.stadium_id; // Assuming stadium_id is the primary key
    }
    // else stadiumId = stadium?.stadium_id;

    // Insert into the Sponsors table if sponsorData is provided
    if (sponsor_name && !sponsor) {
      const sponsor:any = await Sponsors.create({sponsor_name});
      sponsorId = sponsor.sponsor_id; // Assuming sponsor_id is the primary key
    }
    // else sponsorId = stadium?.sponsor_id;

   
    
      const newAssociation = await TeamAssociations.create({
        team_id: team_id,
        stadium_id: stadiumId, 
        sponsor_id: sponsorId, 
      });
  
      console.log('Association created successfully:', newAssociation);
      return newAssociation;
    


  
  } catch (error) {
    console.error('Error creating team association:', error);
    throw error;
  }
}



const insertSponsors = async (team_id: number, sponsor_name: string) => {
  try{
    const team:any = await Team.findByPk(team_id);
    if(!team) {
      throw new Error('Team not found');
    }
    const sponsor = await Sponsors.create({ sponsor_name });
    await team.addSponsor(sponsor); 
  }
  catch(e){
    return e;
  }

};



const FindTeamByStadiumSponsor = async (team_id : number)=>{
  try{
    const teamDetails = await Team.findAll({
      where: { team_id: team_id },  
      include: [
        { model: Stadiums, through: { attributes: [] } }, 
        { model: Sponsors, through: { attributes: [] } }  
      ]
    });
    return teamDetails;
  }
  catch(e) {
    console.log(e)
  }
  
}

const modelMapping: any = {
  Stadiums: Stadiums,  
  Sponsors: Sponsors,
 
};


const updateStadiumSponsor = async( model_name_string : any , field_name : string , value_old : string ,  value_new : string) =>{
  // try {
  //   // Map the string to the actual model
  //   const model_name = modelMapping[model_name_string];
    
  //   // Throw an error if the model is not found in the mapping
  //   if (!model_name) {
  //     throw new Error(`Model ${model_name_string} not found`);
  //   }

  //   // Find the record with the old value in the specified field
  //   const existingRecord = await model_name.findOne({
  //     where: { [field_name]: value_old }
  //   });

  //   if (!existingRecord) {
  //     throw new Error(`Record with ${field_name} = ${value_old} not found in ${model_name_string}`);
  //   }

  //   // Update the specified field with the new value
  //   const updatedRecord = await model_name.update(
  //     { [field_name]: value_new }, 
  //     { where: { [field_name]: value_old } }
  //   );

  //   console.log(`Record updated successfully: ${field_name} changed from ${value_old} to ${value_new}`);
  //   return updatedRecord; 
  // } catch (e) {
  //   console.error('Error during update:', e);
  //   throw e;
  // }
}


const deleteStadium = async (stadium_id : number )=>{
  try{

    const result = await Stadiums.destroy({
      where: {
        stadium_id: stadium_id,
      },
    });

    return result;

  }
  catch(error) {
    console.error('Error inserting data:', error);
  }
}

sequelize.sync({ force: false  }); // Avoids recreating the table



export default {
    getMany , insertData , GetByName , deleteSample , updateSample , insertTeam , insertPlayer , deleteTeam , insertMatches , FindTeamByOwners , FindInfoByTeam , deletePlayer , insertStadium , FindTeamByStadiumSponsor , insertSponsors ,updateStadiumSponsor , deleteStadium
} as const;