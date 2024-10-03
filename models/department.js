// 'use strict';
// const {
//   Model
// } = require('sequelize');
// module.exports = (sequelize, DataTypes) => {
//   class department extends Model {
//     /**
//      * Helper method for defining associations.
//      * This method is not a part of Sequelize lifecycle.
//      * The `models/index` file will call this method automatically.
//      */
//     static associate(models) {
//       // define association here
//     }
//   }
//   department.init({
//     name: DataTypes.STRING
//   }, {
//     sequelize,
//     modelName: 'department',
//   });
//   return department;
// };

'use strict';
export default (sequelize, DataTypes) => {
  const department = sequelize.define('department', {
    name: DataTypes.STRING
  }, {timestamps:false});
  department.associate = function(models) {
    // associations can be defined here
    department.hasMany(models.emp,{
      foreignKey:'depId'
    })
  };
  return department;
};