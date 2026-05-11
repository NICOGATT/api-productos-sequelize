'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Etiqueta extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Etiqueta.belongsToMany(models.Producto, {
        through : "ProductoEtiqueta",
        foreignKey : "etiquetaId", 
        otherKey : "productoId",
        as : "productos"
      })
    }
  }
  Etiqueta.init({
    nombre: DataTypes.STRING, 
    allowNull : false
  }, {
    sequelize,
    modelName: 'Etiqueta',
  });
  return Etiqueta;
};