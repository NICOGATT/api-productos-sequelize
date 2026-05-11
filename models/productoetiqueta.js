'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ProductoEtiqueta extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  ProductoEtiqueta.init({
    productoId: DataTypes.INTEGER,
    etiquetaId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'ProductoEtiqueta',
  });
  return ProductoEtiqueta;
};