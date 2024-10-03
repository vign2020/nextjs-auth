// 'use strict';
// const {
//   Model
// } = require('sequelize');
// module.exports = (sequelize, DataTypes) => {
//   class emp extends Model {
//     /**
//      * Helper method for defining associations.
//      * This method is not a part of Sequelize lifecycle.
//      * The `models/index` file will call this method automatically.
//      */
//     static associate(models) {
//       // define association here
//     }
//   }
//   emp.init({
//     name: DataTypes.STRING,
//     salary: DataTypes.STRING
//   }, {
//     sequelize,
//     modelName: 'emp',
//   });
//   return emp;
// };

'use strict';
export default (sequelize, DataTypes) => {
  const emp = sequelize.define('emp', {
    name: DataTypes.STRING,
    salary: DataTypes.STRING,
    depId:{
      type:DataTypes.INTEGER,
      references:{
        model:'department',
        key:'id'
      }
    }
  }, {timestamps:false});
  emp.associate = function(models) {
    // associations can be defined here
    emp.belongsTo(models.department,{
      foreignKey:'id',
      target_Key:'depId'
    })
  };
  return emp;
};