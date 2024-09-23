

import appData from "../data/app-data"



const getSample = async () => {
  return await appData.getMany();
};


export default {
    getSample
  };
  