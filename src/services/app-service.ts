

import appData from "../data/app-data"



const getSample = async () => {
  return await appData.getMany();
};

const insertSample  = async (emp_id: number, first_name: string, last_name: string, email: string, phone_number: number, created_at: Date, created_by: string, updated_at: string, updated_by: any)=>{
  return await appData.insertData(emp_id , first_name , last_name , email , phone_number , created_at , updated_at , created_by , updated_by);
}

const getSampleByName = async (first_name : string) =>{

  return await appData.GetByName(first_name);
}

const deleteSample = async (first_name : string) =>{
  return await appData.deleteSample(first_name)
}

const updateSample = async (first_name : string , new_first_name : string) =>{
  return await appData.updateSample(first_name , new_first_name)
}

const insertTeam = async (team_name : string) =>{
  return await appData.insertTeam(team_name)
}


const insertPlayer = async (player_name : string , team_id : number) =>{
  return await appData.insertPlayer(player_name , team_id )
}


const deleteTeam = async ( team_id : number) =>{
  return await appData.deleteTeam(team_id)
}

const insertOwners = async (owner_name : string , team_id : number) =>{
  return await appData.insertMatches(owner_name , team_id )
}


const FindTeamByOwners = async (owner_id : string) =>{
  return await appData.FindTeamByOwners(owner_id)
}

const FindInfoByTeam = async (team_id : number) =>{
  return await appData.FindInfoByTeam(team_id)
}


const deletePlayer = async ( player_id : number) =>{
  return await appData.deleteTeam(player_id)
}


const insertStadium = async ( team_id : number , stadium_name : string , sponsor_name : string) =>{
  return await appData.insertStadium(team_id , stadium_name , sponsor_name)
}

const FindTeamByStadiumSponsor = async (team_id : number) =>{
  return await appData.FindTeamByStadiumSponsor(team_id)
}


const insertSponsor = async ( team_id : number , sponsor_name : string) =>{
  return await appData.insertSponsors(team_id , sponsor_name)
}


const updateStadiumSponsor = async ( team_id : number , model_name : any , field_name : string , value_new : string) =>{
  return await appData.updateStadiumSponsor(team_id , model_name  , field_name  , value_new)
}

const deleteStadium = async ( stadium_id : number) =>{
  return await appData.deleteStadium(stadium_id)
}
export default {
    getSample , insertSample , getSampleByName , deleteSample , updateSample , insertTeam , insertPlayer , deleteTeam , FindInfoByTeam , insertOwners , FindTeamByOwners , deletePlayer , insertStadium , FindTeamByStadiumSponsor , insertSponsor , updateStadiumSponsor , deleteStadium
  };
  